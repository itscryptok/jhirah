import { useState } from "react";
import { useLocation } from "wouter";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";

type Role = "customer" | "business_owner";

export default function ProfilePage() {
  const [, navigate] = useLocation();
  const params = new URLSearchParams(window.location.search);
  const redirectAfter = params.get("redirect");

  const [role, setRole]       = useState<Role | "">("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!role) { setError("Please select your account type"); return; }
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ role }),
      });
      const data = await res.json() as { success?: boolean; role?: string; error?: string };
      if (!res.ok) { setError(data.error ?? "Something went wrong"); return; }

      if (redirectAfter) {
        navigate(redirectAfter);
        return;
      }
      navigate(data.role === "business_owner" ? "/dashboard" : "/wallet");
    } catch {
      setError("Network error — please try again");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 40px", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "center", padding: "0 20px", backgroundColor: CREAM, borderBottom: "1px solid rgba(28,43,26,0.08)", zIndex: 10 }}>
        <div style={{ width: 80 }} />
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <img src="/logo.webp" alt="Jhirah" style={{ width: 26, height: 26, borderRadius: 5, objectFit: "cover" }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: GREEN, letterSpacing: "-0.02em" }}>Jhirah</span>
          </button>
        </div>
        <div style={{ width: 80 }} />
      </div>

      <div style={{ width: "100%", maxWidth: 460, background: "#fff", borderRadius: 20, padding: "44px 40px", boxShadow: "0 4px 32px rgba(28,43,26,0.08)", border: "1px solid rgba(28,43,26,0.08)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(34,197,94,0.1)", borderRadius: 20, padding: "4px 12px", marginBottom: 20 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#16A34A"><path d="M20 6L9 17l-5-5"/></svg>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#16A34A", letterSpacing: "0.06em", textTransform: "uppercase" }}>Signed in</span>
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: GREEN, margin: "0 0 8px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          One last step
        </h1>
        <p style={{ color: MUTED, fontSize: 14, lineHeight: 1.7, margin: "0 0 32px" }}>
          How will you be using Jhirah?
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 28 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: GREEN, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>I am joining as a…</label>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {([
                { value: "customer", label: "Customer", desc: "Check in at local venues, earn points, and redeem rewards." },
                { value: "business_owner", label: "Business owner / Event organiser", desc: "Generate event codes, reward loyal customers, send campaigns." },
              ] as { value: Role; label: string; desc: string }[]).map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  style={{ textAlign: "left", padding: "14px 16px", borderRadius: 12, border: `1.5px solid ${role === opt.value ? ACCENT : "rgba(28,43,26,0.14)"}`, background: role === opt.value ? "rgba(45,90,39,0.06)" : "#fff", cursor: "pointer", transition: "all 0.15s" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${role === opt.value ? ACCENT : "rgba(28,43,26,0.2)"}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {role === opt.value && <div style={{ width: 8, height: 8, borderRadius: "50%", background: ACCENT }} />}
                    </div>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 700, color: GREEN, margin: "0 0 2px" }}>{opt.label}</p>
                      <p style={{ fontSize: 12, color: MUTED, margin: 0, lineHeight: 1.5 }}>{opt.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {error && <p style={{ color: "#DC2626", fontSize: 13, margin: "0 0 16px" }}>{error}</p>}

          <button
            type="submit"
            disabled={!role || loading}
            style={{ width: "100%", padding: "13px", background: role && !loading ? GREEN : "rgba(28,43,26,0.3)", color: CREAM, border: "none", borderRadius: 10, fontSize: 14, fontWeight: 700, cursor: role && !loading ? "pointer" : "not-allowed", transition: "background 0.15s" }}>
            {loading ? "Saving…" : "Continue →"}
          </button>
        </form>
      </div>

      <p style={{ color: MUTED, fontSize: 12, margin: "28px 0 0" }}>
        &copy; 2026 Jhirah by{" "}
        <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none" }}>Cryp Tok Solutions</a>
      </p>
    </div>
  );
}
