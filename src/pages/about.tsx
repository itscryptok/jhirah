import { Helmet } from "react-helmet-async";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { useAuth } from "@/hooks/useAuth";
import { Heart, Leaf, Users, Zap, Mail, ExternalLink } from "lucide-react";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const TEAL   = "#0D9488";
const TEAL_L = "#CCFBF1";
const CARD   = "#FFFFFF";

export default function About() {
  const { login } = useAuth();

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>
      <Helmet>
        <title>About Jhirah — Presence-Based Email Marketing Platform for Local Businesses</title>
        <meta name="description" content="Jhirah was built to help local businesses grow through real human presence — not clicks, impressions, or ad spend. Learn why presence-based email marketing outperforms every other local marketing channel." />
        <link rel="canonical" href="https://jhirah.app/about" />
        <meta property="og:url" content="https://jhirah.app/about" />
        <meta property="og:title" content="About Jhirah — Why Presence-Based Marketing Beats Social Media & SEO" />
        <meta property="og:description" content="We built Jhirah because local businesses deserve a marketing channel that rewards actual visits — not scrolling." />
      </Helmet>

      <MarketingNav />

      {/* ── Hero ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "72px 40px 64px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: TEAL, marginBottom: 20 }}>
          About Jhirah
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(38px, 5.5vw, 64px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: GREEN, margin: "0 0 28px" }}>
          The email marketing platform<br />built on real presence.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.8, color: MUTED, maxWidth: 620 }}>
          Jhirah is a loyalty and email marketing platform built exclusively for local businesses and community events. We reward customers for physically showing up — and turn those verified visits into a targeted email audience that no algorithm can take away from you.
        </p>
      </section>

      {/* ── Mission ── */}
      <section style={{ background: GREEN, padding: "72px 40px" }}>
        <div style={{ maxWidth: 780, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(204,251,241,0.5)", marginBottom: 28 }}>Our Mission</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px, 2.5vw, 24px)", lineHeight: 1.8, color: "rgba(242,239,231,0.88)", fontStyle: "italic", margin: 0 }}>
            "We exist to grow local businesses by rewarding customers simply for being present — not for spending, clicking, or sharing. Every check-in builds a verified audience. Every verified audience makes the next campaign more powerful than any social media ad or search ranking ever could."
          </p>
        </div>
      </section>

      {/* ── Values ── */}
      <section style={{ padding: "72px 40px", background: "#ECEAE1", borderBottom: `1px solid rgba(28,43,26,0.08)` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: TEAL, marginBottom: 18 }}>Values</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: GREEN, marginBottom: 52, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            What we stand for
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {[
              {
                icon: <Leaf size={20} />,
                title: "Presence Over Clicks",
                desc: "Every product decision starts with one question: does this bring people closer to each other in real life, or further apart? We always choose closer.",
              },
              {
                icon: <Heart size={20} />,
                title: "Local First, Always",
                desc: "Jhirah exists exclusively for locally-owned businesses and community events. Our growth is measured in the growth of the neighborhoods we serve.",
              },
              {
                icon: <Mail size={20} />,
                title: "Verified Email Marketing",
                desc: "Every customer who checks in becomes a permission-based email contact for that business. No cold lists. No scraped data. Just people who have already chosen you.",
              },
              {
                icon: <Users size={20} />,
                title: "Sponsored Events as Ads",
                desc: "Businesses pay to sponsor events and to be featured — just like search engine ads, but the impression is a physical visit, not a scroll. The ROI is categorically different.",
              },
              {
                icon: <Zap size={20} />,
                title: "Earned, Not Gamed",
                desc: "Points are earned through real time spent at your location — not through referral hacks, notification clicks, or engagement bait. If you weren't there, you don't earn.",
              },
              {
                icon: <Heart size={20} />,
                title: "Zero-Click Culture",
                desc: "We are the only loyalty platform that asks customers to do less with their phone, not more. Put it down. Be here. That's the entire ask — and the entire point.",
              },
            ].map(v => (
              <div key={v.title} style={{ padding: 28, background: CARD, border: `1px solid rgba(28,43,26,0.09)`, borderRadius: 16 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: TEAL_L, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL, marginBottom: 18 }}>
                  {v.icon}
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: GREEN, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.75, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we solve ── */}
      <section style={{ padding: "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: TEAL, marginBottom: 18 }}>The Problem</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: GREEN, marginBottom: 48, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            What we're solving
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                label: "For local businesses",
                text: "Social ads reach strangers. SEO rewards the biggest budgets. Existing loyalty apps reward digital interactions — app downloads, receipt scans, review clicks — none of which translates to repeat foot traffic. Jhirah only emails people who have physically been inside your location, making every campaign radically more effective.",
              },
              {
                label: "For event organisers",
                text: "Getting people to attend a community event is hard. Jhirah lets organisers partner with local business sponsors who fund the reward points — turning attendance at any event into points redeemable at a nearby shop. More attendees, more sponsors, more neighbourhood energy.",
              },
              {
                label: "For customers",
                text: "Every other loyalty program asks you to do more with your phone: scan receipts, collect codes, follow accounts. Jhirah is the first that asks you to do less. Attend free events and local venues, lock your phone, and earn real reward points just for being present. No purchases. No tracking. No noise.",
              },
              {
                label: "For neighborhoods",
                text: "When people spend time at local businesses with their phones put away, they talk to owners, discover regulars, and build the social fabric that makes a neighborhood worth living in. Jhirah is the infrastructure for that kind of community.",
              },
            ].map((p, i) => (
              <div key={p.label} style={{ display: "flex", gap: 28, alignItems: "flex-start", padding: "28px 0", borderTop: i > 0 ? `1px solid rgba(28,43,26,0.08)` : "none" }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: TEAL, flexShrink: 0, marginTop: 8 }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TEAL, letterSpacing: "0.07em", textTransform: "uppercase", marginBottom: 8 }}>{p.label}</div>
                  <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.8, margin: 0 }}>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Email marketing edge ── */}
      <section style={{ padding: "72px 40px", background: CREAM, borderTop: `1px solid rgba(28,43,26,0.08)` }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: TEAL, marginBottom: 18 }}>The Marketing Edge</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: GREEN, marginBottom: 28, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            A verified email list beats<br />social media and SEO. Every time.
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MUTED, maxWidth: 680, marginBottom: 24 }}>
            Social platforms decide how many of your followers see your posts — and that number shrinks every year unless you pay to boost it. SEO rewards the largest budgets and the longest runways. Neither puts your message in front of someone who has already walked through your door.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MUTED, maxWidth: 680, marginBottom: 24 }}>
            Jhirah builds a verified email list for you automatically. The moment a customer checks in at your venue or sponsored event, their contact is linked to your business — no forms, no follow-up, no friction. When you're ready to send a promotion, product arrival, or event announcement, your campaign lands directly in the inbox of someone who already trusts you.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.85, color: MUTED, maxWidth: 680 }}>
            Businesses can also pay for featured placement on the home screen — putting their event or venue in front of every visitor who browses Jhirah, just like a sponsored search result, except the impression leads to a real physical visit and a verified contact, not a click that disappears.
          </p>
        </div>
      </section>

      {/* ── Company ── */}
      <section style={{ background: GREEN, padding: "72px 40px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(204,251,241,0.5)", marginBottom: 20 }}>
            The Company
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 900, color: CREAM, marginBottom: 24, letterSpacing: "-0.02em", lineHeight: 1.1 }}>
            Built by Cryp Tok Solutions
          </h2>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(242,239,231,0.65)", maxWidth: 620, marginBottom: 36 }}>
            Jhirah is a product of <strong style={{ color: CREAM, fontWeight: 700 }}>Cryp Tok Solutions</strong> — a technology company focused on building digital infrastructure that strengthens local economies and real-world communities. We believe technology should bring people closer together, not further apart.
          </p>
          <a
            href="https://cryptok.online"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(13,148,136,0.2)", border: "1px solid rgba(13,148,136,0.4)", color: CREAM, fontSize: 14, fontWeight: 600, padding: "12px 20px", borderRadius: 8, textDecoration: "none", cursor: "pointer" }}
          >
            Visit cryptok.online
            <ExternalLink size={14} style={{ opacity: 0.7 }} />
          </a>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "#ECEAE1", borderTop: `1px solid rgba(28,43,26,0.08)`, padding: "72px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
          <div style={{ background: CARD, border: `1.5px solid rgba(13,148,136,0.2)`, borderRadius: 16, padding: "36px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: TEAL, marginBottom: 12 }}>For Customers</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 800, color: GREEN, lineHeight: 1.2, marginBottom: 14 }}>
              Attend free events.<br />Get rewarded for showing up.
            </h3>
            <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 24 }}>
              Check in at local businesses and events, lock your phone, and earn 100 pts per 30 min — redeemable for real rewards. No purchase required.
            </p>
            <button onClick={login}
              style={{ background: TEAL, color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "13px 24px", borderRadius: 8, width: "100%" }}>
              Create customer account →
            </button>
          </div>
          <div style={{ background: GREEN, borderRadius: 16, padding: "36px 32px" }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(204,251,241,0.5)", marginBottom: 12 }}>For Businesses</p>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 800, color: CREAM, lineHeight: 1.2, marginBottom: 14 }}>
              Email your verified customers.<br />Grow 3× faster.
            </h3>
            <p style={{ fontSize: 14, color: "rgba(242,239,231,0.55)", lineHeight: 1.7, marginBottom: 24 }}>
              Generate a location-locked event code, build a verified email list from every check-in, and send campaigns that outperform any social media or SEO spend.
            </p>
            <button onClick={login}
              style={{ background: TEAL, color: "#fff", border: "none", fontSize: 14, fontWeight: 700, cursor: "pointer", padding: "13px 24px", borderRadius: 8, width: "100%" }}>
              List your business →
            </button>
          </div>
        </div>
      </section>

      <MarketingFooter />
    </div>
  );
}
