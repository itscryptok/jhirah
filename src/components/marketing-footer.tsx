import { useLocation } from "wouter";

const GREEN = "#1C2B1A";
const MUTED  = "#8A8A7A";

const NAV_LINKS = [
  { label: "Home",           path: "/" },
  { label: "For Customers",  path: "/for-customers" },
  { label: "For Businesses", path: "/for-businesses" },
  { label: "Terms",          path: "/terms" },
  { label: "Privacy",        path: "/privacy" },
];

export function MarketingFooter() {
  const [, navigate] = useLocation();

  return (
    <footer style={{
      borderTop: "1px solid rgba(28,43,26,0.1)",
      padding: "32px 40px 28px",
      backgroundColor: "#F2EFE7",
    }}>
      <div style={{
        maxWidth: 1100,
        margin: "0 auto",
        display: "flex",
        flexDirection: "column",
        gap: 20,
      }}>
        {/* Top row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 20,
            fontWeight: 900,
            color: GREEN,
            background: "none",
            border: "none",
            cursor: "pointer",
            letterSpacing: "-0.02em",
            padding: 0,
          }}>
            Jhirah
          </button>

          <nav style={{ display: "flex", flexWrap: "wrap", gap: "4px 4px" }}>
            {NAV_LINKS.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                style={{
                  background: "none",
                  border: "none",
                  color: MUTED,
                  fontSize: 13,
                  cursor: "pointer",
                  padding: "4px 12px",
                  borderRadius: 4,
                }}
              >
                {label}
              </button>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: "rgba(28,43,26,0.08)" }} />

        {/* Bottom row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <p style={{ fontSize: 12, color: "rgba(28,43,26,0.4)", margin: 0 }}>
              A product of{" "}
              <a
                href="https://cryptok.online"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(28,43,26,0.55)", textDecoration: "none", fontWeight: 600 }}
              >
                Cryp Tok Solutions
              </a>
            </p>
            <p style={{ fontSize: 12, color: "rgba(28,43,26,0.4)", margin: 0 }}>
              © 2026{" "}
              <a
                href="https://cryptok.online"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "rgba(28,43,26,0.55)", textDecoration: "none", fontWeight: 600 }}
              >
                Cryp Tok Solutions
              </a>
              . All rights reserved.
            </p>
          </div>
          <div style={{ display: "flex", gap: 16 }}>
            <button onClick={() => navigate("/terms")} style={{ background: "none", border: "none", color: MUTED, fontSize: 12, cursor: "pointer", padding: 0, textDecoration: "underline", textDecorationColor: "rgba(138,138,122,0.4)" }}>Terms of Service</button>
            <button onClick={() => navigate("/privacy")} style={{ background: "none", border: "none", color: MUTED, fontSize: 12, cursor: "pointer", padding: 0, textDecoration: "underline", textDecorationColor: "rgba(138,138,122,0.4)" }}>Privacy Policy</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
