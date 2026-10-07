import { useEffect, useRef } from "react";
import { ClerkProvider, useUser } from "@clerk/react";
import { publishableKeyFromHost } from "@clerk/react/internal";
import { Switch, Route, Router as WouterRouter, Redirect, useLocation } from "wouter";
import { QueryClient, QueryClientProvider, useQueryClient } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import About from "@/pages/about";
import Roadmap from "@/pages/roadmap";
import HowItWorks from "@/pages/how-it-works";
import ForCustomers from "@/pages/for-customers";
import ForBusinesses from "@/pages/for-businesses";
import Proposal from "@/pages/proposal";
import Addy from "@/pages/addy";
import Flyer from "@/pages/flyer";
import Terms from "@/pages/terms";
import Privacy from "@/pages/privacy";

// Auth flow pages
import AuthPage from "@/pages/auth/index";
import ProfilePage from "@/pages/auth/profile";
import SignInPage from "@/pages/auth/sign-in";
import SignUpPage from "@/pages/auth/sign-up";
import CheckinPage from "@/pages/checkin";

// Business Pages
import Dashboard from "@/pages/business/dashboard";
import EventCodePage from "@/pages/business/qr-code";
import Rewards from "@/pages/business/rewards";
import Customers from "@/pages/business/customers";
import Messages from "@/pages/business/messages";
import Analytics from "@/pages/business/analytics";
import Settings from "@/pages/business/settings";

// Customer Pages
import Wallet from "@/pages/customer/wallet";
import Scan from "@/pages/customer/scan";
import SessionPage from "@/pages/customer/session";
import History from "@/pages/customer/history";
import Notifications from "@/pages/customer/notifications";
import Redemptions from "@/pages/customer/redemptions";

const queryClient = new QueryClient();

// REQUIRED — resolves the key from window.location.hostname so the same
// build serves multiple Clerk custom domains. Do not inline the env var.
const clerkPubKey = publishableKeyFromHost(
  window.location.hostname,
  import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
);

// Empty in dev (Clerk hits FAPI directly), auto-set in prod. Do NOT gate on NODE_ENV.
const clerkProxyUrl = import.meta.env.VITE_CLERK_PROXY_URL;
const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

// Clerk passes full paths to routerPush/routerReplace, but wouter's
// setLocation prepends the base — strip it to avoid doubling.
function stripBase(path: string): string {
  return basePath && path.startsWith(basePath)
    ? path.slice(basePath.length) || "/"
    : path;
}

// Static clone: no Clerk key by design (shim renders signed-out). Never throw here.
if (!clerkPubKey) {
  console.warn("Jhirah static clone: no Clerk publishable key — auth disabled.");
}

/** Clears the React Query cache whenever sign-in state changes */
function ClerkQueryClientCacheInvalidator() {
  const { isSignedIn } = useUser();
  const queryClient = useQueryClient();
  const prevRef = useRef<boolean | undefined>(undefined);

  useEffect(() => {
    if (prevRef.current !== undefined && prevRef.current !== isSignedIn) {
      queryClient.clear();
    }
    prevRef.current = isSignedIn;
  }, [isSignedIn, queryClient]);

  return null;
}

function ProtectedRoute({ component: Component, allowedRole }: { component: React.ComponentType; allowedRole?: "business_owner" | "customer" }) {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div style={{ display: "flex", height: "100vh", width: "100%", alignItems: "center", justifyContent: "center", background: "#F2EFE7", color: "#8A8A7A", fontFamily: "Inter, sans-serif", fontSize: 14 }}>
        Loading…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Redirect to="/sign-in" />;
  }

  if (allowedRole && user?.role !== allowedRole) {
    return <Redirect to={user?.role === "business_owner" ? "/dashboard" : "/wallet"} />;
  }

  return <Component />;
}

function Router() {
  return (
    <Switch>
      {/* Public marketing routes */}
      <Route path="/" component={Landing} />
      <Route path="/about" component={About} />
      <Route path="/roadmap" component={Roadmap} />
      <Route path="/how" component={HowItWorks} />
      <Route path="/for-customers" component={ForCustomers} />
      <Route path="/for-businesses" component={ForBusinesses} />
      <Route path="/proposal" component={Proposal} />
      <Route path="/addy" component={Addy} />
      <Route path="/flyer" component={Flyer} />
      <Route path="/subscribe">{() => <Redirect to="/messages" />}</Route>
      <Route path="/terms" component={Terms} />
      <Route path="/privacy" component={Privacy} />

      {/* Clerk auth UI — /*? matches bare URL + OAuth sub-paths (/sso-callback etc.) */}
      <Route path="/sign-in/*?" component={SignInPage} />
      <Route path="/sign-up/*?" component={SignUpPage} />

      {/* Legacy auth redirect */}
      <Route path="/auth" component={AuthPage} />
      <Route path="/auth/profile" component={ProfilePage} />
      <Route path="/onboarding" component={ProfilePage} />

      {/* Event QR check-in (public — handles auth redirect internally) */}
      <Route path="/checkin/:token" component={CheckinPage} />

      {/* Business Owner Routes */}
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} allowedRole="business_owner" />}
      </Route>
      <Route path="/event-code">
        {() => <ProtectedRoute component={EventCodePage} allowedRole="business_owner" />}
      </Route>
      <Route path="/rewards">
        {() => <ProtectedRoute component={Rewards} allowedRole="business_owner" />}
      </Route>
      <Route path="/customers">
        {() => <ProtectedRoute component={Customers} allowedRole="business_owner" />}
      </Route>
      <Route path="/messages">
        {() => <ProtectedRoute component={Messages} allowedRole="business_owner" />}
      </Route>
      <Route path="/analytics">
        {() => <ProtectedRoute component={Analytics} allowedRole="business_owner" />}
      </Route>
      <Route path="/settings">
        {() => <ProtectedRoute component={Settings} allowedRole="business_owner" />}
      </Route>

      {/* Customer Routes */}
      <Route path="/wallet">
        {() => <ProtectedRoute component={Wallet} allowedRole="customer" />}
      </Route>
      <Route path="/scan">
        {() => <ProtectedRoute component={Scan} allowedRole="customer" />}
      </Route>
      <Route path="/session">
        {() => <ProtectedRoute component={SessionPage} allowedRole="customer" />}
      </Route>
      <Route path="/history">
        {() => <ProtectedRoute component={History} allowedRole="customer" />}
      </Route>
      <Route path="/notifications">
        {() => <ProtectedRoute component={Notifications} allowedRole="customer" />}
      </Route>
      <Route path="/redemptions">
        {() => <ProtectedRoute component={Redemptions} allowedRole="customer" />}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function ClerkProviderWithRoutes() {
  const [, setLocation] = useLocation();

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      __internal_bypassMissingPublishableKey={!clerkPubKey}
      proxyUrl={clerkProxyUrl}
      signInUrl={`${basePath}/sign-in`}
      signUpUrl={`${basePath}/sign-up`}
      routerPush={(to: string) => setLocation(stripBase(to))}
      routerReplace={(to: string) => setLocation(stripBase(to), { replace: true })}
    >
      <QueryClientProvider client={queryClient}>
        <ClerkQueryClientCacheInvalidator />
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

function App() {
  return (
    <HelmetProvider>
      <WouterRouter base={basePath}>
        <ClerkProviderWithRoutes />
      </WouterRouter>
    </HelmetProvider>
  );
}

export default App;
