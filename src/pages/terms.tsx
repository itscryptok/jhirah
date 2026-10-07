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

export default function Terms() {
  const [, navigate] = useLocation();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>

      {/* Nav */}
      <header style={{ borderBottom: `1px solid rgba(28,43,26,0.1)`, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: CREAM, position: "sticky", top: 0, zIndex: 40 }}>
        <button onClick={() => navigate("/")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: GREEN, background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.02em" }}>
          Jhirah
        </button>
        <button onClick={() => navigate("/privacy")} style={{ background: "none", border: "none", color: MUTED, fontSize: 14, cursor: "pointer" }}>
          Privacy Policy →
        </button>
      </header>

      {/* Hero */}
      <div style={{ background: GREEN, padding: "48px 40px 40px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,239,231,0.45)", marginBottom: 16 }}>Legal</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(30px, 4vw, 44px)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.02em", color: CREAM, margin: "0 0 16px" }}>
            Terms of Service
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
          These Terms of Service ("Terms") govern your access to and use of the Jhirah platform — including the Jhirah web application, mobile application, APIs, and all related services (collectively, the "Service") — operated by <strong style={{ color: GREEN }}>Cryp Tok Solutions</strong> ("we," "us," or "our"). By creating an account or using the Service, you agree to be bound by these Terms.
        </P>

        <div style={{ height: 1, background: "rgba(28,43,26,0.1)", margin: "32px 0" }} />

        <Section title="1. Eligibility">
          <P>You must be at least 18 years old to create an account and use the Service. By registering, you represent and warrant that you meet this requirement and that all information you provide is accurate and complete. Jhirah reserves the right to suspend or terminate accounts found to be in violation of this requirement.</P>
        </Section>

        <Section title="2. Accounts & Authentication">
          <P>Jhirah uses email-based magic-link authentication and optional two-factor authentication (TOTP). You are responsible for maintaining the confidentiality of your account access and for all activity that occurs under your account. You must notify us immediately of any unauthorized use at <a href="mailto:support@jhirah.com" style={{ color: ACCENT }}>support@jhirah.com</a>.</P>
          <P>One account per person. Creating multiple accounts to circumvent limits, bans, or point restrictions is prohibited and will result in permanent suspension of all associated accounts.</P>
        </Section>

        <Section title="3. The Points System">
          <P>Jhirah's loyalty points are earned by verified physical presence at participating business events. The current earning rate is <strong style={{ color: GREEN }}>100 points per 30 minutes</strong> of continuous screen-locked time within an active presence session.</P>
          <UL items={[
            "Points have no cash value outside of redemption through a participating Jhirah business.",
            "Points are non-transferable and may not be sold, gifted, or exchanged between accounts.",
            "Cryp Tok Solutions reserves the right to adjust the earning rate, redemption rate, or point value at any time with reasonable notice.",
            "Points expire 24 months after the date of the last check-in at the issuing business, unless otherwise stated by the business.",
            "Redemption is subject to the specific terms set by each participating business, including minimum thresholds and eligible goods or services.",
          ]} />
        </Section>

        <Section title="4. Presence Sessions & Check-In Rules">
          <P>A presence session begins when you enter a valid event code issued by a participating business and ends automatically once the minimum lock time has been satisfied (or when the session is invalidated per the rules below).</P>
          <UL items={[
            "You must be within 200 metres of the business's registered GPS coordinates at the time of check-in.",
            "Your device screen must remain locked for the duration of the session. Unlocking your screen for more than 10 seconds cumulatively will invalidate the session and forfeit any points in progress.",
            "Each event code is single-use per session and may not be shared or reused across multiple sessions.",
            "Once a session auto-completes and points are credited, they are permanent and cannot be reversed by the business or by Jhirah.",
          ]} />
        </Section>

        <Section title="5. Prohibited Conduct & Anti-Gaming">
          <P>The integrity of every point depends on genuine physical presence. The following conduct is expressly prohibited and will result in immediate account suspension and forfeiture of all accumulated points:</P>
          <UL items={[
            "Spoofing GPS coordinates or using location-manipulation software during an active session.",
            "Using automated scripts, bots, or emulators to simulate phone-lock behaviour.",
            "Sharing event codes with individuals who are not physically present at the event.",
            "Attempting to manipulate the session heartbeat, tamper with client-server communication, or exploit API endpoints.",
            "Reverse engineering, decompiling, or disassembling any part of the Jhirah platform.",
          ]} />
          <P>We reserve the right to investigate suspicious activity and to terminate accounts, forfeit points, and pursue legal remedies as appropriate.</P>
        </Section>

        <Section title="6. Business Owners — Additional Terms">
          <P>Businesses that register on Jhirah as a merchant agree to the following additional obligations:</P>
          <UL items={[
            "Provide accurate business name, address, and GPS coordinates. Misrepresenting your location to manipulate check-in eligibility is prohibited.",
            "Event codes must only be shared with genuine attendees who are physically present.",
            "Reward tiers advertised on the platform must be honoured as listed. Altering or withdrawing active reward offers without reasonable notice to affected customers is a breach of these Terms.",
            "Email campaigns sent through the Jhirah platform must comply with applicable anti-spam legislation, including CAN-SPAM, CASL, and GDPR where applicable. You may not send misleading, deceptive, or harassing content.",
            "You acknowledge that Jhirah does not disclose individual customer email addresses. The campaign delivery infrastructure is provided as-is, and Cryp Tok Solutions is not liable for email deliverability rates.",
            "Subscription plans (Starter, Growth, Pro) are billed monthly. Monthly email quotas reset on the first day of each calendar month and do not roll over.",
          ]} />
        </Section>

        <Section title="7. Email Marketing & Communications">
          <P>By checking in at a business event, you consent to receiving marketing communications from that specific business through the Jhirah platform. Each marketing email will include a clearly visible one-click unsubscribe link. Opting out will immediately exclude you from future campaigns from that business but will not affect your ability to earn points or use the Service.</P>
          <P>Jhirah may also send you transactional and service-related communications (such as point credit confirmations and security alerts) that are not subject to marketing opt-out.</P>
        </Section>

        <Section title="8. Intellectual Property">
          <P>All content, design, trademarks, logos, and software associated with the Jhirah platform are the exclusive property of <strong style={{ color: GREEN }}>Cryp Tok Solutions</strong> or its licensors. "Jhirah" and the Jhirah logo are trademarks of Cryp Tok Solutions. You may not reproduce, distribute, modify, or create derivative works from any part of the Service without prior written consent.</P>
        </Section>

        <Section title="9. Limitation of Liability">
          <P>To the maximum extent permitted by applicable law, Cryp Tok Solutions and its officers, employees, and partners shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the Service — including but not limited to loss of points, inability to redeem rewards, or business revenue losses.</P>
          <P>Our total liability to you for any direct damages shall not exceed the greater of (a) the total amount you paid us in the twelve months preceding the claim, or (b) $50 CAD.</P>
        </Section>

        <Section title="10. Disclaimers">
          <P>The Service is provided "as is" and "as available" without warranties of any kind, express or implied. We do not guarantee uninterrupted or error-free operation of the platform, nor do we guarantee that any particular reward will remain available for redemption.</P>
        </Section>

        <Section title="11. Changes to These Terms">
          <P>We may update these Terms at any time. Material changes will be communicated via email to the address on your account at least 14 days before taking effect. Continued use of the Service after the effective date constitutes acceptance of the revised Terms. If you do not agree, you must stop using the Service and may request account deletion.</P>
        </Section>

        <Section title="12. Governing Law">
          <P>These Terms are governed by the laws of the Province of Ontario, Canada, without regard to its conflict-of-law principles. Any dispute arising under these Terms shall be resolved exclusively in the courts of Ontario, Canada.</P>
        </Section>

        <Section title="13. Contact">
          <P>
            For questions about these Terms, contact Cryp Tok Solutions at{" "}
            <a href="mailto:support@jhirah.com" style={{ color: ACCENT }}>support@jhirah.com</a> or visit{" "}
            <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT }}>cryptok.online</a>.
          </P>
        </Section>

      </div>

      <MarketingFooter />
    </div>
  );
}
