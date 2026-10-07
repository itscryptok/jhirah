import { useEffect } from "react";
import { SignIn, useUser } from "@clerk/react";
import { useLocation } from "wouter";
import { clerkAppearance } from "@/lib/clerkAppearance";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";

export default function SignInPage() {
  const [, navigate] = useLocation();
  const { isLoaded, isSignedIn } = useUser();
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  // Already authenticated — send them home immediately so Clerk
  // never tries to mount the sign-in widget for a signed-in session
  // (that's what causes the flicker/modal-that-never-appears).
  useEffect(() => {
    if (isLoaded && isSignedIn) {
      navigate("/");
    }
  }, [isLoaded, isSignedIn]);

  if (isLoaded && isSignedIn) return null;

  return (
    <div style={{ minHeight: "100vh", background: CREAM, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "80px 24px 40px", fontFamily: "'Inter', sans-serif" }}>
      {/* Top bar */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 56, display: "flex", alignItems: "center", padding: "0 20px", backgroundColor: CREAM, borderBottom: "1px solid rgba(28,43,26,0.08)", zIndex: 10 }}>
        <button onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", cursor: "pointer", color: MUTED, fontSize: 13, fontWeight: 600, padding: "6px 10px", borderRadius: 8, transition: "background 0.15s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(28,43,26,0.06)")}
          onMouseLeave={e => (e.currentTarget.style.background = "none")}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
          Home
        </button>
        <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
          <button onClick={() => navigate("/")} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            <img src={`${basePath}/logo.webp`} alt="Jhirah" style={{ width: 26, height: 26, borderRadius: 5, objectFit: "cover" }} />
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: GREEN, letterSpacing: "-0.02em" }}>Jhirah</span>
          </button>
        </div>
        <div style={{ width: 80 }} />
      </div>

      <SignIn
        routing="path"
        path={`${basePath}/sign-in`}
        fallbackRedirectUrl={`${basePath || "/"}`}
        appearance={clerkAppearance}
      />

      <p style={{ color: MUTED, fontSize: 12, margin: "28px 0 0" }}>
        &copy; 2026 Jhirah by{" "}
        <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, textDecoration: "none" }}>Cryp Tok Solutions</a>
      </p>
    </div>
  );
}
