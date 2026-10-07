import { useLocation } from "wouter";
import { MarketingNav } from "@/components/marketing-nav";
import { CheckCircle2, Clock, Circle, ExternalLink } from "lucide-react";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";
const CARD   = "#FFFFFF";

type Status = "done" | "partial" | "pending";

interface RoadmapItem {
  title: string;
  desc: string;
  status: Status;
}

interface RoadmapGroup {
  area: string;
  items: RoadmapItem[];
}

const ROADMAP: RoadmapGroup[] = [
  {
    area: "Marketing & Discovery",
    items: [
      { status: "done",    title: "Landing page",                   desc: "Hero with customer/business caption pills, featured card, discovery accordion with live/soon/weekly cards, and two-way CTA for customers and businesses." },
      { status: "done",    title: "About page",                     desc: "Platform positioning as a presence-based email marketing tool, company mission, six brand values, What We're Solving per persona, email marketing edge section, and Cryp Tok Solutions attribution." },
      { status: "done",    title: "How It Works page",              desc: "Full customer flow, merchant flow, anti-gaming rules, and The Jhirah Loop — focused on the check-in → phone locked → check-out → points → campaigns loop." },
      { status: "done",    title: "Zip code & name search",         desc: "Homepage discovery feed filters by city, zip code, business name, or sponsor name in real time." },
      { status: "pending", title: "Public /discover page",          desc: "Dedicated full-screen discovery page at /discover with tab-based filtering (active / soon / this week) and paginated results — currently only accessible inline on the landing page." },
      { status: "pending", title: "Map view",                       desc: "Pin-based map of active venues and events using device location — allows customers to browse spatially before scanning in." },
    ],
  },
  {
    area: "Authentication & Onboarding",
    items: [
      { status: "done",    title: "Email magic-link sign-in",       desc: "Passwordless auth: user enters email, receives a one-time link via Resend (support@jhirah.com), clicks to verify — no password ever stored." },
      { status: "done",    title: "Streamlined magic-link flow",    desc: "After clicking the magic link, new users complete a profile step (name + role) before reaching their dashboard. Returning users land directly on their dashboard — no extra steps." },
      { status: "done",    title: "Profile completion flow",        desc: "First-time users fill in first name, last name, and role (Customer or Business Owner) before reaching their dashboard." },
      { status: "done",    title: "Auth-aware public pages",        desc: "All public pages detect session state. Authenticated users are redirected to their role-appropriate dashboard automatically." },
      { status: "done",    title: "Protected route guards",         desc: "All authenticated routes check session validity and role. Unauthorised or wrong-role access redirects cleanly to /auth or the correct dashboard." },
      { status: "pending", title: "Event organiser role",           desc: "A third role (event_organiser) is in the product vision but not yet in the DB schema or onboarding flow. Organisers currently use the business owner path." },
      { status: "pending", title: "Account deletion / GDPR",        desc: "No self-serve account deletion or data export endpoint exists yet." },
    ],
  },
  {
    area: "Business Profile & Event Codes",
    items: [
      { status: "done",    title: "Business profile CRUD",          desc: "Owners create/edit their business name, category, address, GPS coordinates, and zip code via the settings page." },
      { status: "done",    title: "Location-locked event code",     desc: "Random 6-character alphanumeric session code generated per business and stored in the DB. Customers type it at the door — no QR scanning required." },
      { status: "done",    title: "Event code display page",        desc: "Business Event Code page displays the 6-character code in large type with copy and regenerate controls, plus instructions for hosts." },
      { status: "pending", title: "Per-event codes",                desc: "The product requires separate codes per event (distinct from the business's permanent store code). Event creation and its own code generation are not yet implemented." },
    ],
  },
  {
    area: "Presence Sessions & Point Earning",
    items: [
      { status: "done",    title: "GPS-verified check-in",          desc: "Entering the event code triggers check-in. Server validates customer GPS against business coordinates using the Haversine formula — rejected if >200 m from venue." },
      { status: "done",    title: "Session heartbeat loop",         desc: "Client fires a heartbeat every 30 s during a session. Each heartbeat updates phone-lock status and accumulates locked minutes on the server." },
      { status: "done",    title: "Points calculation",             desc: "100 pts per 30 min of confirmed phone-lock time, calculated precisely from locked minutes logged by heartbeats." },
      { status: "done",    title: "GPS drift invalidation",         desc: "If the customer drifts >200 m from the venue during a session, the backend closes the session with zero points." },
      { status: "done",    title: "Unlock threshold enforcement",   desc: "Unlocking for >10 s automatically invalidates the session server-side. The 60-second exit window begins on first unlock." },
      { status: "done",    title: "60-second checkout window",      desc: "After unlocking, customers must tap Check Out within 60 s. Late checkout = session voided. Enforced on the /checkout endpoint." },
      { status: "done",    title: "Points credited on checkout",    desc: "Completed checkout persists earned points to the pointBalances table, keyed by user + business for brand-separated wallet display." },
      { status: "done",    title: "Code-based check-in",           desc: "The check-in page uses a typed 6-character event code — no camera or QR scanning required. Simpler, faster, and works in any lighting." },
      { status: "partial", title: "Native phone lock detection",    desc: "Phone lock/unlock state is tracked via a manual toggle button in the web UI. True OS-level screen-lock detection requires a native mobile app (see Mobile App below)." },
      { status: "pending", title: "Background location tracking",   desc: "GPS proximity heartbeats rely on the browser tab being active. True background location via a service worker or native app is needed to handle phone-in-pocket sessions robustly." },
    ],
  },
  {
    area: "Wallet & Rewards",
    items: [
      { status: "done",    title: "Customer wallet",                desc: "Displays point balances grouped by brand (business). Each balance shows available points, dollar value equivalent, and eligible rewards." },
      { status: "done",    title: "Reward tier configuration",      desc: "Business owners define tiered rewards (e.g. 500 pts = $5 off) with a name, point cost, and dollar value. Tiers are editable and deletable." },
      { status: "done",    title: "Point redemption",               desc: "Customers redeem points against a tier. Server validates balance, deducts points from pointBalances, and writes a redemption record. Full end-to-end." },
      { status: "done",    title: "Redemption history",             desc: "Customers can view all past redemptions with timestamps, point cost, and dollar value." },
      { status: "done",    title: "Visit history",                  desc: "Customers can view all completed presence sessions with venue, date, duration, and points earned." },
      { status: "pending", title: "Points expiry",                  desc: "Points currently never expire. Time-limited points (e.g. expire 12 months after earning) are not yet implemented." },
      { status: "pending", title: "Reward fulfilment confirmation", desc: "After redemption there is no in-store confirmation step — no merchant-facing 'Mark as fulfilled' flow to close the loop." },
    ],
  },
  {
    area: "Campaigns & Notifications",
    items: [
      { status: "done",    title: "Campaign creation",              desc: "Business owners compose and broadcast campaigns (promotion / announcement / product_arrival / custom) from the Messages page." },
      { status: "done",    title: "Targeted delivery",              desc: "Campaigns are delivered only to customers with a verified visit history at that venue — no cold audiences." },
      { status: "done",    title: "In-app notification inbox",      desc: "Customers see received campaigns in their Notifications tab. Each notification shows type, message, and timestamp." },
      { status: "done",    title: "Conversion tracking",            desc: "If a campaign recipient checks in within 24 hours of receiving the message, the campaignRecipients.converted flag is set — surfaced in analytics." },
      { status: "partial", title: "External message delivery",      desc: "Resend is integrated for transactional auth emails (magic-link sign-in). Campaign broadcasts are still in-app notifications only — no email, SMS, or push delivery to campaign recipients yet." },
      { status: "pending", title: "Scheduled / time-delayed sends", desc: "All campaigns broadcast immediately. Scheduling a send for a future time or setting up recurring campaigns is not yet supported." },
      { status: "pending", title: "Campaign performance detail",    desc: "Analytics show weekly conversion counts but there's no per-campaign open/conversion breakdown in the Messages page." },
    ],
  },
  {
    area: "Analytics & Dashboard",
    items: [
      { status: "done",    title: "Business dashboard",             desc: "Overview cards for total visits, points issued, active customers, and campaign conversions — all from real DB aggregations." },
      { status: "done",    title: "Weekly analytics charts",        desc: "Recharts line/bar charts showing visits, points issued, and campaign conversions over the last 8 weeks — computed live from presenceSessions and campaigns tables." },
      { status: "done",    title: "Customer list",                  desc: "Business owners see all customers who have completed at least one session, with points balance and last visit date." },
      { status: "pending", title: "Customer segmentation",          desc: "No filtering/sorting by visit frequency, points balance tier, or campaign engagement — useful for targeting high-value regulars." },
      { status: "pending", title: "Export / reporting",             desc: "No CSV or PDF export of analytics data for owners who want records outside the app." },
    ],
  },
  {
    area: "Event Organiser Flow",
    items: [
      { status: "done",    title: "Event cards on discovery feed",  desc: "Events display on the homepage with sponsor attribution, multi-sponsor 'Points by A, B & C' formatting, and status badges." },
      { status: "partial", title: "Multi-sponsor data model",       desc: "sponsorNames array exists in the frontend data model and displays correctly. The backend DB schema and API for creating/linking real event sponsors are not yet built." },
      { status: "pending", title: "Event creation flow",            desc: "No page or API for an organiser to create an event listing with title, date, time, location, and description. No events DB table exists — sessionCode is currently per-business (permanent), not per-event." },
      { status: "pending", title: "Per-event code & points config", desc: "Each event needs its own unique random code (distinct from the business's store code), plus per-event configuration of the points rate (pts per 30 min) and dollar value so businesses can vary rewards by event." },
      { status: "pending", title: "Sponsor partnership flow",       desc: "No UI or API for a business owner to accept/decline a sponsorship request or configure which point brand applies to an event." },
    ],
  },
  {
    area: "Mobile App",
    items: [
      { status: "done",    title: "Mobile-responsive web",          desc: "All public pages are fully responsive using Tailwind breakpoints. Authenticated pages function on mobile browsers." },
      { status: "pending", title: "iOS / Android native app",       desc: "True phone-lock detection, camera QR scanning, and background GPS tracking all require a native app (React Native / Expo). The web UI uses manual toggles as stand-ins." },
      { status: "pending", title: "Push notifications (native)",    desc: "Native push notifications for campaign delivery, session reminders, and point milestones depend on the native app existing." },
    ],
  },
  {
    area: "Platform & Ops",
    items: [
      { status: "done",    title: "PostgreSQL + Drizzle ORM",       desc: "Full relational schema with auth, businesses, sessions, rewards, points, campaigns, notifications, and redemptions tables." },
      { status: "done",    title: "OpenAPI-first contract",         desc: "API contract defined in openapi.yaml; Zod schemas and React Query hooks are code-generated via Orval." },
      { status: "done",    title: "Session auth middleware",        desc: "Express session with signed cookies (SESSION_SECRET). req.isAuthenticated() used as TS type guard in all protected routes." },
      { status: "done",    title: "Admin / ops dashboard",          desc: "Password-protected panel at /addy with five tabs: Platform Overview (live stats), Users (list + delete), Businesses (list + delete), Sessions (last 100), and Campaigns (last 100 with conversion rates)." },
      { status: "pending", title: "Business verification",          desc: "Any authenticated user can create a business profile. No address verification, moderation queue, or approval step exists." },
      { status: "pending", title: "Rate limiting & abuse guards",   desc: "No rate limiting on session creation, QR lookups, or campaign sends to prevent bulk abuse." },
      { status: "pending", title: "Billing / subscription tiers",  desc: "No payment integration. Free for all businesses during early access. Monetisation path (per-venue SaaS, campaign credits) is TBD." },
    ],
  },
];

function StatusIcon({ status }: { status: Status }) {
  if (status === "done")    return <CheckCircle2 size={16} color="#16A34A" />;
  if (status === "partial") return <Clock size={16} color={AMBER} />;
  return <Circle size={16} color="rgba(28,43,26,0.25)" />;
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, { label: string; bg: string; color: string }> = {
    done:    { label: "Complete",    bg: "rgba(34,197,94,0.1)",   color: "#16A34A" },
    partial: { label: "In progress", bg: "rgba(217,119,6,0.1)",   color: AMBER     },
    pending: { label: "Pending",     bg: "rgba(28,43,26,0.07)",   color: MUTED     },
  };
  const s = map[status];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "3px 8px", borderRadius: 20, background: s.bg, color: s.color, whiteSpace: "nowrap", flexShrink: 0 }}>
      {s.label}
    </span>
  );
}

export default function Roadmap() {
  const [, navigate] = useLocation();

  const allItems = ROADMAP.flatMap(g => g.items);
  const doneCount    = allItems.filter(i => i.status === "done").length;
  const partialCount = allItems.filter(i => i.status === "partial").length;
  const pendingCount = allItems.filter(i => i.status === "pending").length;
  const totalCount   = allItems.length;
  const pct = Math.round((doneCount / totalCount) * 100);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", backgroundColor: CREAM, color: GREEN, minHeight: "100vh" }}>

      <MarketingNav />

      {/* ── Hero ── */}
      <section style={{ maxWidth: 900, margin: "0 auto", padding: "64px 40px 56px" }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, marginBottom: 20 }}>
          Product Roadmap
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px, 5vw, 58px)", fontWeight: 900, lineHeight: 1.08, letterSpacing: "-0.025em", color: GREEN, margin: "0 0 24px" }}>
          What's built.<br />What's next.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: MUTED, maxWidth: 560, marginBottom: 40 }}>
          A live snapshot of Jhirah's build state — every feature area, what's fully working, what's partially wired, and what's still ahead.
        </p>

        {/* Progress bar */}
        <div style={{ maxWidth: 520 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>{pct}% complete</span>
            <span style={{ fontSize: 12, color: MUTED }}>{doneCount} of {totalCount} features shipped</span>
          </div>
          <div style={{ height: 8, borderRadius: 8, background: "rgba(28,43,26,0.1)", overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${pct}%`, background: ACCENT, borderRadius: 8, transition: "width 0.6s ease" }} />
          </div>
          <div style={{ display: "flex", gap: 20, marginTop: 14 }}>
            {[
              { label: `${doneCount} Complete`,    bg: "rgba(34,197,94,0.1)",   color: "#16A34A" },
              { label: `${partialCount} In progress`, bg: "rgba(217,119,6,0.1)", color: AMBER     },
              { label: `${pendingCount} Pending`,   bg: "rgba(28,43,26,0.07)",   color: MUTED     },
            ].map(s => (
              <span key={s.label} style={{ fontSize: 12, fontWeight: 600, padding: "4px 10px", borderRadius: 20, background: s.bg, color: s.color }}>{s.label}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Groups ── */}
      <section style={{ padding: "0 40px 80px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>
          {ROADMAP.map(group => {
            const done    = group.items.filter(i => i.status === "done").length;
            const total   = group.items.length;
            return (
              <div key={group.area}>
                {/* Group header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 16 }}>
                  <h2 style={{ fontSize: 15, fontWeight: 800, color: GREEN, letterSpacing: "0.01em", margin: 0 }}>{group.area}</h2>
                  <div style={{ flex: 1, height: 1, background: "rgba(28,43,26,0.1)" }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: MUTED, whiteSpace: "nowrap" }}>{done}/{total}</span>
                </div>

                {/* Items */}
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {group.items.map((item, i) => (
                    <div key={item.title}
                      style={{
                        display: "flex", gap: 14, alignItems: "flex-start",
                        padding: "14px 16px", borderRadius: 10,
                        background: item.status === "done" ? "rgba(34,197,94,0.04)" : item.status === "partial" ? "rgba(217,119,6,0.04)" : CARD,
                        border: `1px solid ${item.status === "done" ? "rgba(34,197,94,0.12)" : item.status === "partial" ? "rgba(217,119,6,0.12)" : "rgba(28,43,26,0.08)"}`,
                      }}>
                      <div style={{ marginTop: 1, flexShrink: 0 }}>
                        <StatusIcon status={item.status} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                          <span style={{ fontSize: 13, fontWeight: 700, color: GREEN }}>{item.title}</span>
                          <StatusPill status={item.status} />
                        </div>
                        <p style={{ fontSize: 12, color: MUTED, lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: `1px solid rgba(28,43,26,0.1)`, padding: "28px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: GREEN }}>Jhirah</span>
        <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <button onClick={() => navigate("/")}        style={{ background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer" }}>Home</button>
          <button onClick={() => navigate("/about")}   style={{ background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer" }}>About</button>
          <button onClick={() => navigate("/how")} style={{ background: "none", border: "none", color: MUTED, fontSize: 13, cursor: "pointer" }}>How It Works</button>
          <a href="https://cryptok.online" target="_blank" rel="noopener noreferrer" style={{ color: MUTED, fontSize: 13, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
            Cryp Tok Solutions <ExternalLink size={11} />
          </a>
        </div>
        <p style={{ color: "rgba(28,43,26,0.3)", fontSize: 12, margin: 0 }}>© 2026 Jhirah by Cryp Tok Solutions.</p>
      </footer>
    </div>
  );
}
