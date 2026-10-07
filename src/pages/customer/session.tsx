import { useState, useEffect, useCallback } from "react";
import { useLocation } from "wouter";
import { useGetActiveSession, useSendHeartbeat } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Lock, Unlock, Star, CheckCircle2, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const HEARTBEAT_INTERVAL_MS = 30_000;
const POINTS_PER_30_MIN = 100;

export default function SessionPage() {
  const [, navigate] = useLocation();
  const { data: sessionData, isLoading } = useGetActiveSession();
  const heartbeat = useSendHeartbeat();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [isLocked, setIsLocked] = useState(true);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [lockMinutes, setLockMinutes] = useState(0);
  const [minLockMinutes, setMinLockMinutes] = useState(30);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [autoCompleted, setAutoCompleted] = useState(false);

  const session = (sessionData as any)?.session;

  useEffect(() => {
    navigator.geolocation.watchPosition(
      pos => { setLat(pos.coords.latitude); setLng(pos.coords.longitude); },
      () => {},
    );
  }, []);

  useEffect(() => {
    if (session) {
      setCurrentPoints(session.pointsEarned ?? 0);
      setLockMinutes(session.phoneLockMinutes ?? 0);
      setMinLockMinutes(session.minLockMinutes ?? 30);
    }
  }, [session]);

  const sendHeartbeat = useCallback(async () => {
    if (!session?.id || !lat || !lng) return;
    try {
      const result: any = await heartbeat.mutateAsync({
        sessionId: session.id,
        data: { latitude: lat, longitude: lng, isPhoneLocked: isLocked, unlockDurationSeconds: 0 },
      });
      if (result.status === "invalidated") {
        toast({ title: "Session invalidated", description: result.invalidReason, variant: "destructive" });
        await queryClient.invalidateQueries();
        navigate("/wallet");
      } else if (result.status === "completed") {
        setCurrentPoints(result.pointsEarned ?? result.currentPoints ?? 0);
        setLockMinutes(result.phoneLockMinutes ?? 0);
        setAutoCompleted(true);
        await queryClient.invalidateQueries();
        toast({ title: `Session complete! Earned ${result.pointsEarned ?? 0} points`, description: "Points have been added to your Wallet." });
      } else {
        setCurrentPoints(result.currentPoints ?? 0);
        setLockMinutes(result.phoneLockMinutes ?? 0);
        if (result.minLockMinutes) setMinLockMinutes(result.minLockMinutes);
      }
    } catch {}
  }, [session?.id, lat, lng, isLocked]);

  useEffect(() => {
    const interval = setInterval(sendHeartbeat, HEARTBEAT_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [sendHeartbeat]);

  if (isLoading) {
    return <PageLayout><Skeleton className="h-48 w-full" /></PageLayout>;
  }

  if (autoCompleted) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4 max-w-sm">
          <CheckCircle2 className="h-20 w-20 text-green-500" />
          <h2 className="text-2xl font-bold">Session complete!</h2>
          <p className="text-muted-foreground">You've earned <strong>{currentPoints} points</strong> from this session. They're already in your Wallet.</p>
          <button
            onClick={() => navigate("/wallet")}
            className="mt-4 px-8 py-3 rounded-lg font-semibold text-sm"
            style={{ background: "#1C2B1A", color: "#F2EFE7" }}>
            Go to Wallet →
          </button>
        </div>
      </PageLayout>
    );
  }

  if (!session) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <p className="text-muted-foreground">No active session. Enter an event code to check in!</p>
          <button
            onClick={() => navigate("/scan")}
            className="px-6 py-2.5 rounded-lg font-semibold text-sm"
            style={{ background: "#1C2B1A", color: "#F2EFE7" }}>
            Enter event code
          </button>
        </div>
      </PageLayout>
    );
  }

  const progressPct = Math.min((lockMinutes / minLockMinutes) * 100, 100);
  const minutesRemaining = Math.max(minLockMinutes - lockMinutes, 0);
  const pointsAtCompletion = Math.floor(minLockMinutes / 30) * POINTS_PER_30_MIN;

  return (
    <PageLayout>
      <div className="max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Active Session</h1>
          <p className="text-muted-foreground">Keep your phone locked — points are awarded automatically.</p>
        </div>

        <Card className="bg-primary text-primary-foreground">
          <CardContent className="pt-6 text-center space-y-2">
            <p className="text-sm font-medium opacity-80">{session.businessName}</p>
            <div className="flex items-center justify-center gap-2 text-5xl font-bold">
              <Star className="h-8 w-8 fill-current" />
              {currentPoints.toLocaleString()}
            </div>
            <p className="text-sm opacity-80">points earned so far</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle className="text-sm">Phone Lock Status</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsLocked(true)}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${isLocked ? "border-primary bg-primary/10" : "border-muted"}`}
              >
                <Lock className="h-8 w-8" />
                <span className="text-sm font-medium">Locked</span>
              </button>
              <button
                onClick={() => setIsLocked(false)}
                className={`flex flex-col items-center gap-2 rounded-lg border-2 p-4 transition-all ${!isLocked ? "border-destructive bg-destructive/10" : "border-muted"}`}
              >
                <Unlock className="h-8 w-8" />
                <span className="text-sm font-medium">Unlocked</span>
              </button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm flex items-center gap-2">
              <Timer className="h-4 w-4" />
              Time to reward
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{lockMinutes} min locked</span>
                <span>{minLockMinutes} min required</span>
              </div>
              <Progress value={progressPct} className="h-3" />
              <div className="flex justify-between items-center">
                <p className="text-xs text-muted-foreground">
                  {minutesRemaining > 0
                    ? `${minutesRemaining} min remaining until auto-complete`
                    : "Minimum time reached — completing…"}
                </p>
                <span className="text-xs font-semibold text-primary">{Math.round(progressPct)}%</span>
              </div>
            </div>
            <div className="rounded-lg bg-muted/50 p-3 text-center">
              <p className="text-sm font-semibold">You'll earn {pointsAtCompletion} pts</p>
              <p className="text-xs text-muted-foreground mt-0.5">when the session auto-completes</p>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              No check-out needed — your session closes and points land in your Wallet automatically once the required time is up.
            </p>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
