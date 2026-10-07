const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";

export default function Flyer() {
  return (
    <div style={{ minHeight: "100vh", background: CREAM, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 16px" }}>
      <div style={{ maxWidth: 680, width: "100%" }}>

        {/* Top rule */}
        <div style={{ height: 5, background: GREEN, borderRadius: 2, marginBottom: 40 }} />

        {/* Eyebrow */}
        <p style={{ margin: "0 0 18px", fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: AMBER, fontWeight: 700 }}>
          Jhirah · Local Loyalty Market
        </p>

        {/* Headline */}
        <h1 style={{
          margin: "0 0 36px",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(32px, 6vw, 58px)",
          fontWeight: 900,
          lineHeight: 1.1,
          color: GREEN,
          letterSpacing: "-0.02em",
        }}>
          Grow your business fast with<br />
          <span style={{ color: ACCENT }}>email-list marketing.</span>
        </h1>

        {/* Divider rule */}
        <div style={{ height: 1, background: "rgba(28,43,26,0.12)", marginBottom: 36 }} />

        {/* Body */}
        <p style={{ margin: "0 0 24px", fontSize: 17, lineHeight: 1.8, color: GREEN, fontFamily: "Georgia, serif" }}>
          Hello business owners. Did you know that email-list marketing can help you grow your customer base up to <strong>3× faster</strong> than Social Media or Search Engines?
        </p>

        <p style={{ margin: "0 0 24px", fontSize: 16, lineHeight: 1.8, color: "#3a3a3a" }}>
          For just <strong>half of your marketing budget</strong>, you can organise or sponsor an event where participants are rewarded with store points — as a side perk for attending. List your event on <strong>Jhirah.com</strong>, making it easy for anyone to find.
        </p>

        <p style={{ margin: "0 0 36px", fontSize: 16, lineHeight: 1.8, color: "#3a3a3a" }}>
          Jhirah will then provide you with a <strong>unique, random code</strong> to share with participants who check in to your event. To successfully lock in their points, their phone screen must remain locked for the minimum duration you set when creating the event listing on Jhirah.com.
        </p>

        {/* Divider rule */}
        <div style={{ height: 1, background: "rgba(28,43,26,0.12)", marginBottom: 36 }} />

        {/* Bullet points */}
        <ul style={{ margin: "0 0 48px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 18 }}>
          {[
            { label: "3× faster growth potential", detail: "Build a direct email audience that compounds with every event." },
            { label: "Store point rewards", detail: "Participants earn real value — redeemable at your business." },
            { label: "Scan to learn more on Jhirah.com", detail: "List your event and get your unique code in minutes." },
          ].map(({ label, detail }) => (
            <li key={label} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
              <span style={{
                marginTop: 3,
                flexShrink: 0,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: GREEN,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4l2.5 2.5L9 1" stroke="#F2EFE7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <div>
                <p style={{ margin: 0, fontSize: 16, fontWeight: 700, color: GREEN }}>{label}</p>
                <p style={{ margin: "2px 0 0", fontSize: 14, color: MUTED, lineHeight: 1.5 }}>{detail}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* CTA strip */}
        <div style={{
          background: GREEN,
          borderRadius: 14,
          padding: "28px 32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 40,
        }}>
          <div>
            <p style={{ margin: "0 0 4px", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(242,239,231,0.55)" }}>
              Get started free
            </p>
            <p style={{ margin: 0, fontFamily: "'Playfair Display', Georgia, serif", fontSize: 22, fontWeight: 800, color: CREAM }}>
              Jhirah.com
            </p>
          </div>
          <a
            href="/"
            style={{
              display: "inline-block",
              background: AMBER,
              color: "#fff",
              textDecoration: "none",
              fontWeight: 700,
              fontSize: 14,
              padding: "13px 26px",
              borderRadius: 9,
              letterSpacing: "0.01em",
              whiteSpace: "nowrap",
            }}
          >
            List your event →
          </a>
        </div>

        {/* Bottom rule */}
        <div style={{ height: 2, background: "rgba(28,43,26,0.1)", marginBottom: 20 }} />

        {/* Footer note */}
        <p style={{ margin: 0, fontSize: 11, color: MUTED, textAlign: "center", letterSpacing: "0.06em" }}>
          © 2026 Jhirah by Cryp Tok Solutions &nbsp;·&nbsp; cryptok.online &nbsp;·&nbsp; All rights reserved
        </p>
      </div>
    </div>
  );
}
