/**
 * Static-clone shim for `@clerk/react`.
 *
 * The original Jhirah frontend uses Clerk for authentication, backed by a
 * live Clerk project + backend. This static clone has neither, so auth is
 * permanently signed-out:
 * - `ClerkProvider` renders children directly (accepts and ignores all
 *   props, including `publishableKey` and
 *   `__internal_bypassMissingPublishableKey`).
 * - `useUser()` reports a loaded, signed-out session.
 * - `useClerk()` provides a no-op `signOut`.
 * - `SignIn` / `SignUp` render an explanatory card instead of the Clerk
 *   widget, styled to match the auth pages.
 */
import React from "react";

export function ClerkProvider({
  children,
}: {
  children?: React.ReactNode;
  publishableKey?: string;
  __internal_bypassMissingPublishableKey?: boolean;
  proxyUrl?: string;
  signInUrl?: string;
  signUpUrl?: string;
  routerPush?: (to: string) => void;
  routerReplace?: (to: string) => void;
}) {
  return React.createElement(React.Fragment, null, children);
}

export function useUser() {
  return {
    isLoaded: true,
    isSignedIn: false as boolean,
    user: null,
  };
}

export function useClerk() {
  return {
    signOut: async (_opts?: unknown) => undefined,
  };
}

function AuthUnavailable({ mode }: { mode: "sign in" | "sign up" }) {
  return React.createElement(
    "div",
    {
      style: {
        maxWidth: 400,
        margin: "0 auto",
        padding: "32px 28px",
        borderRadius: 16,
        background: "#fff",
        border: "1px solid rgba(28,43,26,0.1)",
        textAlign: "center",
        fontFamily: "'Inter', sans-serif",
      },
    },
    React.createElement(
      "h2",
      { style: { color: "#1C2B1A", fontSize: 20, margin: "0 0 12px" } },
      `Sign ${mode} unavailable`,
    ),
    React.createElement(
      "p",
      { style: { color: "#8A8A7A", fontSize: 14, lineHeight: 1.6, margin: 0 } },
      "This is the static demo version of Jhirah — accounts and sign-in need the live platform.",
    ),
  );
}

export function SignIn(_props: Record<string, unknown>) {
  return React.createElement(AuthUnavailable, { mode: "sign in" });
}

export function SignUp(_props: Record<string, unknown>) {
  return React.createElement(AuthUnavailable, { mode: "sign up" });
}
