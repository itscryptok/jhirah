import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AuthPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    // Preserve any ?redirect= param so QR check-in can complete after auth
    const redirectParam = new URLSearchParams(window.location.search).get("redirect");
    if (redirectParam) {
      sessionStorage.setItem("auth_redirect", redirectParam);
    }
    navigate("/sign-in", { replace: true });
  }, [navigate]);

  return null;
}
