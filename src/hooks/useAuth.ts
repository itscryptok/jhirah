import { useLocation } from "wouter";
import { useUser, useClerk } from "@clerk/react";
import { useGetMyProfile, getGetMyProfileQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";

export function useAuth() {
  const { isLoaded, isSignedIn } = useUser();
  const { signOut } = useClerk();
  const [, navigate] = useLocation();
  const queryClient = useQueryClient();

  const { data: profile, isLoading: profileLoading } = useGetMyProfile({
    query: {
      queryKey: getGetMyProfileQueryKey(),
      enabled: !!isSignedIn,
      retry: false,
    },
  });

  const isLoading = !isLoaded || (!!isSignedIn && profileLoading);
  const isAuthenticated = !!isSignedIn;
  const user = isAuthenticated ? (profile ?? null) : null;

  function login() {
    navigate("/sign-in");
  }

  async function logout() {
    await signOut({ redirectUrl: "/" });
    queryClient.clear();
  }

  return { isAuthenticated, isLoading, user, login, logout };
}
