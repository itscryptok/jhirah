import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";

const GREEN  = "#1C2B1A";
const CREAM  = "#F2EFE7";
const MUTED  = "#8A8A7A";
const ACCENT = "#2D5A27";
const AMBER  = "#D97706";
const RED    = "#DC2626";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const api = (path: string) => `${BASE}${path}`;

type Tab = "overview" | "users" | "businesses" | "sessions" | "campaigns";

interface Stats {
  users: number; businesses: number; sessions: number;
  completedSessions: number; totalPointsInCirculation: number; redemptions: number;
}
interface AdminUser {
  id: string; email: string; firstName: string | null; lastName: string | null;
  role: string | null; emailVerified: boolean; totpEnabled: boolean; createdAt: string;
}
interface Business {
  id: string; name: string; address: string | null; zipCode: string | null;
  phone: string | null; ownerId: string; createdAt: string;
}
interface Session {
  id: string; userId: string; businessId: string; status: string;
  pointsEarned: number | null; phoneLockMinutes: number | null;
  checkInTime: string; checkOutTime: string | null;
}
interface Campaign {
  id: string; businessId: string; title: string; type: string;
  sentAt: string; deliveryCount: number | null; conversionCount: number | null;
}

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div style={{ background: "#fff", borderRadius: 10, padding: "20px 24px", border: "1px solid rgba(28,43,26,0.08)" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: MUTED, margin: "0 0 8px" }}>{label}</p>
      <p style={{ fontSize: 28, fontWeight: 800, color: GREEN, margin: 0, letterSpacing: "-0.02em" }}>{value}</p>
      {sub && <p style={{ fontSize: 12, color: MUTED, margin: "4px 0 0" }}>{sub}</p>}
    </div>
  );
}

function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "2px 8px", borderRadius: 20, background: `${color}18`, color, border: `1px solid ${color}30` }}>
      {label}
    </span>
  );
}

export default function Addy() {
  const [, navigate] = useLocation();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [tab, setTab] = useState<Tab>("overview");
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState<{ type: "user" | "business"; id: string; label: string } | null>(null);

  // Check auth on mount
  useEffect(() => {
    fetch(api("/api/admin/check"), { credentials: "include" })
      .then(r => r.json())
      .then(d => setAuthed(d.authed))
      .catch(() => setAuthed(false));
  }, []);

  const loadTab = useCallback(async (t: Tab) => {
    setLoading(true);
    try {
      if (t === "overview") {
        const r = await fetch(api("/api/admin/stats"), { credentials: "include" });
        setStats(await r.json());
      } else if (t === "users") {
        const r = await fetch(api("/api/admin/users"), { credentials: "include" });
        const d = await r.json(); setUsers(d.users ?? []);
      } else if (t === "businesses") {
        const r = await fetch(api("/api/admin/businesses"), { credentials: "include" });
        const d = await r.json(); setBusinesses(d.businesses ?? []);
      } else if (t === "sessions") {
        const r = await fetch(api("/api/admin/sessions"), { credentials: "include" });
        const d = await r.json(); setSessions(d.sessions ?? []);
      } else if (t === "campaigns") {
        const r = await fetch(api("/api/admin/campaigns"), { credentials: "include" });
        const d = await r.json(); setCampaigns(d.campaigns ?? []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authed) loadTab("overview");
  }, [authed, loadTab]);

  function switchTab(t: Tab) {
    setTab(t);
    loadTab(t);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoggingIn(true); setLoginErr("");
    try {
      const r = await fetch(api("/api/admin/login"), {
        method: "POST", credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (r.ok) { setAuthed(true); setPassword(""); }
      else { const d = await r.json(); setLoginErr(d.error ?? "Incorrect password"); }
    } catch { setLoginErr("Could not reach server."); }
    finally { setLoggingIn(false); }
  }

  async function handleLogout() {
    await fetch(api("/api/admin/logout"), { method: "POST", credentials: "include" });
    setAuthed(false);
  }

  async function doDelete(type: "user" | "business", id: string) {
    const path = type === "user" ? `/api/admin/users/${id}` : `/api/admin/businesses/${id}`;
    await fetch(api(path), { method: "DELETE", credentials: "include" });
    setConfirmDelete(null);
    loadTab(type === "user" ? "users" : "businesses");
  }

  // Loading check
  if (authed === null) {
    return <div style={{ display: "flex", height: "100vh", alignItems: "center", justifyContent: "center", background: CREAM, color: MUTED, fontFamily: "Inter, sans-serif", fontSize: 14 }}>Checking…</div>;
  }

  // Login screen
  if (!authed) {
    return (
      <div style={{ fontFamily: "Inter, sans-serif", background: CREAM, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <button onClick={() => navigate("/")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 900, color: GREEN, background: "none", border: "none", cursor: "pointer", marginBottom: 40, letterSpacing: "-0.02em" }}>Jhirah</button>
        <div style={{ background: "#fff", borderRadius: 14, padding: "40px 40px", width: "100%", maxWidth: 380, boxShadow: "0 2px 16px rgba(28,43,26,0.08)", border: "1px solid rgba(28,43,26,0.08)" }}>
          <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: ACCENT, margin: "0 0 10px" }}>Admin Access</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 900, color: GREEN, margin: "0 0 28px", letterSpacing: "-0.02em" }}>Dashboard</h1>
          <form onSubmit={handleLogin}>
            <label style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, display: "block", marginBottom: 8 }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              autoFocus
              style={{ width: "100%", padding: "12px 14px", fontSize: 15, borderRadius: 8, border: `1.5px solid ${loginErr ? RED : "rgba(28,43,26,0.2)"}`, outline: "none", background: CREAM, color: GREEN, boxSizing: "border-box", marginBottom: loginErr ? 8 : 20 }}
            />
            {loginErr && <p style={{ fontSize: 12, color: RED, margin: "0 0 16px" }}>{loginErr}</p>}
            <button type="submit" disabled={loggingIn || !password}
              style={{ width: "100%", padding: "13px", background: password ? GREEN : "rgba(28,43,26,0.25)", color: CREAM, border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: password ? "pointer" : "not-allowed", transition: "background 0.2s" }}>
              {loggingIn ? "Checking…" : "Enter →"}
            </button>
          </form>
        </div>
        <p style={{ color: MUTED, fontSize: 12, marginTop: 24 }}>Session lasts 4 hours.</p>
      </div>
    );
  }

  const TABS: { key: Tab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "users", label: "Users" },
    { key: "businesses", label: "Businesses" },
    { key: "sessions", label: "Sessions" },
    { key: "campaigns", label: "Campaigns" },
  ];

  return (
    <div style={{ fontFamily: "Inter, sans-serif", background: CREAM, minHeight: "100vh" }}>
      {/* Confirm delete modal */}
      {confirmDelete && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "#fff", borderRadius: 14, padding: 32, maxWidth: 380, width: "100%", boxShadow: "0 8px 32px rgba(0,0,0,0.15)" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: GREEN, margin: "0 0 8px" }}>Confirm delete</p>
            <p style={{ fontSize: 13, color: MUTED, margin: "0 0 24px", lineHeight: 1.6 }}>
              Permanently delete <strong style={{ color: RED }}>{confirmDelete.label}</strong>? This cannot be undone.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button onClick={() => setConfirmDelete(null)} style={{ flex: 1, padding: "10px", background: "rgba(28,43,26,0.07)", color: GREEN, border: "none", borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
              <button onClick={() => doDelete(confirmDelete.type, confirmDelete.id)} style={{ flex: 1, padding: "10px", background: RED, color: "#fff", border: "none", borderRadius: 8, fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ background: GREEN, padding: "0 32px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <button onClick={() => navigate("/")} style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 900, color: CREAM, background: "none", border: "none", cursor: "pointer", letterSpacing: "-0.02em" }}>Jhirah</button>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(242,239,231,0.4)", padding: "2px 10px", border: "1px solid rgba(242,239,231,0.2)", borderRadius: 20 }}>Admin</span>
        </div>
        <button onClick={handleLogout} style={{ fontSize: 13, color: "rgba(242,239,231,0.6)", background: "none", border: "none", cursor: "pointer", fontWeight: 500 }}>Sign out</button>
      </header>

      {/* Tab bar */}
      <div style={{ background: "#fff", borderBottom: "1px solid rgba(28,43,26,0.1)", padding: "0 32px", display: "flex", gap: 4 }}>
        {TABS.map(t => (
          <button key={t.key} onClick={() => switchTab(t.key)}
            style={{ padding: "14px 18px", fontSize: 13, fontWeight: tab === t.key ? 700 : 500, color: tab === t.key ? GREEN : MUTED, background: "none", border: "none", cursor: "pointer", borderBottom: tab === t.key ? `2px solid ${GREEN}` : "2px solid transparent", transition: "all 0.15s" }}>
            {t.label}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button onClick={() => loadTab(tab)} style={{ fontSize: 12, color: MUTED, background: "none", border: "none", cursor: "pointer", padding: "0 8px" }}>↻ Refresh</button>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 32px 80px" }}>
        {loading && <p style={{ color: MUTED, fontSize: 13 }}>Loading…</p>}

        {/* Overview */}
        {tab === "overview" && stats && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 24px", letterSpacing: "-0.02em" }}>Platform Overview</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(170px, 1fr))", gap: 16, marginBottom: 40 }}>
              <StatCard label="Total Users" value={stats.users} />
              <StatCard label="Businesses" value={stats.businesses} />
              <StatCard label="Total Sessions" value={stats.sessions} sub={`${stats.completedSessions} completed`} />
              <StatCard label="Points in Circulation" value={stats.totalPointsInCirculation.toLocaleString()} sub={`≈ $${(stats.totalPointsInCirculation / 100).toFixed(2)}`} />
              <StatCard label="Redemptions" value={stats.redemptions} />
            </div>
          </>
        )}

        {/* Users */}
        {tab === "users" && !loading && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Users <span style={{ fontSize: 14, fontWeight: 500, color: MUTED }}>({users.length})</span></h2>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid rgba(28,43,26,0.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(28,43,26,0.04)" }}>
                    {["Name", "Email", "Role", "Status", "Joined", ""].map(h => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, i) => (
                    <tr key={u.id} style={{ borderTop: i > 0 ? "1px solid rgba(28,43,26,0.06)" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: GREEN }}>{[u.firstName, u.lastName].filter(Boolean).join(" ") || "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: MUTED }}>{u.email}</td>
                      <td style={{ padding: "12px 16px" }}>
                        {u.role ? <Pill label={u.role.replace("_", " ")} color={u.role === "business_owner" ? AMBER : ACCENT} /> : <span style={{ color: MUTED, fontSize: 12 }}>none</span>}
                      </td>
                      <td style={{ padding: "12px 16px", display: "flex", gap: 4, flexWrap: "wrap" }}>
                        {u.emailVerified && <Pill label="Email ✓" color={ACCENT} />}
                        {u.totpEnabled && <Pill label="2FA ✓" color={ACCENT} />}
                        {!u.emailVerified && <Pill label="Unverified" color={MUTED} />}
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: MUTED }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <button onClick={() => setConfirmDelete({ type: "user", id: u.id, label: u.email })}
                          style={{ fontSize: 12, color: RED, background: "none", border: `1px solid ${RED}40`, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {users.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: 32, textAlign: "center", color: MUTED, fontSize: 13 }}>No users yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Businesses */}
        {tab === "businesses" && !loading && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Businesses <span style={{ fontSize: 14, fontWeight: 500, color: MUTED }}>({businesses.length})</span></h2>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid rgba(28,43,26,0.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(28,43,26,0.04)" }}>
                    {["Name", "Address", "Zip", "Phone", "Created", ""].map(h => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {businesses.map((b, i) => (
                    <tr key={b.id} style={{ borderTop: i > 0 ? "1px solid rgba(28,43,26,0.06)" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: GREEN }}>{b.name}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: MUTED, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{b.address ?? "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: MUTED }}>{b.zipCode ?? "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: MUTED }}>{b.phone ?? "—"}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: MUTED }}>{new Date(b.createdAt).toLocaleDateString()}</td>
                      <td style={{ padding: "12px 16px", textAlign: "right" }}>
                        <button onClick={() => setConfirmDelete({ type: "business", id: b.id, label: b.name })}
                          style={{ fontSize: 12, color: RED, background: "none", border: `1px solid ${RED}40`, padding: "4px 10px", borderRadius: 6, cursor: "pointer", fontWeight: 600 }}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {businesses.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: 32, textAlign: "center", color: MUTED, fontSize: 13 }}>No businesses yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Sessions */}
        {tab === "sessions" && !loading && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Recent Sessions <span style={{ fontSize: 14, fontWeight: 500, color: MUTED }}>(last 100)</span></h2>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid rgba(28,43,26,0.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(28,43,26,0.04)" }}>
                    {["Check-in", "Status", "Lock mins", "Points", "Check-out"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s, i) => (
                    <tr key={s.id} style={{ borderTop: i > 0 ? "1px solid rgba(28,43,26,0.06)" : "none" }}>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: MUTED }}>{new Date(s.checkInTime).toLocaleString()}</td>
                      <td style={{ padding: "12px 16px" }}>
                        <Pill label={s.status}
                          color={s.status === "completed" ? ACCENT : s.status === "active" ? AMBER : RED} />
                      </td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: GREEN, fontWeight: 600 }}>{s.phoneLockMinutes ?? 0}</td>
                      <td style={{ padding: "12px 16px", fontSize: 13, color: GREEN, fontWeight: 700 }}>{s.pointsEarned ?? 0}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12, color: MUTED }}>{s.checkOutTime ? new Date(s.checkOutTime).toLocaleString() : "—"}</td>
                    </tr>
                  ))}
                  {sessions.length === 0 && (
                    <tr><td colSpan={5} style={{ padding: 32, textAlign: "center", color: MUTED, fontSize: 13 }}>No sessions yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* Campaigns */}
        {tab === "campaigns" && !loading && (
          <>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 900, color: GREEN, margin: "0 0 20px", letterSpacing: "-0.02em" }}>Campaigns <span style={{ fontSize: 14, fontWeight: 500, color: MUTED }}>(last 100)</span></h2>
            <div style={{ background: "#fff", borderRadius: 10, border: "1px solid rgba(28,43,26,0.08)", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ background: "rgba(28,43,26,0.04)" }}>
                    {["Title", "Type", "Sent", "Delivered", "Conversions", "Conv %"].map(h => (
                      <th key={h} style={{ padding: "10px 16px", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: MUTED, textAlign: "left" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {campaigns.map((c, i) => {
                    const convPct = c.deliveryCount ? Math.round(((c.conversionCount ?? 0) / c.deliveryCount) * 100) : 0;
                    return (
                      <tr key={c.id} style={{ borderTop: i > 0 ? "1px solid rgba(28,43,26,0.06)" : "none" }}>
                        <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: GREEN, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{c.title}</td>
                        <td style={{ padding: "12px 16px" }}>
                          <Pill label={c.type.replace("_", " ")} color={AMBER} />
                        </td>
                        <td style={{ padding: "12px 16px", fontSize: 12, color: MUTED }}>{new Date(c.sentAt).toLocaleDateString()}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: GREEN }}>{c.deliveryCount ?? 0}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, color: GREEN }}>{c.conversionCount ?? 0}</td>
                        <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: convPct > 30 ? ACCENT : convPct > 10 ? AMBER : MUTED }}>{convPct}%</td>
                      </tr>
                    );
                  })}
                  {campaigns.length === 0 && (
                    <tr><td colSpan={6} style={{ padding: 32, textAlign: "center", color: MUTED, fontSize: 13 }}>No campaigns yet.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
