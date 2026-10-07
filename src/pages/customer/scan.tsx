import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useGetBusinessBySessionCode, useCheckIn, useGetActiveSession, getGetBusinessBySessionCodeQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { MapPin, KeyRound, CheckCircle, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Scan() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [code, setCode] = useState("");
  const [confirmedCode, setConfirmedCode] = useState("");
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [gpsError, setGpsError] = useState<string | null>(null);

  const { data: activeSession } = useGetActiveSession();
  const { data: biz, isLoading: bizLoading } = useGetBusinessBySessionCode(
    confirmedCode,
    { query: { enabled: !!confirmedCode, queryKey: getGetBusinessBySessionCodeQueryKey(confirmedCode) } }
  );
  const checkIn = useCheckIn();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      pos => { setLat(pos.coords.latitude); setLng(pos.coords.longitude); },
      () => setGpsError("GPS unavailable. Please enable location permissions."),
    );
  }, []);

  if ((activeSession as any)?.session) {
    return (
      <PageLayout>
        <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
          <CheckCircle className="h-16 w-16 text-green-500" />
          <h2 className="text-xl font-bold">You're already checked in!</h2>
          <p className="text-muted-foreground">Go to your active session to track your lock time.</p>
          <Button onClick={() => navigate("/session")}>View Session</Button>
        </div>
      </PageLayout>
    );
  }

  function handleLookup() {
    const cleaned = code.trim().toUpperCase();
    if (!cleaned) { toast({ title: "Enter an event code first", variant: "destructive" }); return; }
    setConfirmedCode(cleaned);
  }

  async function handleCheckIn() {
    if (!lat || !lng) { toast({ title: "GPS location required", variant: "destructive" }); return; }
    if (!confirmedCode) { toast({ title: "Look up an event code first", variant: "destructive" }); return; }
    try {
      await checkIn.mutateAsync({ data: { sessionCode: confirmedCode, latitude: lat, longitude: lng } as any });
      await queryClient.invalidateQueries();
      navigate("/session");
    } catch (e: any) {
      toast({ title: "Check-in failed", description: e?.response?.data?.error ?? "Unknown error", variant: "destructive" });
    }
  }

  return (
    <PageLayout>
      <div className="max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Check In</h1>
          <p className="text-muted-foreground">Enter the event code shared by the business to check in and start earning points.</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Enter Event Code</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1">
              <Label>Event Code</Label>
              <div className="flex gap-2">
                <Input
                  value={code}
                  onChange={e => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. AB3K7X"
                  className="font-mono text-lg tracking-widest uppercase"
                  maxLength={6}
                  onKeyDown={e => e.key === "Enter" && handleLookup()}
                />
                <Button variant="outline" onClick={handleLookup}>
                  <KeyRound className="h-4 w-4 mr-1" /> Look up
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Ask the business host for the 6-character code at the event.</p>
            </div>
          </CardContent>
        </Card>

        {confirmedCode && (
          <Card>
            <CardContent className="pt-4">
              {bizLoading ? (
                <Skeleton className="h-20 w-full" />
              ) : !(biz as any)?.id ? (
                <p className="text-sm text-destructive">Code not found. Double-check and try again.</p>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-semibold">{(biz as any).name}</p>
                      <p className="text-sm text-muted-foreground">{(biz as any).address}</p>
                      {(biz as any).description && <p className="mt-1 text-sm">{(biz as any).description}</p>}
                    </div>
                  </div>
                  {gpsError ? (
                    <p className="text-sm text-destructive">{gpsError}</p>
                  ) : !lat ? (
                    <p className="text-sm text-muted-foreground">Getting your location…</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">📍 Location acquired</p>
                  )}
                  <Button className="w-full" onClick={handleCheckIn} disabled={checkIn.isPending || !lat}>
                    <Clock className="mr-2 h-4 w-4" />
                    {checkIn.isPending ? "Checking in…" : "Check in & start earning"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
