import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { useAuth } from "@/hooks/useAuth";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";

type Stage =
  | "loading"
  | "need-auth"
  | "need-gps"
  | "ready"
  | "checking-in"
  | "success"
  | "already-in"
  | "error";

interface BizInfo {
  id: string;
  name: string;
  address?: string;
  description?: string;
}

export default function CheckinPage() {
  const params = useParams<{ token: string }>();
  const token = params.token ?? "";
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading: authLoading, user } = useAuth();

  const [stage, setStage]     = useState<Stage>("loading");
  const [biz, setBiz]         = useState<BizInfo | null>(null);
  const [lat, setLat]         = useState<number | null>(null);
  const [lng, setLng]         = useState<number | null>(null);
  const [gpsError, setGpsError] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Step 1: resolve business from event code token
  useEffect(() => {
    if (!token) { setStage("error"); setErrorMsg("Invalid check-in link."); return; }

    fetch(`/api/businesses/token/${token}`)
      .then(r => r.json() as Promise<BizInfo & { error?: string }>)
      .then(data => {
        if (data.error || !data.id) {
          setStage("error");
          setErrorMsg("This event code isn't recognised. Ask the event host for a fresh one.");
          return;
        }
        setBiz({ id: data.id, name: data.name, address: data.address, description: data.description });
      })
      .catch(() => { setStage("error"); setErrorMsg("Couldn't reach the server. Check your connection."); });
  }, [token]);

  // Step 2: once we have the biz, decide what to do
  useEffect(() => {
    if (!biz || authLoading) return;

    if (!isAuthenticated) {
      setStage("need-auth");
      return;
    }

    if (user?.role !== "customer") {
      setStage("error");
      setErrorMsg("Only customer accounts can check in at events.");
      return;
    }

    // Check if already in an active session
    fetch("/api/sessions/active", { credentials: "include" })
      .then(r => r.json() as Promise<{ session?: { id: string }; error?: string }>)
      .then(data => {
        if (data.session?.id) { setStage("already-in"); return; }
        setStage("need-gps");
      })
      .catch(() => setStage("need-gps"));
  }, [biz, authLoading, isAuthenticated, user]);

  // Step 3: GPS acquisition (runs after we know the user needs to check in)
  useEffect(() => {
    if (stage !== "need-gps") return;
    navigator.geolocation.getCurrentPosition(
      pos => { setLat(pos.coords.latitude); setLng(pos.coords.longitude); setStage("ready"); },
      () => { setGpsError("Location access denied. Please enable it in your browser settings."); },
      { timeout: 10000 },
    );
  }, [stage]);

  async function handleCheckIn() {
    if (!biz || lat === null || lng === null) return;
    setStage("checking-in");
    try {
      const res = await fetch("/api/sessions/checkin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ sessionCode: biz.id, latitude: lat, longitude: lng }),
      });
      const data = await res.json() as { error?: string };
      if (!res.ok) {
        setStage("error");
        setErrorMsg(data.error ?? "Check-in failed. Please try again.");
        return;
      }
      setStage("success");
      setTimeout(() => navigate("/session"), 1800);
    } catch {
      setStage("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  function goAuth() {
    // Store this page's path so we come back after sign-in
    sessionStorage.setItem("auth_redirect", `/checkin/${token}`);
    navigate("/sign-in");
  }

  return (
    <div style={{ minHeight: "100vh", background: CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "'Inter', sans-serif" }}>
      {/* Logo bar */}
      <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", marginBottom: 40 }}>
        <img src="/logo.webp" alt="Jhirah" style={{ width: 32, height: 32, borderRadius: 7, objectFit: "cover" }} />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: GREEN, letterSpacing: "-0.02em" }}>Jhirah</span>
      </button>

      <div style={{ width: "100%", maxWidth: 440, background: "#fff", borderRadius: 20, padding: "40px 36px", boxShadow: "0 4px 32px rgba(28,43,26,0.08)", border: "1px solid rgba(28,43,26,0.08)" }}>

        {/* Loading */}
        {(stage === "loading" || authLoading) && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid rgba(28,43,26,0.1)`, borderTopColor: GREEN, margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <p style={{ color: MUTED, fontSize: 14 }}>Loading event details…</p>
          </div>
        )}

        {/* Needs sign-in */}
        {stage === "need-auth" && biz && (
          <>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Event check-in</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{biz.name}</h2>
              {biz.address && <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>📍 {biz.address}</p>}
            </div>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: "0 0 28px" }}>
              Sign in (or create a free account) to check in and start earning points for your time here.
            </p>
            <button onClick={goAuth}
              style={{ width: "100%", padding: "13px", background: GREEN, color: CREAM, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Sign in to check in →
            </button>
          </>
        )}

        {/* GPS acquiring */}
        {stage === "need-gps" && biz && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(28,43,26,0.07)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: GREEN, margin: "0 0 8px" }}>Getting your location…</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7 }}>Please allow location access when prompted. We verify you're at <strong>{biz.name}</strong> before checking you in.</p>
            {gpsError && <p style={{ color: "#DC2626", fontSize: 13, marginTop: 16 }}>{gpsError}</p>}
          </div>
        )}

        {/* Ready to check in */}
        {stage === "ready" && biz && (
          <>
            <div style={{ marginBottom: 28 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase", margin: "0 0 6px" }}>Event check-in</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 6px", letterSpacing: "-0.02em" }}>{biz.name}</h2>
              {biz.address && <p style={{ color: MUTED, fontSize: 13, margin: "0 0 4px" }}>📍 {biz.address}</p>}
              {biz.description && <p style={{ color: MUTED, fontSize: 13, margin: 0 }}>{biz.description}</p>}
            </div>

            <div style={{ background: "rgba(28,43,26,0.04)", borderRadius: 12, padding: "14px 16px", marginBottom: 24, display: "flex", gap: 12, alignItems: "flex-start" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginTop: 1, flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
              <p style={{ color: GREEN, fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                Keep your phone screen off while checked in to earn <strong>100 pts per 30 min</strong>. Check out within 60 s of unlocking to bank your points.
              </p>
            </div>

            <p style={{ color: MUTED, fontSize: 12, margin: "0 0 20px" }}>📍 Location confirmed</p>

            <button onClick={handleCheckIn}
              style={{ width: "100%", padding: "14px", background: GREEN, color: CREAM, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 700, cursor: "pointer" }}>
              Check in &amp; start earning →
            </button>
          </>
        )}

        {/* Checking in */}
        {stage === "checking-in" && (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `3px solid rgba(28,43,26,0.1)`, borderTopColor: GREEN, margin: "0 auto 20px", animation: "spin 0.8s linear infinite" }} />
            <p style={{ color: MUTED, fontSize: 14 }}>Checking you in…</p>
          </div>
        )}

        {/* Success */}
        {stage === "success" && biz && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(34,197,94,0.12)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 8px" }}>You're in! 🎉</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7 }}>Checked in at <strong>{biz.name}</strong>. Lock your phone and enjoy — your points are accumulating.</p>
            <p style={{ color: ACCENT, fontSize: 13, marginTop: 12 }}>Taking you to your session…</p>
          </div>
        )}

        {/* Already checked in */}
        {stage === "already-in" && biz && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(217,119,6,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={AMBER} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: GREEN, margin: "0 0 8px" }}>Already checked in</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>You have an active session running. Keep your phone locked to keep earning.</p>
            <button onClick={() => navigate("/session")}
              style={{ width: "100%", padding: "13px", background: GREEN, color: CREAM, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              View my session →
            </button>
          </div>
        )}

        {/* Error */}
        {stage === "error" && (
          <div style={{ textAlign: "center" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "rgba(220,38,38,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: GREEN, margin: "0 0 12px" }}>Something went wrong</h2>
            <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: "0 0 24px" }}>{errorMsg}</p>
            <button onClick={() => navigate("/")}
              style={{ background: "none", border: `1.5px solid rgba(28,43,26,0.2)`, borderRadius: 10, padding: "11px 24px", fontSize: 14, fontWeight: 600, color: GREEN, cursor: "pointer" }}>
              Go home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
