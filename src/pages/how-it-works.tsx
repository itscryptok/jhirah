import { Helmet } from "react-helmet-async";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { useAuth } from "@/hooks/useAuth";
import { KeyRound, Lock, Timer, Gift, BarChart2, Megaphone, Shield, AlertTriangle, MapPin, Star, Users, Hash } from "lucide-react";
import { FEATURED_EVENT } from "../data/featuredEvent";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";
const CARD   = "#FFFFFF";

const customerSteps = [
  {
    n: "01",
    icon: <MapPin size={20} />,
    title: "Browse & discover",
    desc: `On the homepage, find locally sponsored events or businesses near you by city or zip code. See active sessions, starting soon, and weekly schedules — each card shows the point brand you'll earn (e.g. "${FEATURED_EVENT.pointsBrand}" or "Store Points").`,
  },
  {
    n: "02",
    icon: <KeyRound size={20} />,
    title: "Get the event code & check in",
    desc: "At the entrance, get the 6-character event code from the host — displayed on screen, on a sign, or told at the door. Type it into Jhirah. Your GPS is verified — you must be within 200 metres. Your session and point clock start the moment you check in.",
  },
  {
    n: "03",
    icon: <Lock size={20} />,
    title: "Lock your phone & stay present",
    desc: "Put your phone away, screen down. Jhirah tracks device state in the background. While your screen stays locked and you stay in the geofenced area, you earn 100 pts per 30 minutes.",
  },
  {
    n: "04",
    icon: <Timer size={20} />,
    title: "Check out within 60 seconds",
    desc: "When you're ready to leave, tap Check Out in the app within 60 seconds of unlocking your phone. This banks all your earned points — stamped under the sponsor's or store's own point brand.",
  },
  {
    n: "05",
    icon: <Gift size={20} />,
    title: "Redeem your rewards",
    desc: "Your Wallet shows each point balance by brand. Sponsor points can be redeemed at the sponsoring business; store points are redeemed with that venue directly. Real dollar-value rewards, no gimmicks.",
  },
];

const merchantSteps = [
  {
    n: "01",
    icon: <Hash size={20} />,
    title: "Create your business profile",
    desc: "Sign up, set your business name, address, and GPS coordinates. Jhirah generates a unique, location-locked 6-character event code and lists your venue on the homepage immediately — discoverable by city or zip code.",
  },
  {
    n: "02",
    icon: <Gift size={20} />,
    title: "Name your points & set reward tiers",
    desc: `Give your loyalty currency a brand name — e.g. "${FEATURED_EVENT.pointsBrand}" — and define your tiered redemption structure (500 pts = $5 off, 1 000 pts = free item). Customers see your branded points on every card.`,
  },
  {
    n: "03",
    icon: <Star size={20} />,
    title: "Sponsor an event",
    desc: "Partner with a local event organiser to become their reward sponsor. Attendees earn your branded points just for showing up — turning a community event into a direct pipeline of verified new customers for your business.",
  },
  {
    n: "04",
    icon: <Users size={20} />,
    title: "Your audience grows itself",
    desc: "Every time a customer checks in at your venue or event to earn reward points for being present, their contact details are automatically linked to your account in our database — without you ever having to collect them manually. They are not shown to you directly, but they are yours. When you run a future promotion, announcement, or product arrival, Jhirah notifies them on your behalf. Expect bigger foot traffic every time.",
  },
  {
    n: "05",
    icon: <Megaphone size={20} />,
    title: "Send targeted campaigns",
    desc: "Broadcast promotions, flash events, new product arrivals, or custom messages — exclusively to customers with a verified visit history at your venue. No cold audiences, ever.",
  },
  {
    n: "06",
    icon: <BarChart2 size={20} />,
    title: "Track your loyalty loop",
    desc: "Monitor foot traffic, points issued, campaign conversions, and reward redemptions from your dashboard. See which regulars keep coming back and which rewards drive return visits.",
  },
];

const organizerSteps = [
  {
    n: "01",
    icon: <Users size={20} />,
    title: "Create your event listing",
    desc: "List your event on Jhirah with a date, time, location, and a brief description. Your event appears in the homepage discovery feed under \"Starting Soon\" or \"Happening This Week\" — visible to everyone browsing in your area.",
  },
  {
    n: "02",
    icon: <Star size={20} />,
    title: "Partner with a business sponsor",
    desc: `Agree on a sponsorship with a local Jhirah business. They pledge their branded points (e.g. "${FEATURED_EVENT.pointsBrand}") as the reward for your attendees. Their name and points brand appear on your event card — adding credibility and a concrete incentive to show up.`,
  },
  {
    n: "03",
    icon: <KeyRound size={20} />,
    title: "Share your event code",
    desc: "Jhirah generates a location-locked 6-character code for your event venue — separate from the sponsor's store. Share it at the entrance verbally, on screen, or on a sign. Attendees type it in, no scanning required. Points are credited to their Wallet and can be redeemed at the sponsor's store at any time.",
  },
];

const rules = [
  {
    icon: <Shield size={16} />,
    title: "GPS proximity lock",
    desc: "Check-in is rejected if you're more than 200 m from the venue. Background heartbeats validate proximity throughout the session.",
  },
  {
    icon: <AlertTriangle size={16} />,
    title: "60-second exit window",
    desc: "Once you unlock your phone you have exactly 60 seconds to scan out. Browse mid-session and the session is immediately invalidated with zero points banked.",
  },
  {
    icon: <Lock size={16} />,
    title: "Continuous lock validation",
    desc: "Background heartbeats fire every few minutes. An unlock event beyond the allowed threshold automatically closes the session.",
  },
  {
    icon: <Timer size={16} />,
    title: "Check-out required",
    desc: "Simply leaving doesn't bank points. You must tap Check Out in the app within 60 seconds of unlocking, ensuring every completed visit is genuine.",
  },
];

const loopSteps = [
  { label: "Customer browses locally sponsored events & businesses on the homepage" },
  { label: "Sees the sponsor's branded point name on the event card" },
  { label: "Enters 6-character event code on arrival — GPS verified" },
  { label: "Phone locked · 100 sponsor or store pts per 30 min accumulate" },
  { label: "Real human interaction at the event or business" },
  { label: "Checks out within 60 s — all earned points banked under the sponsor's brand" },
  { label: "Points redeemed at the sponsoring business · reward fulfilled" },
  { label: "Customer becomes a regular · sponsor gains a loyal customer · loop repeats" },
];

export default function HowItWorks() {
  const { login } = useAuth();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>
      <Helmet>
        <title>How Jhirah Works — Event Code Check-In, Phone Lock & Earn Points | Local Loyalty</title>
        <meta name="description" content="Get the event code at the door, keep your phone locked during your visit, then check out to bank your points. Jhirah verifies real physical presence — so businesses email only genuinely loyal customers." />
        <link rel="canonical" href="https://jhirah.app/how" />
        <meta property="og:url" content="https://jhirah.app/how" />
        <meta property="og:title" content="How Jhirah Works — Check In, Lock Phone, Earn Rewards" />
        <meta property="og:description" content="Presence verified in 4 steps. No purchases. No gamification. Just real foot traffic converted into a verified email marketing audience for local businesses." />
      </Helmet>

      <MarketingNav />

      {/* ── Hero ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 40px 64px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
          How It Works
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 5vw, 60px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: GREEN, margin: "0 0 24px" }}>
          Show up. Lock down.<br />Earn real rewards.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: MUTED, maxWidth: 580 }}>
          Jhirah connects customers, local businesses, and event organisers into a single presence-verified loyalty loop. Browse locally sponsored events, show up, keep your phone in your pocket, and earn branded points you can spend nearby.
        </p>
      </section>

      {/* ── Customer Steps ── */}
      <section style={{ background: "#ECEAE1", borderTop: `1px solid rgba(28,43,26,0.08)`, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT }}>For Customers</span>
            <div style={{ flex: 1, height: 1, background: "rgba(28,43,26,0.12)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {customerSteps.map(s => (
              <div key={s.n} style={{ background: CARD, border: `1px solid rgba(28,43,26,0.09)`, borderRadius: 14, padding: "22px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(45,90,39,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: "rgba(28,43,26,0.1)", lineHeight: 1 }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: GREEN, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Merchant Steps ── */}
      <section style={{ background: GREEN, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,239,231,0.5)" }}>For Businesses</span>
            <div style={{ flex: 1, height: 1, background: "rgba(242,239,231,0.12)" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
            {merchantSteps.map(s => (
              <div key={s.n} style={{ background: "rgba(242,239,231,0.05)", border: "1px solid rgba(242,239,231,0.1)", borderRadius: 14, padding: "22px 18px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(242,239,231,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(242,239,231,0.6)" }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: "rgba(242,239,231,0.08)", lineHeight: 1 }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 13, fontWeight: 700, color: CREAM, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 12, color: "rgba(242,239,231,0.5)", lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Email list insight panel */}
        <div style={{ marginTop: 40, background: "rgba(242,239,231,0.06)", border: "1px solid rgba(242,239,231,0.12)", borderRadius: 16, padding: "32px 36px", maxWidth: 860, marginLeft: "auto", marginRight: "auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,239,231,0.4)", marginBottom: 12 }}>Why This Works</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.2vw, 24px)", fontWeight: 800, color: CREAM, lineHeight: 1.25, marginBottom: 16, letterSpacing: "-0.015em" }}>
            A subscribed email list grows your business faster than social media or SEO.
          </h3>
          <p style={{ fontSize: 14, color: "rgba(242,239,231,0.55)", lineHeight: 1.85, margin: 0, maxWidth: 720 }}>
            Social algorithms control how many of your followers see your posts — and that reach shrinks every year unless you pay to extend it. SEO rewards the deepest budgets. Neither channel puts your message in front of someone who has already been in your space. An email list of verified, real customers does — with conversion rates that consistently beat every paid-media channel. Jhirah gives you that list automatically through every check-in. All it takes is spending a portion of your usual marketing budget on organising or sponsoring a local event. The participants who show up and check in become your subscribers. Every event compounds the list further.
          </p>
        </div>
      </section>

      {/* ── Event Organiser Section ── */}
      <section style={{ background: "#FAF5EB", borderTop: `1px solid rgba(217,119,6,0.15)`, borderBottom: `1px solid rgba(217,119,6,0.15)`, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: AMBER }}>For Event Organisers</span>
            <div style={{ flex: 1, height: 1, background: "rgba(217,119,6,0.2)" }} />
          </div>

          {/* Callout headline */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 52 }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: GREEN, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: 16 }}>
                Get more people to your event.<br />Let a local business foot the reward.
              </h2>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8 }}>
                When you partner with a Jhirah-listed business as your event sponsor, their branded points become the reward for every attendee who shows up and stays present. You get a packed room — they get a direct pipeline of verified new customers. Everyone wins.
              </p>
            </div>
            {/* Sponsorship preview card */}
            <div style={{ background: CARD, border: `1.5px solid rgba(217,119,6,0.2)`, borderRadius: 18, padding: "28px 26px", boxShadow: "0 4px 24px rgba(217,119,6,0.08)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: AMBER, letterSpacing: "0.08em", textTransform: "uppercase", background: "rgba(217,119,6,0.1)", borderRadius: 5, padding: "3px 8px" }}>Sponsored Event</span>
              </div>
              <p style={{ fontSize: 17, fontWeight: 700, color: GREEN, marginBottom: 4 }}>{FEATURED_EVENT.eventName}</p>
              <p style={{ fontSize: 12, color: MUTED, marginBottom: 16 }}>Fri 6:00 PM – Fri 10:00 PM · Hayes Valley, SF</p>
              <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "rgba(45,90,39,0.07)", borderRadius: 9, marginBottom: 12 }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <span style={{ fontSize: 12, fontWeight: 700, color: ACCENT }}>{FEATURED_EVENT.pointsBrand}</span>
                <span style={{ fontSize: 11, color: MUTED, marginLeft: "auto" }}>+150 pts per 30 min</span>
              </div>
              <p style={{ fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
                Reward sponsored by <strong style={{ color: GREEN }}>{FEATURED_EVENT.sponsorName}</strong> — earn their points, redeem at their store on {FEATURED_EVENT.location}.
              </p>
            </div>
          </div>

          {/* 3 steps */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {organizerSteps.map(s => (
              <div key={s.n} style={{ background: CARD, border: `1px solid rgba(217,119,6,0.15)`, borderRadius: 14, padding: "24px 22px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(217,119,6,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: AMBER }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, color: "rgba(217,119,6,0.15)", lineHeight: 1 }}>{s.n}</span>
                </div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: GREEN, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Anti-gaming rules ── */}
      <section style={{ padding: "72px 40px", background: "#E8E4D8", borderBottom: `1px solid rgba(28,43,26,0.08)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>Anti-Gaming</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: GREEN, letterSpacing: "-0.02em", marginBottom: 12, lineHeight: 1.1 }}>
            The Zero-Click Guarantee
          </h2>
          <p style={{ fontSize: 15, color: MUTED, maxWidth: 540, lineHeight: 1.7, marginBottom: 48 }}>
            Every point in the Jhirah system — whether store or sponsor — is a point that was physically earned by a present customer.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20 }}>
            {rules.map(r => (
              <div key={r.title} style={{ background: CARD, border: `1px solid rgba(28,43,26,0.09)`, borderRadius: 14, padding: "22px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                  <div style={{ color: ACCENT }}>{r.icon}</div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: GREEN, margin: 0 }}>{r.title}</h3>
                </div>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, margin: 0 }}>{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Jhirah Loop ── */}
      <section style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 18, textAlign: "center" }}>The Full Loop</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 38px)", fontWeight: 900, color: GREEN, letterSpacing: "-0.02em", marginBottom: 44, textAlign: "center", lineHeight: 1.1 }}>
            The Jhirah Loop
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {loopSteps.map((item, i) => (
              <div key={item.label} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14, background: i % 2 === 0 ? "rgba(45,90,39,0.07)" : CARD, border: `1px solid ${i % 2 === 0 ? "rgba(45,90,39,0.15)" : "rgba(28,43,26,0.09)"}`, borderRadius: 12, padding: "13px 20px", width: "100%" }}>
                  <span style={{ width: 22, height: 22, borderRadius: 11, background: ACCENT, color: CREAM, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, color: GREEN, fontWeight: 500, lineHeight: 1.4 }}>{item.label}</span>
                </div>
                {i < loopSteps.length - 1 && (
                  <div style={{ width: 2, height: 14, background: "rgba(28,43,26,0.12)" }} />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#ECEAE1", borderTop: `1px solid rgba(28,43,26,0.08)`, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18 }}>
          <div style={{ background: CARD, border: `1.5px solid rgba(28,43,26,0.12)`, borderRadius: 16, padding: "32px 28px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: ACCENT, marginBottom: 12 }}>For Customers</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: GREEN, lineHeight: 1.2, marginBottom: 12 }}>
              Put your phone down.<br />Get rewarded.
            </h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 24 }}>
              Earn sponsor or store points per 30 min of locked time. Redeem for real dollar-value rewards.
            </p>
            <button onClick={login}
              style={{ background: ACCENT, color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "12px 20px", borderRadius: 8, width: "100%" }}>
              Create customer account →
            </button>
          </div>
          <div style={{ background: GREEN, borderRadius: 16, padding: "32px 28px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,239,231,0.45)", marginBottom: 12 }}>For Businesses</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: CREAM, lineHeight: 1.2, marginBottom: 12 }}>
              Turn foot traffic into<br />loyal regulars.
            </h3>
            <p style={{ fontSize: 13, color: "rgba(242,239,231,0.55)", lineHeight: 1.7, marginBottom: 24 }}>
              Name your points, set reward tiers, sponsor events, and broadcast campaigns only to verified visitors.
            </p>
            <button onClick={login}
              style={{ background: CREAM, color: GREEN, border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "12px 20px", borderRadius: 8, width: "100%" }}>
              List your business →
            </button>
          </div>
          <div style={{ background: "#FFFBF2", border: `1.5px solid rgba(217,119,6,0.25)`, borderRadius: 16, padding: "32px 28px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: AMBER, marginBottom: 12 }}>For Event Organisers</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 800, color: GREEN, lineHeight: 1.2, marginBottom: 12 }}>
              More attendees.<br />Sponsor the reward.
            </h3>
            <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 24 }}>
              List your event, partner with a local business, and let their branded points draw a bigger crowd to your next gathering.
            </p>
            <button onClick={login}
              style={{ background: AMBER, color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "12px 20px", borderRadius: 8, width: "100%" }}>
              List your event →
            </button>
          </div>
        </div>
      </section>

      <MarketingFooter />

    </div>
  );
}
