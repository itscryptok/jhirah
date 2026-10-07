import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet-async";
import { useAuth } from "@/hooks/useAuth";
import { MarketingFooter } from "@/components/marketing-footer";
import { MarketingNav } from "@/components/marketing-nav";
import { FEATURED_EVENT } from "../data/featuredEvent";

/* ─── Brand tokens ───────────────────────────────────────────── */
const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";
const TEAL   = "#0D9488";   // new accent from screenshot
const TEAL_L = "#CCFBF1";   // teal-50 — light tint

/* ─── Background blob arc component ─────────────────────────── */
/*
  Each blob is a large, softly-rounded div placed absolutely inside
  a `position:relative; overflow:hidden` section wrapper.
  They're purely decorative (pointer-events:none, aria-hidden).
*/
function Blob({
  w = 400, h = 520,
  top, bottom, left, right,
  opacity = 0.13,
  rx = "58% 42% 62% 38% / 48% 55% 45% 52%",
  rotate = 0,
}: {
  w?: number; h?: number;
  top?: number | string; bottom?: number | string;
  left?: number | string; right?: number | string;
  opacity?: number;
  rx?: string;
  rotate?: number;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: w, height: h,
        top, bottom, left, right,
        borderRadius: rx,
        background: TEAL,
        opacity,
        transform: `rotate(${rotate}deg)`,
        pointerEvents: "none",
        zIndex: 0,
      }}
    />
  );
}

/* ─── Data model ──────────────────────────────────────────────── */

interface BizCard {
  id: string;
  name: string;
  type: "business" | "event";
  sponsorNames?: string[];
  category: string;
  area: string;
  startTime: string;
  endTime: string;
  pts: number;
  status: "active" | "soon" | "week";
  zipCode?: string;
  activeCount?: number;
  pointsName: string;
}

const ALL_CARDS: BizCard[] = [
  { id: "1",  type: "business", name: "Dandelion Chocolate",           category: "Chocolatier",  area: "Mission, San Francisco",          zipCode: "94110", startTime: "10:00 AM",     endTime: "9:00 PM",      pts: 100, status: "active", activeCount: 12, pointsName: "Store Points"    },
  { id: "2",  type: "event",    name: "Tartine Bakery Food Tasting",   category: "Event",        area: "Castro, San Francisco",           zipCode: "94114", startTime: "11:00 AM",     endTime: "4:00 PM",      pts: 100, status: "active", activeCount: 18, pointsName: "Store Points"    },
  { id: "3",  type: "event",    name: "Metophis Store Opening Event",  category: "Event",        area: "Fillmore, San Francisco",         zipCode: "94115", startTime: "9:00 AM",      endTime: "6:00 PM",      pts: 100, status: "active", activeCount: 7,  pointsName: "Store Points"    },
  { id: "4",  type: "business", name: "Ritual Coffee Roasters",        category: "Café",         area: "Mission District, San Francisco", zipCode: "94110", startTime: "7:30 AM",      endTime: "3:00 PM",      pts: 100, status: "active", activeCount: 8,  pointsName: "Store Points"    },
  { id: "5",  type: "event",    name: "Hayes Annual Market Festival",  category: "Event",        area: "Hayes Valley, San Francisco",     zipCode: "94102", startTime: "2:00 PM",      endTime: "9:00 PM",      pts: 150, status: "soon",                        pointsName: "Community Points", sponsorNames: ["Coffee Roasters", "Troget", "Waymart"] },
  { id: "6",  type: "business", name: "Nopa Restaurant",               category: "Restaurant",   area: "Western Addition, SF",            zipCode: "94117", startTime: "12:00 PM",     endTime: "10:00 PM",     pts: 150, status: "soon",                        pointsName: "Store Points"    },
  { id: "7",  type: "business", name: "Bi-Rite Creamery",              category: "Ice Cream",    area: "Dolores Park, SF",                zipCode: "94114", startTime: "11:00 AM",     endTime: "11:00 PM",     pts: 100, status: "soon",                        pointsName: "Store Points"    },
  { id: "8",  type: "business", name: "Four Barrel Coffee",            category: "Café",         area: "Valencia St, San Francisco",      zipCode: "94110", startTime: "6:30 AM",      endTime: "4:00 PM",      pts: 100, status: "soon",                        pointsName: "Store Points"    },
  { id: "9",  type: "event",    name: "Annual Library Book Signing",   category: "Event",        area: "Civic Center, SF",                zipCode: "94102", startTime: "Sat 10:00 AM", endTime: "Sat 4:00 PM",  pts: 150, status: "week",                        pointsName: "Community Points", sponsorNames: ["Barnesy", "D3D", "Makazon"] },
  { id: "10", type: "business", name: "Foreign Cinema",                category: "Bar & Dining", area: "Mission, San Francisco",          zipCode: "94110", startTime: "Fri 6:00 PM",  endTime: "Fri 11:00 PM", pts: 250, status: "week",                        pointsName: "Store Points"    },
  { id: "11", type: "business", name: "Flour + Water",                 category: "Restaurant",   area: "Mission, San Francisco",          zipCode: "94110", startTime: "Wed 5:30 PM",  endTime: "Wed 10:30 PM", pts: 200, status: "week",                        pointsName: "Store Points"    },
  { id: "12", type: "business", name: "State Bird Provisions",         category: "Restaurant",   area: "Fillmore, SF",                    zipCode: "94115", startTime: "Thu 5:30 PM",  endTime: "Thu 11:00 PM", pts: 250, status: "week",                        pointsName: "Store Points"    },
];

/* ─── BusinessCard ─────────────────────────────────────────────── */

function BusinessCard({ card, login }: { card: BizCard; login: () => void }) {
  const isActive = card.status === "active";
  const isSoon   = card.status === "soon";
  const isEvent  = card.type === "event";

  const statusColor = isActive ? TEAL : isSoon ? AMBER : "#6366F1";
  const statusBg    = isActive ? TEAL_L : isSoon ? "rgba(245,158,11,0.12)" : "rgba(99,102,241,0.1)";
  const statusLabel = isActive ? "● Live now" : isSoon ? "Starting soon" : "This week";

  return (
    <div
      className="rounded-2xl flex flex-col gap-0 overflow-hidden"
      style={{
        background: "#fff",
        border: `1.5px solid ${isActive ? "rgba(13,148,136,0.22)" : isEvent ? "rgba(217,119,6,0.18)" : "rgba(28,43,26,0.1)"}`,
        boxShadow: isActive ? "0 2px 16px rgba(13,148,136,0.10)" : "0 1px 6px rgba(28,43,26,0.05)",
      }}
    >
      {/* Coloured top stripe for active */}
      {isActive && (
        <div style={{ height: 3, background: `linear-gradient(90deg, ${TEAL}, #34D399)` }} />
      )}

      <div className="p-5 flex flex-col gap-3">
        {/* Header row */}
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <p className="text-[15px] font-bold mb-1 truncate" style={{ color: GREEN }}>{card.name}</p>
            <div className="flex items-center gap-1.5 flex-wrap">
              {isEvent && (
                <span className="text-[10px] font-bold rounded-full px-2 py-0.5 uppercase tracking-wide" style={{ color: AMBER, background: "rgba(217,119,6,0.1)" }}>
                  Sponsored
                </span>
              )}
              <span className="text-[11px]" style={{ color: MUTED }}>{card.category} · {card.area}</span>
            </div>
            {isEvent && card.sponsorNames && card.sponsorNames.length > 0 && (
              <p className="text-[11px] mt-1 truncate" style={{ color: MUTED }}>
                by{" "}
                <span className="font-semibold" style={{ color: GREEN }}>
                  {card.sponsorNames.length === 1
                    ? card.sponsorNames[0]
                    : `${card.sponsorNames.slice(0, -1).join(", ")} & ${card.sponsorNames[card.sponsorNames.length - 1]}`}
                </span>
              </p>
            )}
          </div>
          <span
            className="text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap shrink-0"
            style={{ background: statusBg, color: statusColor }}
          >
            {statusLabel}
          </span>
        </div>

        {/* Time + attendees */}
        <div className="flex items-center gap-1.5 text-[12px]" style={{ color: MUTED }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
          </svg>
          <span className="font-semibold" style={{ color: GREEN }}>{card.startTime}</span>
          <span>–</span>
          <span>{card.endTime}</span>
          {isActive && card.activeCount != null && (
            <>
              <span style={{ color: "rgba(28,43,26,0.2)" }}>·</span>
              <span className="font-semibold" style={{ color: TEAL }}>{card.activeCount} present</span>
            </>
          )}
        </div>

        {/* Points bar (inspired by screenshot milestone progress bar) */}
        <div className="rounded-xl px-3.5 py-2.5" style={{ background: isActive ? TEAL_L : "rgba(28,43,26,0.04)" }}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold" style={{ color: isActive ? TEAL : MUTED }}>Earn per 30 min</span>
            <span className="text-[14px] font-extrabold" style={{ color: isActive ? TEAL : ACCENT }}>+{card.pts} pts</span>
          </div>
          {/* progress bar — visual only, shows pts as fraction of max 250 */}
          <div className="rounded-full overflow-hidden" style={{ height: 4, background: isActive ? "rgba(13,148,136,0.2)" : "rgba(28,43,26,0.1)" }}>
            <div
              className="h-full rounded-full"
              style={{
                width: `${Math.min(100, (card.pts / 250) * 100)}%`,
                background: isActive ? `linear-gradient(90deg, ${TEAL}, #34D399)` : "rgba(45,90,39,0.4)",
              }}
            />
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={login}
          className="w-full text-[13px] font-bold py-2.5 rounded-xl cursor-pointer border-none"
          style={{
            background: isActive ? TEAL : "transparent",
            color: isActive ? "#fff" : ACCENT,
            border: isActive ? "none" : `1.5px solid ${ACCENT}`,
          }}
        >
          {isActive ? "Claim rewards →" : "Remind me"}
        </button>
      </div>
    </div>
  );
}

/* ─── AccordionSection ─────────────────────────────────────────── */

function AccordionSection({ title, badge, cards, login, defaultOpen = false }:
  { title: string; badge?: string; cards: BizCard[]; login: () => void; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const [hovered, setHovered] = useState(false);

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${open ? "rgba(13,148,136,0.2)" : "rgba(28,43,26,0.1)"}`, transition: "border-color 0.2s" }}>
      <button
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="w-full flex items-center justify-between border-none cursor-pointer text-left"
        style={{
          padding: "14px 18px",
          background: open ? "rgba(13,148,136,0.05)" : hovered ? "#f5f3ec" : "#fff",
          transition: "background 0.15s",
        }}
      >
        <div className="flex items-center gap-3">
          <span style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            width: 26, height: 26, borderRadius: 8,
            background: open ? TEAL : "rgba(28,43,26,0.1)",
            transition: "background 0.2s", flexShrink: 0,
          }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
              stroke={open ? "#fff" : MUTED}
              strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.22s ease" }}>
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </span>
          <span className="text-[15px] font-bold" style={{ color: GREEN, letterSpacing: "-0.01em" }}>{title}</span>
          {badge && (
            <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full" style={{ background: TEAL_L, color: TEAL, letterSpacing: "0.04em" }}>
              {badge}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2" style={{ flexShrink: 0 }}>
          <span className="text-[12px] font-semibold" style={{ color: MUTED }}>{cards.length} {cards.length === 1 ? "venue" : "venues"}</span>
          <span className="text-[11px] font-medium hidden sm:inline" style={{ color: open ? TEAL : "rgba(28,43,26,0.3)", transition: "color 0.2s" }}>
            {open ? "collapse" : "expand"}
          </span>
        </div>
      </button>

      {open && (
        <div style={{ padding: "16px 18px 20px", borderTop: "1px solid rgba(28,43,26,0.08)", background: "rgba(242,239,231,0.5)" }}>
          <div
            className="grid gap-3.5"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
              maxHeight: "688px",
              overflowY: "auto",
              paddingRight: 6,
              scrollbarWidth: "thin",
              scrollbarColor: `${TEAL} transparent`,
            } as React.CSSProperties}
          >
            {cards.map(c => <BusinessCard key={c.id} card={c} login={login} />)}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Landing ──────────────────────────────────────────────────── */

export default function Landing() {
  const [, navigate] = useLocation();
  const { isAuthenticated, isLoading, user, login } = useAuth();
  const [search, setSearch] = useState("");

  // Move redirect into an effect — never call navigate() during render,
  // it causes a synchronous state update mid-render which flickers.
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      if (user?.role === "business_owner") navigate("/dashboard");
      else if (user?.role === "customer")  navigate("/wallet");
      else if (user)                       navigate("/onboarding");
    }
  }, [isLoading, isAuthenticated, user]);

  const q = search.trim().toLowerCase();
  function filterCards(status: BizCard["status"]) {
    return ALL_CARDS.filter(c =>
      c.status === status &&
      (!q || c.area.toLowerCase().includes(q) || c.name.toLowerCase().includes(q) ||
       (c.zipCode ?? "").includes(q) || c.sponsorNames?.some(s => s.toLowerCase().includes(q)))
    );
  }
  const activeCards = filterCards("active");
  const soonCards   = filterCards("soon");
  const weekCards   = filterCards("week");

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: CREAM, color: GREEN }}>

      <Helmet>
        <title>Jhirah — Email Marketing for Local Businesses | Beat Social Media & SEO</title>
        <meta name="description" content="Jhirah is the email marketing and loyalty platform built for local businesses. Send campaigns only to verified in-store visitors — higher open rates, more repeat foot traffic, and better ROI than social media ads or SEO." />
        <link rel="canonical" href="https://jhirah.app/" />
        <meta property="og:url" content="https://jhirah.app/" />
        <meta property="og:title" content="Jhirah — Email Marketing That Outperforms Social Media for Local Businesses" />
        <meta property="og:description" content="Only email verified in-store visitors. Higher open rates. More repeat foot traffic. Better ROI than any ad spend." />
      </Helmet>

      <MarketingNav />

      {/* ── Hero ──────────────────────────────────────────────────── */}
      {/* Full-width wrapper so blobs can reach the viewport edges */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Upper-right portrait arc — large tall teal blob peeking in from the right */}
        <Blob w={340} h={560} top={-80} right={-130} rx="50% 0 0 50% / 42% 0 0 42%" opacity={0.13} rotate={10} />
        {/* Lower-left arc — counterpart coming up from the bottom-left */}
        <Blob w={300} h={480} bottom={-120} left={-110} rx="0 50% 50% 0 / 0 42% 42% 0" opacity={0.10} rotate={-8} />

      <section className="max-w-[1100px] mx-auto px-5 md:px-10 py-9 md:py-[72px] flex flex-col gap-7 md:grid md:gap-[60px] md:items-center"
        style={{ position: "relative", zIndex: 1, gridTemplateColumns: "1fr 320px" }}>

        {/* Captions + featured card — stacked in right col */}
        <div className="flex flex-col gap-2.5 md:col-start-2">

          {/* Caption pills */}
          <div className="flex flex-col gap-1.5">
            <Link href="/for-customers" className="inline-flex items-start gap-2 rounded-xl px-3 py-2" style={{ background: "#1A9E8F", textDecoration: "none" }}>
              <span className="text-[10px] font-black uppercase tracking-widest shrink-0 mt-[1px]" style={{ color: "rgba(255,255,255,0.6)" }}>Customers</span>
              <span className="text-[11px] leading-snug" style={{ color: "#fff" }}>
                Earn Customers' reward points for showing up to free &amp; sponsored local events [How it works].
              </span>
            </Link>
            <Link href="/for-businesses" className="inline-flex items-start gap-2 rounded-xl px-3 py-2" style={{ background: "#1A9E8F", textDecoration: "none" }}>
              <span className="text-[10px] font-black uppercase tracking-widest shrink-0 mt-[1px]" style={{ color: "rgba(255,255,255,0.6)" }}>Businesses</span>
              <span className="text-[11px] leading-snug" style={{ color: "#fff" }}>
                Grow your business 3x faster and much cheaper than paid ads or SEO [How it works].
              </span>
            </Link>
          </div>

          {/* Featured card */}
          <div className="relative rounded-3xl overflow-hidden min-h-[300px] md:min-h-[380px]">
          <img
            src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=80"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover scale-105"
            style={{ filter: "blur(3px) brightness(0.45) saturate(0.6)" }}
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, rgba(13,148,136,0.25) 0%, rgba(28,43,26,0.65) 100%)" }} />

          <div className="relative z-10 p-7">
            <div className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-5"
              style={{ background: "rgba(13,148,136,0.3)", border: "1px solid rgba(13,148,136,0.5)", backdropFilter: "blur(6px)" }}>
              <svg width="9" height="9" viewBox="0 0 24 24" fill={TEAL}><circle cx="12" cy="12" r="10"/></svg>
              <span className="text-[11px] font-bold uppercase tracking-widest" style={{ color: TEAL_L }}>Featured</span>
            </div>

            <div className="rounded-[18px] p-5 shadow-2xl" style={{ background: "rgba(255,255,255,0.97)" }}>
              {/* Live indicator */}
              <div className="flex items-center gap-1.5 mb-3.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: TEAL }} />
                <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: TEAL }}>{FEATURED_EVENT.presentCount} Present</span>
              </div>

              <p className="text-base font-bold mb-0.5" style={{ color: GREEN }}>{FEATURED_EVENT.eventName}</p>
              <p className="text-[11px] mb-3" style={{ color: MUTED }}>
                Reward by <span className="font-semibold" style={{ color: GREEN }}>{FEATURED_EVENT.sponsorName}</span> · scan in
              </p>

              {/* Points progress bar — like the screenshot "claim free points" bar */}
              <div className="rounded-xl p-3 mb-3" style={{ background: TEAL_L }}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-semibold" style={{ color: TEAL }}>You'll earn</span>
                  <span className="text-[18px] font-extrabold" style={{ color: TEAL }}>+{FEATURED_EVENT.pts} pts</span>
                </div>
                <div className="rounded-full overflow-hidden" style={{ height: 6, background: "rgba(13,148,136,0.2)" }}>
                  <div className="h-full rounded-full" style={{ width: "40%", background: `linear-gradient(90deg, ${TEAL}, #34D399)` }} />
                </div>
                <p className="text-[10px] mt-1" style={{ color: TEAL }}>for first {FEATURED_EVENT.firstArrivals} arrivals</p>
              </div>

              <p className="text-[11px] mb-3" style={{ color: MUTED }}>{FEATURED_EVENT.timeLabel}</p>

              {/* Phone locked badge */}
              <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg mb-3" style={{ background: "rgba(28,43,26,0.05)" }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                <span className="text-[12px] font-semibold" style={{ color: ACCENT }}>Phone locked · earn while you stay</span>
              </div>

              {/* Primary CTA — sponsored placement drives conversions */}
              <button
                onClick={login}
                className="w-full border-none cursor-pointer text-[13px] font-bold py-3 rounded-xl"
                style={{ background: TEAL, color: "#fff" }}
              >
                Claim rewards →
              </button>
              <p className="text-center text-[10px] mt-2" style={{ color: MUTED }}>
                Scan in · lock your phone · scan out
              </p>
            </div>
          </div>
        </div>
        </div>{/* end captions + card column wrapper */}

        {/* Hero text */}
        <div className="md:col-start-1 md:row-start-1">
          <p className="text-[17px] md:text-[20px] font-bold mb-4" style={{ color: GREEN }}>
            Find events sponsored by local businesses around you.
          </p>
          <h1 className="font-serif font-black leading-[1.08] tracking-tight mb-4"
            style={{ fontSize: "clamp(26px, 7vw, 60px)", color: GREEN }}>
            Earn reward points<br />simply by showing up,<br />and being present—<br />no purchase required.
          </h1>
          <p className="text-[17px] md:text-[20px] font-bold mb-4" style={{ color: GREEN }}>
            Checked-in and Phone locked.
          </p>
          <p className="text-[15px] leading-relaxed mb-3 max-w-sm" style={{ color: MUTED }}>
            Jhirah turns real presence into points. Scan in. Lock your phone. Scan out. Merchants reach you only if you've been there before. No noise. No tracking. Just presence.
          </p>
          <p className="text-[13px] italic leading-relaxed mb-8 max-w-sm pl-4" style={{ color: "rgba(138,138,122,0.85)", borderLeft: `3px solid ${TEAL}` }}>
            Sponsored events is how local businesses spread awareness and grow their foot traffic.
          </p>
          <div className="flex flex-col gap-2.5 w-full md:max-w-xs">
            <button onClick={login}
              className="flex items-center justify-between border-none text-[15px] font-semibold cursor-pointer px-5 py-[15px] rounded-xl"
              style={{ background: TEAL, color: "#fff" }}>
              <span>
                <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ opacity: 0.7 }}>For Customers</span>
                Join & start earning points
              </span>
              <span className="text-lg opacity-80">→</span>
            </button>
            <button onClick={login}
              className="flex items-center justify-between text-[15px] font-semibold cursor-pointer px-5 py-[15px] rounded-xl"
              style={{ background: "transparent", color: GREEN, border: "1.5px solid rgba(28,43,26,0.25)" }}>
              <span>
                <span className="block text-[10px] font-bold tracking-widest uppercase mb-0.5" style={{ opacity: 0.4 }}>For local businesses & events</span>
                List your venue & get foot traffic
              </span>
              <span className="text-lg" style={{ opacity: 0.4 }}>→</span>
            </button>
          </div>
        </div>
      </section>
      </div>{/* end hero blob wrapper */}

      {/* ── Discovery ─────────────────────────────────────────────── */}
      {/* Background color on wrapper so blobs render between bg and content */}
      <div style={{ position: "relative", overflow: "hidden", background: "#ECEAE1", borderTop: "1px solid rgba(28,43,26,0.08)" }}>
        {/* Blob peeking in from upper-left corner */}
        <Blob w={280} h={420} top={-60} left={-100} rx="0 52% 52% 0 / 0 44% 44% 0" opacity={0.14} rotate={6} />
        {/* Blob peeking in from lower-right */}
        <Blob w={320} h={500} bottom={-100} right={-120} rx="54% 0 0 54% / 46% 0 0 46%" opacity={0.11} rotate={-5} />
      <section className="px-5 md:px-10 py-10 md:py-[60px]" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto">

          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase mb-2.5" style={{ color: TEAL }}>Discover</p>
              <h2 className="font-serif font-black leading-[1.1] tracking-tight m-0" style={{ fontSize: "clamp(24px, 4vw, 36px)", color: GREEN }}>
                Local businesses & events near you
              </h2>
            </div>
            <div className="relative w-full md:w-auto md:shrink-0">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={MUTED} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search by city, zip code or store name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full md:w-72 pl-9 pr-4 py-2.5 text-sm rounded-lg outline-none font-sans"
                style={{ color: GREEN, background: "#fff", border: `1.5px solid rgba(13,148,136,0.25)` }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <AccordionSection title="Active Sessions" badge={activeCards.length > 0 ? `${activeCards.length} open now` : undefined} cards={activeCards} login={login} defaultOpen={true} />
            <AccordionSection title="Starting Soon" cards={soonCards} login={login} defaultOpen={true} />
            <AccordionSection title="Happening This Week" cards={weekCards} login={login} defaultOpen={false} />
          </div>

          {activeCards.length === 0 && soonCards.length === 0 && weekCards.length === 0 && (
            <p className="text-center text-[15px] py-10" style={{ color: MUTED }}>No results found for "{search}".</p>
          )}
        </div>
      </section>
      </div>{/* end discovery blob wrapper */}

      {/* ── Final CTA ─────────────────────────────────────────────── */}
      <div style={{ position: "relative", overflow: "hidden" }}>
        {/* Upper-right arc */}
        <Blob w={360} h={480} top={-120} right={-140} rx="50% 0 0 50% / 42% 0 0 42%" opacity={0.10} rotate={15} />
        {/* Lower-left arc */}
        <Blob w={260} h={380} bottom={-80} left={-100} rx="0 50% 50% 0 / 0 44% 44% 0" opacity={0.09} rotate={-12} />
      <section className="px-5 md:px-10 py-14 md:py-[72px]" style={{ position: "relative", zIndex: 1 }}>
        <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-7 md:p-8" style={{ background: "#fff", border: `1.5px solid rgba(13,148,136,0.2)` }}>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase mb-3" style={{ color: TEAL }}>For Customers</p>
            <h3 className="font-serif text-[22px] font-extrabold leading-snug mb-3" style={{ color: GREEN }}>Attend local events.<br />Earn just for being there.</h3>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: MUTED }}>Check in at participating businesses and free local events. Lock your phone, stay present, and earn 100 pts per 30 min — redeemable for real rewards. No purchases. No scrolling. No catch.</p>
            <button onClick={login} className="w-full border-none text-sm font-bold cursor-pointer px-5 py-3.5 rounded-lg" style={{ background: TEAL, color: "#fff" }}>
              Create customer account →
            </button>
          </div>
          <div className="rounded-2xl p-7 md:p-8" style={{ background: GREEN }}>
            <p className="text-[11px] font-bold tracking-[0.1em] uppercase mb-3" style={{ color: "rgba(204,251,241,0.5)" }}>For Businesses</p>
            <h3 className="font-serif text-[22px] font-extrabold leading-snug mb-3" style={{ color: CREAM }}>Enjoy access to verified email list<br />of your real customers.</h3>
            <p className="text-[13px] leading-relaxed mb-6" style={{ color: "rgba(242,239,231,0.55)" }}>Every check-in silently links a verified contact to your business. Broadcast promotions, product arrivals, and events to an audience that has already walked through your door — no ad spend, no algorithm.</p>
            <button onClick={login} className="w-full border-none text-sm font-bold cursor-pointer px-5 py-3.5 rounded-lg" style={{ background: TEAL, color: "#fff" }}>
              List your business →
            </button>
          </div>
        </div>
      </section>
      </div>{/* end CTA blob wrapper */}

      <MarketingFooter />
    </div>
  );
}
