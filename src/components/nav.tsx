import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { useGetMyProfile } from "@workspace/api-client-react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard, QrCode, Gift, Users, Megaphone, BarChart2, Settings,
  Wallet, ScanLine, Clock, Bell, Tag, LogOut,
} from "lucide-react";

const businessNav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/event-code", label: "Event Code", icon: QrCode },
  { href: "/rewards", label: "Rewards", icon: Gift },
  { href: "/customers", label: "Customers", icon: Users },
  { href: "/messages", label: "Campaigns", icon: Megaphone },
  { href: "/analytics", label: "Analytics", icon: BarChart2 },
  { href: "/settings", label: "Settings", icon: Settings },
];

const customerNav = [
  { href: "/wallet", label: "Wallet", icon: Wallet },
  { href: "/scan", label: "Scan", icon: ScanLine },
  { href: "/history", label: "History", icon: Clock },
  { href: "/notifications", label: "Alerts", icon: Bell },
  { href: "/redemptions", label: "Redeemed", icon: Tag },
];

export function Nav() {
  const [location, navigate] = useLocation();
  const { logout } = useAuth();
  const { data: profile } = useGetMyProfile();

  const role = profile?.role;
  const nav = role === "business_owner" ? businessNav : role === "customer" ? customerNav : [];

  return (
    <aside className="fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r" style={{ background: "#0D0D0D", borderColor: "rgba(255,255,255,0.06)" }}>
      <div className="flex h-14 items-center gap-2 border-b px-4" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <img src="/logo.webp" alt="Jhirah" style={{ width: 28, height: 28, borderRadius: 5, objectFit: "cover", flexShrink: 0 }} />
        <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 900, color: "#F0EDE8", letterSpacing: "-0.02em" }}>
          Jhirah
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        {nav.map(({ href, label, icon: Icon }) => (
          <button
            key={href}
            onClick={() => navigate(href)}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              location === href
                ? "text-white"
                : "text-[#6B6560] hover:text-[#F0EDE8] hover:bg-white/5",
            )}
            style={location === href ? { background: "rgba(217,119,6,0.15)", color: "#D97706" } : {}}
          >
            <Icon className="h-4 w-4 shrink-0" />
            {label}
          </button>
        ))}
      </nav>
      <div className="border-t p-3" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors"
          style={{ color: "#4A4540" }}
          onMouseEnter={e => { e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.background = "rgba(239,68,68,0.08)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#4A4540"; e.currentTarget.style.background = "transparent"; }}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          Log out
        </button>
      </div>
    </aside>
  );
}

export function PageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen" style={{ background: "#0A0A0A" }}>
      <Nav />
      <main className="ml-56 flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
