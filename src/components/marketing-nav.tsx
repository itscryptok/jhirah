import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";

const GREEN = "#1C2B1A";
const CREAM = "#F2EFE7";
const MUTED  = "#8A8A7A";

const NAV_LINKS = [
  { label: "For Customers",  path: "/for-customers" },
  { label: "For Businesses", path: "/for-businesses" },
  { label: "About",          path: "/about" },
];

export function MarketingNav() {
  const [location, navigate] = useLocation();
  const { login } = useAuth();
  const [open, setOpen] = useState(false);

  const handleNav = (path: string) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
      {/* ── Main bar ── */}
      <header
        style={{
          borderBottom: "1px solid rgba(28,43,26,0.1)",
          padding: "0 20px",
          height: 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: CREAM,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav("/")}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <img src="/logo.webp" alt="Jhirah" style={{ width: 32, height: 32, borderRadius: 6, objectFit: "cover" }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: GREEN, letterSpacing: "-0.02em" }}>
            Jhirah
          </span>
        </button>

        {/* Right side */}
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* Desktop links — hidden below md */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNav(path)}
                style={{
                  background: "none",
                  border: "none",
                  color: location === path ? GREEN : MUTED,
                  fontSize: 14,
                  fontWeight: location === path ? 600 : 500,
                  cursor: "pointer",
                  padding: "6px 14px",
                }}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Sign in — always visible */}
          <button
            onClick={login}
            style={{
              background: GREEN,
              color: CREAM,
              border: "none",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              padding: "8px 18px",
              borderRadius: 6,
              whiteSpace: "nowrap",
            }}
          >
            Sign in
          </button>

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setOpen(o => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="md:hidden flex items-center justify-center"
            style={{
              background: open ? "rgba(28,43,26,0.07)" : "none",
              border: "none",
              cursor: "pointer",
              color: GREEN,
              width: 36,
              height: 36,
              borderRadius: 8,
              transition: "background 0.15s",
              flexShrink: 0,
            }}
          >
            {open ? <X size={20} strokeWidth={2.2} /> : <Menu size={20} strokeWidth={2.2} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile dropdown ── */}
      {open && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              top: 60,
              zIndex: 48,
              background: "rgba(28,43,26,0.15)",
            }}
          />
          {/* Menu panel */}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 0,
              right: 0,
              backgroundColor: CREAM,
              borderBottom: "1px solid rgba(28,43,26,0.12)",
              boxShadow: "0 12px 40px rgba(28,43,26,0.14)",
              zIndex: 49,
              paddingTop: 8,
              paddingBottom: 16,
            }}
          >
            {NAV_LINKS.map(({ label, path }) => (
              <button
                key={path}
                onClick={() => handleNav(path)}
                style={{
                  display: "block",
                  width: "100%",
                  textAlign: "left",
                  background: location === path ? "rgba(28,43,26,0.06)" : "none",
                  border: "none",
                  color: location === path ? GREEN : MUTED,
                  fontSize: 15,
                  fontWeight: location === path ? 600 : 500,
                  cursor: "pointer",
                  padding: "13px 24px",
                  letterSpacing: "0.01em",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
