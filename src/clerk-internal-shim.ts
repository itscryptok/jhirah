/**
 * Static-clone shim for `@clerk/react/internal`.
 *
 * The original Jhirah frontend imports `publishableKeyFromHost` from
 * `@clerk/react/internal` to resolve the Clerk publishable key from the
 * current hostname (multi-domain support). That export does not exist in
 * the installed @clerk/react version, and this static clone ships without
 * a Clerk key anyway (no backend, no auth). This shim returns the build-time
 * env var when present, otherwise `undefined` — App.tsx passes
 * `__internal_bypassMissingPublishableKey` in that case so ClerkProvider
 * renders without throwing, and all auth hooks settle into their
 * signed-out states.
 */
export function publishableKeyFromHost(
  _hostname: string,
  fallbackKey?: string,
): string | undefined {
  return fallbackKey || undefined;
}
