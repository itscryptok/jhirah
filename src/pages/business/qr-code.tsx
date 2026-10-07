import { useState } from "react";
import { useGetMyBusinessEventCode, useRegenerateMyBusinessEventCode } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw, Copy, Check, KeyRound, Timer, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EventCodePage() {
  const { data: qr, isLoading } = useGetMyBusinessEventCode();
  const regenerate = useRegenerateMyBusinessEventCode();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const sessionCode = (qr as any)?.sessionCode ?? "";
  const minLockMinutes = (qr as any)?.minLockMinutes ?? 30;

  async function handleRegenerate() {
    await regenerate.mutateAsync();
    await queryClient.invalidateQueries();
    toast({ title: "Event code regenerated" });
  }

  function handleCopy() {
    if (!sessionCode) return;
    navigator.clipboard.writeText(sessionCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <PageLayout>
      <div className="max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Event Code</h1>
          <p className="text-muted-foreground">Share this code with participants at your event. They enter it in the app to check in and start earning points.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{(qr as any)?.businessName ?? "Your Business"}</CardTitle>
            <CardDescription>{(qr as any)?.businessAddress}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-6">
            {isLoading ? (
              <Skeleton className="h-32 w-48 rounded-xl" />
            ) : sessionCode ? (
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center rounded-2xl border-2 border-primary/20 bg-primary/5 px-10 py-8">
                  <span className="font-mono text-5xl font-black tracking-[0.18em] text-primary select-all">
                    {sessionCode}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">Share this 6-character code verbally or on screen</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No event code available. Set up your business first.</p>
            )}

            <div className="flex gap-2 w-full">
              <Button variant="outline" className="flex-1" onClick={handleCopy} disabled={!sessionCode}>
                {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
                {copied ? "Copied!" : "Copy code"}
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleRegenerate} disabled={regenerate.isPending || !sessionCode}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 space-y-3">
            <div className="flex items-start gap-3">
              <Timer className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">Minimum lock time: {minLockMinutes} min</p>
                <p className="text-xs text-muted-foreground">Customers must keep their phone locked for at least {minLockMinutes} minutes before their session auto-completes and points are awarded.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <KeyRound className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">How customers use this code</p>
                <p className="text-xs text-muted-foreground">They open the Jhirah app → tap "Check In" → enter this code → lock their phone. Done.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Info className="mt-0.5 h-4 w-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-sm font-medium">Regenerating the code</p>
                <p className="text-xs text-muted-foreground">⚠️ Regenerating creates a new code immediately. Anyone who hasn't checked in yet will need the new code. Existing active sessions are not affected.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
