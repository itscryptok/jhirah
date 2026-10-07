import { Helmet } from "react-helmet-async";
import { MarketingNav } from "@/components/marketing-nav";
import { useAuth } from "@/hooks/useAuth";
import { KeyRound, Calendar, Megaphone, BarChart2, Users, TrendingUp, Mail, ShieldCheck, Zap, Gift } from "lucide-react";
import { MarketingFooter } from "@/components/marketing-footer";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const CARD   = "#FFFFFF";
const AMBER  = "#D97706";

const steps = [
  {
    n: "01",
    icon: <Users size={20} />,
    title: "Create your business profile",
    desc: "Sign up, set your business name, address, and GPS location. Name your loyalty currency (e.g. 'Blue Bottle Rewards') and define tiered redemptions — 500 pts = $5 off, 1,000 pts = free item.",
  },
  {
    n: "02",
    icon: <Calendar size={20} />,
    title: "List an event & set your points rate",
    desc: "Organise or sponsor a local event and list it on Jhirah. Set how many points participants earn per 30 minutes of locked presence — and optionally a minimum duration before any points are banked. The longer they stay, the more they earn.",
  },
  {
    n: "03",
    icon: <KeyRound size={20} />,
    title: "Share your random event code",
    desc: "Jhirah instantly generates a short, random code for your event. Share it at the door — verbally, on a sign, or on-screen. Participants enter the code to check in. No QR scanning required.",
  },
  {
    n: "04",
    icon: <Mail size={20} />,
    title: "Your subscriber list grows itself",
    desc: "The moment a participant checks in, their contact is automatically linked to your business in our database. No forms. No manual collection. They become part of your reachable audience immediately.",
  },
  {
    n: "05",
    icon: <Megaphone size={20} />,
    title: "Write & send rich email newsletters",
    desc: "Use the built-in rich-text email composer to craft formatted newsletters with bold, links, headings, and lists — then send them directly to every verified attendee. Delivery stats, open audience counts, and opt-out management are handled automatically. Recipients never receive cold outreach; they chose to attend.",
  },
  {
    n: "06",
    icon: <BarChart2 size={20} />,
    title: "Track your loyalty loop",
    desc: "Monitor check-ins, points issued, campaign open rates, and reward redemptions from your dashboard. See which events drove the most subscribers and which campaigns brought people back.",
  },
];

const benefits = [
  {
    icon: <TrendingUp size={22} />,
    title: "Grow 3x faster than social media",
    desc: "A targeted email list of real, verified customers consistently outperforms social media marketing and search engine optimisation. Social algorithms shrink your reach every year. Your Jhirah subscriber list only grows.",
  },
  {
    icon: <Mail size={22} />,
    title: "No manual data collection",
    desc: "Every check-in automatically links the customer's contact to your business in our platform. No signup forms, no business cards, no spreadsheets. The list builds itself while you host a great event.",
  },
  {
    icon: <Zap size={22} />,
    title: "Half the marketing budget, double the impact",
    desc: "Redirect a fraction of what you'd spend on social ads or SEO toward organising or sponsoring a local event. Every participant who checks in becomes a verified subscriber — a proprietary audience no algorithm can take away.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Verified, permission-based audience",
    desc: "Every person on your list has physically attended one of your events or visited your venue. They already know you. Campaigns sent to warm, local audiences convert at rates that cold ad targeting cannot match.",
  },
  {
    icon: <Gift size={22} />,
    title: "Your own loyalty currency",
    desc: "Name your points, set your own redemption tiers, and control what customers earn and redeem. Your branded points appear on every event card — adding credibility and a concrete incentive to show up.",
  },
  {
    icon: <Users size={22} />,
    title: "Compounding audience with every event",
    desc: "Each event you host or sponsor adds to your subscriber base. Each repeat visit deepens the relationship. Every subsequent campaign reaches a larger, warmer audience than the last. It compounds.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Built-in email list hygiene",
    desc: "Every marketing email includes a one-click unsubscribe link. Opted-out contacts are automatically excluded from future sends. You always see your subscribed count, opted-out count, and total audience — without ever seeing individual email addresses.",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Audience stats before you send",
    desc: "Before writing a single word, your dashboard shows exactly how many subscribers you have, how many have opted out, and how many emails your current plan allows this month. No surprises. Just send with confidence.",
  },
];

export default function ForBusinesses() {
  const { login } = useAuth();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>
      <Helmet>
        <title>Jhirah for Businesses — Email Your Verified Customers | Local Business Marketing</title>
        <meta name="description" content="List your business on Jhirah and send email campaigns exclusively to customers who have physically visited your location. Higher open rates than social media. More repeat visits. Starts at $19/month." />
        <link rel="canonical" href="https://jhirah.app/for-businesses" />
        <meta property="og:url" content="https://jhirah.app/for-businesses" />
        <meta property="og:title" content="Jhirah for Businesses — Email Marketing to Verified In-Store Customers" />
        <meta property="og:description" content="Send campaigns only to customers who've walked through your door. Better than social ads, better than SEO — because your audience already trusts you." />
      </Helmet>

      <MarketingNav />

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 40px 64px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
          For Businesses
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: GREEN, margin: "0 0 28px" }}>
          Grow your customer base<br />3x faster with organic email list<br />marketing at Jhirah.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: 640, marginBottom: 16 }}>
          Do you know that email list marketing can help you grow your customer base 3× faster than social media or search engine optimisation? For half of your marketing budget, organise or sponsor an event where you reward participants with store points.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.85, color: MUTED, maxWidth: 640, marginBottom: 36 }}>
          List your event on Jhirah where anyone can easily find it. Jhirah generates a random event code to share at the door. Participants check in, lock their phone, and earn points at the rate you set — with every 30 minutes of verified presence adding to their total. Every attendee automatically becomes a subscriber, no forms, no manual collection.
        </p>
        <button onClick={login}
          style={{ background: GREEN, color: CREAM, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", padding: "14px 28px", borderRadius: 10 }}>
          List your business →
        </button>
      </section>

      {/* Email marketing insight banner */}
      <section style={{ background: ACCENT, padding: "48px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 40 }}>
          {[
            { stat: "3×", label: "faster customer growth", note: "vs. social media" },
            { stat: "40×", label: "higher ROI", note: "email vs. paid social ads" },
            { stat: "100%", label: "warm audience", note: "every subscriber attended your event" },
          ].map(s => (
            <div key={s.stat} style={{ textAlign: "center" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 48, fontWeight: 900, color: CREAM, lineHeight: 1, marginBottom: 8 }}>{s.stat}</p>
              <p style={{ fontSize: 14, fontWeight: 600, color: "rgba(242,239,231,0.8)", marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 12, color: "rgba(242,239,231,0.45)", margin: 0 }}>{s.note}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section style={{ background: GREEN, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 48 }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,239,231,0.5)" }}>How It Works</span>
            <div style={{ flex: 1, height: 1, background: "rgba(242,239,231,0.12)" }} />
          </div>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: CREAM, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            From first event to loyal subscriber base.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 16 }}>
            {steps.map(s => (
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
      </section>

      {/* Benefits */}
      <section style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>Why It Works</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: GREEN, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Benefits for your business.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {benefits.map(b => (
              <div key={b.title} style={{ padding: 28, background: CARD, border: `1px solid rgba(28,43,26,0.09)`, borderRadius: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(45,90,39,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT, marginBottom: 18 }}>
                  {b.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: GREEN, marginBottom: 10 }}>{b.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75, margin: 0 }}>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategy callout */}
      <section style={{ background: "#FAF5EB", borderTop: `1px solid rgba(217,119,6,0.15)`, borderBottom: `1px solid rgba(217,119,6,0.15)`, padding: "72px 40px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: AMBER, marginBottom: 20 }}>The Strategy</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: GREEN, marginBottom: 28, letterSpacing: "-0.02em", lineHeight: 1.15 }}>
            Spend half your marketing budget on one event. Own the audience forever.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MUTED, marginBottom: 24 }}>
            Social platforms decide how many of your followers see your posts — and that number shrinks unless you pay to boost it. SEO rewards the biggest budgets and the longest runways. Neither channel puts your message directly in front of someone who has physically been to your event.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MUTED, marginBottom: 24 }}>
            An email list of real, verified attendees does. And unlike paid media, it doesn't stop working when the budget runs out. Every event you host or sponsor on Jhirah adds warm, local subscribers to your list. Each campaign you send reaches a larger, more receptive audience than the last.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MUTED }}>
            The math is simple: redirect a portion of what you'd spend on social ads or search toward one well-run local event. The participants who show up and check in become your subscribers. Every subsequent event compounds the list. The audience becomes a proprietary marketing asset that no algorithm can devalue or take away from you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: GREEN, padding: "72px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: CREAM, marginBottom: 18, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Ready to grow your customer base?
          </h2>
          <p style={{ fontSize: 15, color: "rgba(242,239,231,0.6)", lineHeight: 1.7, marginBottom: 32 }}>
            Create your business profile, list your first event, set your points rate and optional minimum duration, and let Jhirah build your subscriber list while you host a great experience.
          </p>
          <button onClick={login}
            style={{ background: CREAM, color: GREEN, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", padding: "16px 36px", borderRadius: 10 }}>
            List your business →
          </button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
