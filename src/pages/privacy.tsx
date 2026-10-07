import { useLocation } from "wouter";
import { MarketingFooter } from "@/components/marketing-footer";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 48 }}>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 22px)", fontWeight: 900, color: GREEN, margin: "0 0 14px", letterSpacing: "-0.015em" }}>
        {title}
      </h2>
      {children}
    </section>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p style={{ fontSize: 15, lineHeight: 1.85, color: MUTED, margin: "0 0 14px" }}>{children}</p>;
}

function UL({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0 0 14px", paddingLeft: 22 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: MUTED, marginBottom: 6 }}>{item}</li>
      ))}
    </ul>
  );
}

function InfoBox({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "rgba(45,90,39,0.05)", border: "1px solid rgba(45,90,39,0.12)", borderRadius: 10, padding: "18px 22px", margin: "0 0 20px" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, margin: "0 0 8px" }}>{label}</p>
      <div style={{ fontSize: 14, lineHeight: 1.75, color: MUTED }}>{children}</div>
    </div>
  );
}

export default function Privacy() {
  const [, navigate] = useLocation();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>

      {/* Nav */}
      <header style={{ borderBottom: `1px solid rgba(28,43,26,0.1)`, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: CREAM, position: "sticky", top: 0, zIndex: 40 }}>
        <button onClick={() => navigate("/")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: GREEN, background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.02em" }}>
          Jhirah
        </button>
        <button onClick={() => navigate("/terms")} style={{ background: "none", border: "none", color: MUTED, fontSize: 14, cursor: "pointer" }}>
          Terms of Service →
        </button>
      </header>

      {/* Hero */}
      <div style={{ background: GREEN, padding: "48px 40px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,239,231,0.45)", marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", color: CREAM, margin: "0 0 16px" }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: 14, color: "rgba(242,239,231,0.55)", margin: 0 }}>
            Effective date: 1 June 2026 · Issued by{" "}
            <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(242,239,231,0.75)", textDecoration: "none", fontWeight: 600 }}>
              Cryp Tok Solutions
            </a>
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "56px 40px 80px" }}>

        <P>
          This Privacy Policy explains how <strong style={{ color: GREEN }}>Cryp Tok Solutions</strong> ("we," "us," or "our") collects, uses, stores, and shares information when you use the Jhirah platform. We are committed to transparency and to handling your data with care. If you have questions, contact us at{" "}
          <a href="mailto:support@jhirah.com" style={{ color: ACCENT }}>support@jhirah.com</a>.
        </P>

        <InfoBox label="The short version">
          <p style={{ margin: 0 }}>
            We collect your email address, location data <em>only during active presence sessions</em>, and your check-in history. Businesses on our platform <strong>never see your email address or precise location</strong> — they only see aggregate audience counts. You can unsubscribe from any business's marketing emails with one click at any time.
          </p>
        </InfoBox>

        <div style={{ height: 1, background: "rgba(28,43,26,0.1)", margin: "32px 0" }} />

        <Section title="1. Information We Collect">
          <P><strong style={{ color: GREEN }}>Account information:</strong> When you create an account, we collect your email address. We use this to authenticate you (via magic-link email) and to deliver transactional messages (point confirmations, security alerts). We do not collect your name, phone number, or physical address unless you voluntarily provide them.</P>

          <P><strong style={{ color: GREEN }}>Location data:</strong> When you initiate a presence session by entering an event code, we verify your GPS coordinates against the registered business location. Location data is used exclusively to confirm you are within 200 metres of the venue at check-in. We do not continuously track your location outside of active session verification pings, and we do not store your precise historical location trail.</P>

          <P><strong style={{ color: GREEN }}>Device state:</strong> During an active presence session, the app receives background signals from your device indicating whether the screen is locked or unlocked. This is used solely to calculate earning time and validate session integrity. We do not access your contacts, camera, microphone, photos, or any other device data.</P>

          <P><strong style={{ color: GREEN }}>Check-in history:</strong> We record which businesses you have checked in to and the duration of completed sessions. This history determines your point balance and constitutes your "audience membership" with participating businesses.</P>

          <P><strong style={{ color: GREEN }}>Usage data:</strong> We collect standard server logs including IP address, browser type, and page access times for security, debugging, and performance monitoring. These logs are retained for up to 90 days.</P>
        </Section>

        <Section title="2. How We Use Your Information">
          <UL items={[
            "To operate the loyalty points system — verifying check-ins, calculating points, and recording redemptions.",
            "To authenticate your account via email magic-links and optional TOTP two-factor authentication.",
            "To facilitate business marketing campaigns — delivering emails on behalf of participating businesses to their verified audience members. Your email address is never disclosed to those businesses.",
            "To send you transactional notifications (point credits, redemption confirmations, security alerts).",
            "To detect and prevent fraud, gaming, and abuse of the platform.",
            "To improve the Service through aggregate, anonymised analytics.",
          ]} />
        </Section>

        <Section title="3. What Businesses Can & Cannot See">
          <InfoBox label="Privacy guarantee for users">
            <p style={{ margin: 0 }}>
              Participating businesses can see: how many total people have attended their events, how many of those have opted in to email marketing, how many have opted out, and aggregate delivery counts per campaign.<br /><br />
              Businesses <strong>cannot see</strong>: your email address, your name, your precise location, your point balance at other businesses, or any personally identifying information about individual attendees.
            </p>
          </InfoBox>
          <P>When a business sends an email campaign, Jhirah delivers it on their behalf using our email infrastructure. The business provides the message content; we handle delivery using your email address internally without exposing it to the sender.</P>
        </Section>

        <Section title="4. Email Marketing & Opt-Out">
          <P>By checking in at a business event, you consent to receiving marketing emails from that specific business via the Jhirah platform. Each marketing email will include a clearly labelled unsubscribe link. Clicking it will immediately and permanently opt you out of future campaigns from that business.</P>
          <P>Opting out of marketing emails does not affect your ability to earn points, redeem rewards, or use any other feature of the Service. It also does not opt you out of transactional messages from Jhirah itself (such as point credit confirmations and account security alerts).</P>
          <P>You may also update your email marketing preferences from within your account settings at any time.</P>
        </Section>

        <Section title="5. Data Sharing & Third Parties">
          <P>We do not sell, rent, or trade your personal data. We share information only in the following limited circumstances:</P>
          <UL items={[
            "Resend (resend.com) — our email delivery provider. Your email address is transmitted to Resend solely for the purpose of delivering messages you have consented to receive. Resend processes this data under their own privacy policy and data processing agreement.",
            "Legal compliance — we may disclose information if required by applicable law, court order, or regulatory authority, or to protect the rights, safety, or property of Cryp Tok Solutions, our users, or the public.",
            "Business transfers — in the event of a merger, acquisition, or sale of all or substantially all of our assets, user data may be transferred to the successor entity, subject to the same privacy commitments.",
          ]} />
        </Section>

        <Section title="6. Data Retention">
          <UL items={[
            "Account data (email, point history): retained for the lifetime of your account, plus up to 12 months after account deletion to satisfy legal obligations.",
            "Session heartbeat and GPS verification data: deleted within 30 days of session completion. We do not maintain a long-term record of your location history.",
            "Campaign delivery records: retained for up to 24 months for compliance and audit purposes.",
            "Server logs: retained for up to 90 days.",
          ]} />
        </Section>

        <Section title="7. Your Rights">
          <P>Depending on your jurisdiction, you may have the right to:</P>
          <UL items={[
            "Access the personal data we hold about you.",
            "Request correction of inaccurate data.",
            "Request deletion of your account and associated personal data.",
            "Withdraw consent to marketing communications (via unsubscribe links or account settings).",
            "Lodge a complaint with your local data protection authority.",
          ]} />
          <P>To exercise any of these rights, email us at <a href="mailto:support@jhirah.com" style={{ color: ACCENT }}>support@jhirah.com</a>. We will respond within 30 days.</P>
        </Section>

        <Section title="8. Security">
          <P>We implement industry-standard security measures including TLS encryption for data in transit, hashed authentication tokens, and access controls limiting who can access personal data internally. No system is perfectly secure; if you believe your account has been compromised, contact us immediately.</P>
        </Section>

        <Section title="9. Children's Privacy">
          <P>The Service is not directed to individuals under the age of 18. We do not knowingly collect personal information from minors. If we become aware that a minor has created an account, we will delete it promptly.</P>
        </Section>

        <Section title="10. Changes to This Policy">
          <P>We may update this Privacy Policy from time to time. Material changes will be communicated via email to the address on your account at least 14 days before taking effect. Continued use of the Service after the effective date constitutes acceptance of the revised Policy.</P>
        </Section>

        <Section title="11. Contact Us">
          <P>
            <strong style={{ color: GREEN }}>Cryp Tok Solutions</strong><br />
            Email: <a href="mailto:support@jhirah.com" style={{ color: ACCENT }}>support@jhirah.com</a><br />
            Website: <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }}>cryptok.online</a>
          </P>
        </Section>

      </div>

      <MarketingFooter />
    </div>
  );
}
