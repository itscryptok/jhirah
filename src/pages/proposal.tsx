import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";

function Section({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      {label && (
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
          {label}
        </p>
      )}
      {children}
    </section>
  );
}

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 30px)", fontWeight: 900, letterSpacing: "-0.02em", color: GREEN, margin: "0 0 16px" }}>
      {children}
    </h2>
  );
}

function Body({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: 15, lineHeight: 1.85, color: MUTED, margin: "0 0 16px" }}>
      {children}
    </p>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul style={{ margin: "0 0 16px", paddingLeft: 20 }}>
      {items.map((item, i) => (
        <li key={i} style={{ fontSize: 15, lineHeight: 1.85, color: MUTED, marginBottom: 6 }}>{item}</li>
      ))}
    </ul>
  );
}

function FundBar({ label, amount, pct, color = ACCENT }: { label: string; amount: string; pct: number; color?: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: GREEN }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: AMBER }}>{amount}</span>
      </div>
      <div style={{ height: 8, background: "rgba(28,43,26,0.1)", borderRadius: 4, overflow: "hidden" }}>
        <div style={{ height: "100%", width: `${pct}%`, background: color, borderRadius: 4, transition: "width 0.6s ease" }} />
      </div>
    </div>
  );
}

function Triangle() {
  return (
    <div style={{ background: "rgba(28,43,26,0.04)", border: `1px solid rgba(28,43,26,0.1)`, borderRadius: 12, padding: "36px 40px", margin: "24px 0", textAlign: "center" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
        The Jhirah Triangle
      </p>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, fontFamily: "monospace", fontSize: 13, color: GREEN, lineHeight: 1.9 }}>
        <span style={{ fontWeight: 700, fontSize: 15 }}>[ Local Businesses ]</span>
        <div style={{ display: "flex", gap: 80, color: MUTED, fontSize: 12, fontStyle: "italic" }}>
          <span>Sponsorship Pipeline ↙</span>
          <span>↘ High-Conversion Retargeting</span>
        </div>
        <div style={{ display: "flex", gap: 40, alignItems: "center", marginTop: 4 }}>
          <span style={{ fontWeight: 700, fontSize: 15 }}>[ Event Organizers ]</span>
          <span style={{ color: MUTED, fontSize: 12, fontStyle: "italic" }}>— Zero-Click Culture —</span>
          <span style={{ fontWeight: 700, fontSize: 15 }}>[ Active Users ]</span>
        </div>
      </div>
    </div>
  );
}

export default function Proposal() {
  const [, navigate] = useLocation();
  const { login } = useAuth();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>

      {/* Nav */}
      <header style={{ borderBottom: `1px solid rgba(28,43,26,0.1)`, padding: "0 40px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", backgroundColor: CREAM, position: "sticky", top: 0, zIndex: 40 }}>
        <button onClick={() => navigate("/")}
          style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: GREEN, background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.02em" }}>
          Jhirah
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => navigate("/how")}
            style={{ background: "none", border: "none", color: MUTED, fontSize: 14, fontWeight: 500, cursor: "pointer", padding: "6px 14px" }}>
            How It Works
          </button>
          <button onClick={login}
            style={{ background: GREEN, color: CREAM, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", padding: "8px 18px", borderRadius: 6 }}>
            Sign in
          </button>
        </nav>
      </header>

      {/* Hero */}
      <div style={{ background: GREEN, padding: "64px 40px 56px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,239,231,0.5)", border: "1px solid rgba(242,239,231,0.2)", padding: "4px 12px", borderRadius: 20 }}>
              Confidential
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,239,231,0.5)", border: "1px solid rgba(242,239,231,0.2)", padding: "4px 12px", borderRadius: 20 }}>
              Seed / MVP Phase
            </span>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: AMBER, border: `1px solid ${AMBER}40`, padding: "4px 12px", borderRadius: 20 }}>
              Requesting $450,000
            </span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: CREAM, margin: "0 0 24px" }}>
            Business Funding Proposal
          </h1>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: "rgba(242,239,231,0.65)", maxWidth: 620, margin: 0 }}>
            Jhirah — Local Loyalty Market (LLM) Platform. Prepared for Prospective Investment Partners by Cryp Tok Solutions.
          </p>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "64px 40px 100px" }}>

        {/* Executive Summary */}
        <Section label="Executive Summary">
          <H2>Rewarding presence over screen time.</H2>
          <Body>
            In today's attention economy, consumer applications compete aggressively for screen time, causing digital fatigue and a drop in face-to-face community interaction. <strong style={{ color: GREEN }}>Jhirah</strong> is a revolutionary Local Loyalty Market (LLM) application designed to flip this dynamic on its head. Our mission is to simultaneously stimulate local commerce, boost community events, and champion digital wellness by incentivizing a structural "zero-click" culture.
          </Body>
          <Body>
            Instead of capturing user attention to sell to global online advertisers, Jhirah monetizes physical presence and real-world patronage for neighborhood businesses and event organizers. By combining automated location-locked verification with a disciplined phone-lock incentive structure, Jhirah transforms local businesses and gatherings into highly rewarding hubs of human connection. We are seeking <strong style={{ color: GREEN }}>$450,000</strong> in seed funding to complete production-ready cross-platform development, optimize cloud infrastructure, and execute a multi-channel go-to-market pilot strategy.
          </Body>
          <Body>
            Customers earn reward points at local business events just for showing up and being present — even if they don't buy anything. The moment they check in, their contact information is automatically linked to that business in our database, with no manual data collection required. Businesses never see the raw contact details, but they gain the ability to reach that customer directly through the Jhirah platform whenever they run a future promotion, product launch, or announcement. Every check-in is therefore not just foot traffic — it is a verified, permission-based addition to a merchant's reachable audience, compounding with each visit and each event sponsorship.
          </Body>
          <Body>
            This model addresses one of the most persistent challenges in local commerce: marketing reach. A targeted email list of verified, returning customers consistently delivers higher conversion rates than social media advertising or search engine optimisation. Social algorithms throttle organic reach; SEO favours deep-pocketed competitors. Neither channel guarantees that the recipient has any prior relationship with the business. Jhirah changes that equation entirely. Rather than competing for attention in an oversaturated digital landscape, merchants simply invest a fraction of their traditional marketing budget in organising or sponsoring a local event. Every participant who attends and checks in becomes a verified subscriber — an audience that is warm, local, and permission-based. With each subsequent event and each returning visit, that audience compounds, giving merchants a proprietary marketing asset that no platform can devalue or take away.
          </Body>
          <Triangle />
        </Section>

        <div style={{ height: 1, background: "rgba(28,43,26,0.1)", margin: "0 0 56px" }} />

        {/* Platform Functionalities */}
        <Section label="Core Platform Functionalities & User Journeys">
          <Body>
            Jhirah operates as a three-sided local marketplace built to maximize real-world attendance through zero-friction, gamified digital wellness.
          </Body>
        </Section>

        {/* Consumer */}
        <Section>
          <H2>1. The Consumer Experience</H2>
          <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>Put Your Phone Down, Get Rewarded</p>
          <Body>
            Users easily browse locally sponsored events or neighborhood businesses via a localized discovery feed sorted by city or zip code.
          </Body>
          <BulletList items={[
            "The Check-In Flow: Upon arriving, the host shares a short 6-character random session code — displayed on a screen, a sign, or spoken at the door. The user enters the code in the Jhirah app to begin their presence session. No QR camera required.",
            "The Presence Session: The user places their phone face down. Jhirah tracks device state in the background. For every 30 minutes the screen remains locked inside the geofenced area, the user earns 100 points of the venue's proprietary point brand (100 points = $1.00 in real value).",
            "Auto-Complete & Banking: Once the minimum lock time set by the business is reached, the session closes and points are credited to the user's Wallet automatically — with no manual check-out step. The friction of a timed exit window has been eliminated entirely to maximise user satisfaction and session completion rates.",
          ]} />
        </Section>

        {/* Business */}
        <Section>
          <H2>2. The Business Dashboard</H2>
          <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>Turn Foot Traffic into Regulars</p>
          <Body>
            Merchants register their coordinates, generate a random session code for each event, and create their own branded loyalty currency (e.g., "Blue Bottle Rewards"). Through an administrative panel, businesses establish customized reward tiers (e.g., 500 points = $5 off) and track automated performance loops.
          </Body>
          <Body>
            The dashboard doubles as a complete email marketing hub. A built-in rich-text composer lets merchants craft formatted newsletters — with bold text, links, headings, and lists — and broadcast them <strong style={{ color: GREEN }}>exclusively</strong> to verified attendees. Subscriber counts, opted-out contacts, and per-campaign delivery stats are surfaced directly in the dashboard. Individual email addresses are never exposed to merchants, preserving user privacy while delivering full marketing utility. Unsubscribe compliance is automated: every email includes a one-click opt-out link and opted-out contacts are excluded from all future sends.
          </Body>
        </Section>

        {/* Event Organizer */}
        <Section>
          <H2>3. The Event Organizer Hub</H2>
          <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>More Attendees, Less Distraction</p>
          <Body>
            Community event hosts can list gatherings on the homepage discovery feed under "Starting Soon." To drive massive attendance, organizers can partner directly with local business sponsors on the platform. The sponsoring business pledges their branded points as the reward incentive. Attendees enter a unique event code at the entrance, keeping their phone locked during the event, and redeem their accumulated points later at the sponsor's store. This turns community events into a high-intent marketing pipeline for local merchants.
          </Body>
        </Section>

        {/* Anti-gaming */}
        <Section>
          <H2>4. Built-In Anti-Gaming Infrastructure</H2>
          <p style={{ fontSize: 13, fontWeight: 600, color: ACCENT, marginBottom: 12, letterSpacing: "0.04em", textTransform: "uppercase" }}>Protecting the integrity of every point</p>
          <BulletList items={[
            "GPS Proximity Lock: Check-ins are rejected if the user is more than 200 meters away from the registered business location, backed by persistent background heartbeat pings throughout the session.",
            "Continuous Lock Validation: Mid-session unlocks past an allowed baseline (10 seconds) immediately invalidate the session, wiping the active timer to zero. There is no partial credit for abandoned sessions.",
            "Session Code Rotation: Each event generates a fresh random code. Codes cannot be shared between events or reused across sessions, ensuring check-in integrity without relying on physical QR hardware.",
            "Auto-Complete Integrity: Sessions auto-close only after the minimum lock time is fully satisfied and confirmed by the most recent heartbeat ping. Points are never pre-credited and cannot be reversed by the merchant.",
          ]} />
        </Section>

        <div style={{ height: 1, background: "rgba(28,43,26,0.1)", margin: "0 0 56px" }} />

        {/* Monetization */}
        <Section label="Monetization & Revenue Generation">
          <H2>Revenue aligned with real-world outcomes.</H2>
          <Body>
            Jhirah shifts revenue away from digital attention extraction and focuses entirely on local business patronage and successful community transactions. The primary revenue engine is a recurring SaaS subscription that unlocks the email marketing composer — giving merchants a proprietary channel to the verified audiences Jhirah builds for them.
          </Body>

          {/* Subscription plans table */}
          <div style={{ background: "#fff", border: `1px solid rgba(28,43,26,0.1)`, borderRadius: 12, overflow: "hidden", marginTop: 24, marginBottom: 28 }}>
            <div style={{ background: "rgba(28,43,26,0.04)", padding: "14px 24px", borderBottom: `1px solid rgba(28,43,26,0.08)` }}>
              <p style={{ fontSize: 12, fontWeight: 700, color: GREEN, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
                Email Marketing Subscription Plans (Live)
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0 }}>
              {[
                { name: "Starter", price: "$19", emails: "500 emails/mo", perEmail: "~$0.038/email", target: "New & small local businesses running their first events" },
                { name: "Growth", price: "$49", emails: "2,000 emails/mo", perEmail: "~$0.025/email", target: "Established venues running regular events and building a repeat audience", highlight: true },
                { name: "Pro", price: "$99", emails: "10,000 emails/mo", perEmail: "~$0.010/email", target: "High-volume operators, event chains, or multi-location brands" },
              ].map((plan, i) => (
                <div key={plan.name} style={{
                  padding: "28px 24px",
                  background: plan.highlight ? "rgba(45,90,39,0.04)" : "transparent",
                  borderLeft: i > 0 ? `1px solid rgba(28,43,26,0.08)` : "none",
                }}>
                  <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, margin: "0 0 6px" }}>{plan.name}</p>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 32, fontWeight: 900, color: GREEN, lineHeight: 1, margin: "0 0 4px" }}>
                    {plan.price}<span style={{ fontSize: 14, fontWeight: 400, color: MUTED }}>/mo</span>
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: AMBER, margin: "8px 0 4px" }}>{plan.emails}</p>
                  <p style={{ fontSize: 11, color: MUTED, margin: "0 0 12px" }}>{plan.perEmail} per send</p>
                  <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.65, margin: 0 }}>{plan.target}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue projection */}
          <div style={{ background: "rgba(28,43,26,0.03)", border: `1px solid rgba(28,43,26,0.08)`, borderRadius: 10, padding: "24px 28px", marginBottom: 28 }}>
            <p style={{ fontSize: 12, fontWeight: 700, color: ACCENT, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 16, margin: "0 0 16px" }}>
              Projected Monthly Recurring Revenue — 500 Business Milestone
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { scenario: "Conservative mix", detail: "60% Starter · 30% Growth · 10% Pro", mrr: "$18,250", arr: "$219,000" },
                { scenario: "Balanced mix", detail: "40% Starter · 40% Growth · 20% Pro", mrr: "$26,000", arr: "$312,000" },
                { scenario: "Growth-skewed", detail: "20% Starter · 50% Growth · 30% Pro", mrr: "$36,300", arr: "$435,600" },
              ].map(s => (
                <div key={s.scenario} style={{ background: "#fff", borderRadius: 8, padding: "16px 18px", border: `1px solid rgba(28,43,26,0.07)` }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: GREEN, margin: "0 0 4px" }}>{s.scenario}</p>
                  <p style={{ fontSize: 11, color: MUTED, margin: "0 0 12px", lineHeight: 1.5 }}>{s.detail}</p>
                  <p style={{ fontSize: 20, fontWeight: 900, color: AMBER, margin: "0 0 2px" }}>{s.mrr}</p>
                  <p style={{ fontSize: 11, color: MUTED, margin: 0 }}>{s.arr} ARR</p>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              { title: "Performance Transaction Fees", desc: "A small percentage fee on real dollar-value vouchers redeemed through the app, aligning Jhirah's profitability with actual merchant sales. This stream scales automatically as redemption volume grows — no additional sales effort required." },
              { title: "Sponsored Event Matching", desc: "A matching dividend from B2B sponsorship contracts brokered between corporate sponsors and event organizers. As Jhirah's attendance data matures, this becomes an increasingly valuable signal for sponsor targeting." },
            ].map((item) => (
              <div key={item.title} style={{ background: "#fff", borderRadius: 10, padding: "24px", border: `1px solid rgba(28,43,26,0.08)` }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: GREEN, margin: "0 0 10px" }}>{item.title}</p>
                <p style={{ fontSize: 14, lineHeight: 1.7, color: MUTED, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ height: 1, background: "rgba(28,43,26,0.1)", margin: "0 0 56px" }} />

        {/* Use of Funds */}
        <Section label="Use of Funds & Financial Breakdown">
          <H2>9-month product-to-market cycle.</H2>
          <Body>
            The requested <strong style={{ color: GREEN }}>$450,000</strong> seed round will support a disciplined 9-month product-to-market cycle, focused heavily on secure, automated mobile architecture and localized market density.
          </Body>
          <div style={{ marginTop: 32 }}>
            <FundBar label="Senior Developer Salaries" amount="$260,000" pct={58} />
            <FundBar label="Marketing, B2B Sales & Print Logistics" amount="$90,000" pct={20} color={AMBER} />
            <FundBar label="Operational Logistics & QA" amount="$70,000" pct={16} color="#6B7F69" />
            <FundBar label="AI-Model & Cloud Infrastructure" amount="$30,000" pct={7} color="#9CA88C" />
          </div>

          <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
            {[
              {
                label: "Senior Developer Salaries", amount: "$260,000",
                body: "Full-cycle development of native iOS and Android frameworks, background heartbeat monitoring services, secure dual-wallet ledgers, and responsive web-based dashboards for businesses and event hosts.",
              },
              {
                label: "AI-Model & Cloud Infrastructure", amount: "$30,000",
                body: "AI-assisted push notification drafting for merchants. Hosting costs for secure, location-locked verification APIs and mapping databases.",
              },
              {
                label: "Marketing, B2B Sales & Print", amount: "$90,000",
                body: "High-quality physical onboarding kits for merchants (acrylic QR stands, window decals, instructional flyers). Localized digital campaigns around early launch partners and events.",
              },
              {
                label: "Operational Logistics & QA", amount: "$70,000",
                body: "Penetration and exploit testing of anti-gaming protocols. Legal entity structuring, privacy-compliant data encryption layers, and dedicated support for early launch operators.",
              },
            ].map((item) => (
              <div key={item.label} style={{ background: "#fff", borderRadius: 10, padding: 24, border: `1px solid rgba(28,43,26,0.08)` }}>
                <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, margin: "0 0 4px" }}>{item.label}</p>
                <p style={{ fontSize: 18, fontWeight: 800, color: AMBER, margin: "0 0 12px" }}>{item.amount}</p>
                <p style={{ fontSize: 13, lineHeight: 1.7, color: MUTED, margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>
        </Section>

        <div style={{ height: 1, background: "rgba(28,43,26,0.1)", margin: "0 0 56px" }} />

        {/* Investor ROI */}
        <Section label="Investor ROI & Long-Term Vision">
          <H2>An early position in a defensible local utility ecosystem.</H2>
          <Body>
            Jhirah offers investors an early-stage position in a highly defensible local utility ecosystem. By treating screen-free time as a rare asset, Jhirah solves the two biggest challenges in the modern market: local retail customer retention and the cultural demand for healthy digital habits.
          </Body>
          <Body>
            Your investment will fund the launch of an application that rewards communities for staying present, growing neighborhood economies one zero-click hour at a time.
          </Body>
        </Section>

        {/* Footer CTA */}
        <div style={{ background: GREEN, borderRadius: 16, padding: "48px 40px", textAlign: "center" }}>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 900, color: CREAM, margin: "0 0 12px", letterSpacing: "-0.02em" }}>
            Interested in partnering with Jhirah?
          </p>
          <p style={{ fontSize: 15, color: "rgba(242,239,231,0.6)", margin: "0 0 28px" }}>
            Reach out to Cryp Tok Solutions at{" "}
            <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer"
              style={{ color: "#A3C99E", textDecoration: "none" }}>cryptok.online</a>
          </p>
          <button onClick={login}
            style={{ background: CREAM, color: GREEN, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "12px 28px", borderRadius: 8, letterSpacing: "0.01em" }}>
            View the live platform →
          </button>
        </div>

      </div>
    </div>
  );
}
