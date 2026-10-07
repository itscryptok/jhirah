import { Helmet } from "react-helmet-async";
import { MarketingNav } from "@/components/marketing-nav";
import { useAuth } from "@/hooks/useAuth";
import { KeyRound, Lock, Star, Gift, MapPin, Zap, ShieldCheck, Smartphone, Heart, DollarSign, Mail } from "lucide-react";
import { MarketingFooter } from "@/components/marketing-footer";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const CARD   = "#FFFFFF";

const steps = [
  {
    n: "01",
    icon: <MapPin size={20} />,
    title: "Browse local events",
    desc: "Find events sponsored by local businesses near you — searchable by city or zip code. Each listing shows the point brand you'll earn, the host business, and how long you need to stay.",
  },
  {
    n: "02",
    icon: <KeyRound size={20} />,
    title: "Get the event code",
    desc: "Arrive at the event. The host will share a short random code — displayed on screen, on a sign, or told to you at the door. No QR camera required. Just type it in.",
  },
  {
    n: "03",
    icon: <Lock size={20} />,
    title: "Enter code & lock your phone",
    desc: "Enter the event code in the Jhirah app to check in. Then put your phone away, screen down. Your presence session starts immediately and your point clock begins ticking.",
  },
  {
    n: "04",
    icon: <Star size={20} />,
    title: "Points auto-credited",
    desc: "Points accumulate for every 30 minutes of locked presence at the rate the business sets. Once the minimum duration is reached, your session auto-completes and points land in your Wallet — no scan-out, no extra step.",
  },
  {
    n: "05",
    icon: <Gift size={20} />,
    title: "Redeem real rewards",
    desc: "Your Wallet shows your point balance per business. Redeem them for real dollar-value discounts and offers — set by the businesses themselves. 100 pts = $1.00 in value.",
  },
];

const perks = [
  {
    icon: <DollarSign size={22} />,
    title: "No purchase required",
    desc: "Your points are earned by showing up and being present — not by spending money. Every minute of locked time counts, regardless of whether you buy anything.",
  },
  {
    icon: <Zap size={22} />,
    title: "Instant check-in",
    desc: "A short event code replaces QR scanning. Type it in once, lock your phone, and you're earning. No camera fumbling, no poor lighting issues, no physical QR poster needed.",
  },
  {
    icon: <ShieldCheck size={22} />,
    title: "Zero-click earning",
    desc: "The only action required is locking your screen. Jhirah runs quietly in the background tracking your time. No tapping, no engaging, no notifications to chase.",
  },
  {
    icon: <Smartphone size={22} />,
    title: "Auto-complete sessions",
    desc: "Once the business's minimum duration is reached, your session closes and points land in your Wallet automatically. No scan-out. No rush. No exit window to stress over.",
  },
  {
    icon: <Heart size={22} />,
    title: "Discover your neighbourhood",
    desc: "Jhirah surfaces local events you'd never find on social media — block parties, pop-ups, gallery nights, live sessions. Showing up is now literally worth something.",
  },
  {
    icon: <Star size={22} />,
    title: "Real dollar-value rewards",
    desc: "Redemptions are set by the business — $5 off, free item, exclusive offer. No points-for-cents gimmicks. 100 pts = $1.00, and every completed session earns you at least one cycle.",
  },
  {
    icon: <Mail size={22} />,
    title: "Newsletters from businesses you trust",
    desc: "Once you've checked in to a business or event, they can send you promotions, product arrivals, and announcements directly. Every message comes from someone you've physically visited — no spam, and you can unsubscribe in one click at any time.",
  },
];

export default function ForCustomers() {
  const { login } = useAuth();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>
      <Helmet>
        <title>Jhirah for Customers — Earn Loyalty Points Just by Being Present | Local Rewards</title>
        <meta name="description" content="Check in at local businesses and events, lock your phone, and earn 100 loyalty points per 30 minutes — redeemable for real rewards. No purchase required. Join Jhirah free." />
        <link rel="canonical" href="https://jhirah.app/for-customers" />
        <meta property="og:url" content="https://jhirah.app/for-customers" />
        <meta property="og:title" content="Earn Loyalty Points at Local Businesses — Just by Showing Up" />
        <meta property="og:description" content="Scan in, lock your phone, earn points. Redeem for real rewards at local stores and events. No purchases. No tracking. Just presence." />
      </Helmet>

      <MarketingNav />

      {/* Hero */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 40px 64px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
          For Customers
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5.5vw, 64px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: GREEN, margin: "0 0 28px" }}>
          Show up. Lock your phone.<br />Earn real rewards.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: MUTED, maxWidth: 600, marginBottom: 36 }}>
          Jhirah rewards you for being physically present at local events and businesses — no purchase needed. Enter the event code, keep your phone locked, and earn points for every 30 minutes of verified presence. They land in your Wallet automatically.
        </p>
        <button onClick={login}
          style={{ background: GREEN, color: CREAM, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", padding: "14px 28px", borderRadius: 10 }}>
          Create your free account →
        </button>
      </section>

      {/* How it works */}
      <section style={{ background: "#ECEAE1", borderTop: `1px solid rgba(28,43,26,0.08)`, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>How It Works</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: GREEN, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Five steps to your first reward.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 }}>
            {steps.map(s => (
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

      {/* Perks */}
      <section style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 18 }}>Customer Perks</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: GREEN, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Why customers love Jhirah.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {perks.map(p => (
              <div key={p.title} style={{ padding: 28, background: CARD, border: `1px solid rgba(28,43,26,0.09)`, borderRadius: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(45,90,39,0.08)", display: "flex", alignItems: "center", justifyContent: "center", color: ACCENT, marginBottom: 18 }}>
                  {p.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: GREEN, marginBottom: 10 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75, margin: 0 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Points explainer */}
      <section style={{ background: GREEN, padding: "72px 40px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(242,239,231,0.45)", marginBottom: 20 }}>The Points System</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3.5vw, 38px)", fontWeight: 900, color: CREAM, marginBottom: 24, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            100 points = $1.00 in real value.
          </h2>
          <p style={{ fontSize: 16, color: "rgba(242,239,231,0.6)", lineHeight: 1.85, maxWidth: 600, margin: "0 auto 48px" }}>
            For every 30 minutes your phone stays locked during an event or visit, you earn 100 points of the sponsoring business's loyalty currency. Points are redeemable directly with that business at a real dollar-for-dollar rate — set by them, not by us.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, maxWidth: 640, margin: "0 auto" }}>
            {[
              { pts: "100 pts", value: "$1.00", note: "30 min locked" },
              { pts: "500 pts", value: "$5.00", note: "2.5 hrs locked" },
              { pts: "1,000 pts", value: "$10.00", note: "5 hrs locked" },
            ].map(r => (
              <div key={r.pts} style={{ background: "rgba(242,239,231,0.07)", border: "1px solid rgba(242,239,231,0.12)", borderRadius: 14, padding: "20px 16px" }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: CREAM, marginBottom: 4 }}>{r.pts}</p>
                <p style={{ fontSize: 22, fontWeight: 900, color: "#86efac", marginBottom: 6 }}>{r.value}</p>
                <p style={{ fontSize: 11, color: "rgba(242,239,231,0.45)", margin: 0 }}>{r.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#ECEAE1", borderTop: `1px solid rgba(28,43,26,0.08)`, padding: "72px 40px", textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: GREEN, marginBottom: 18, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Ready to earn your first reward?
          </h2>
          <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, marginBottom: 32 }}>
            Create a free account, find an event near you, enter the code, and let the points roll in. No purchase required — ever.
          </p>
          <button onClick={login}
            style={{ background: GREEN, color: CREAM, border: "none", fontSize: 15, fontWeight: 700, cursor: "pointer", padding: "16px 36px", borderRadius: 10 }}>
            Get started free →
          </button>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
