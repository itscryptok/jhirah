import { useGetMyPoints, useRedeemReward } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Gift, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Wallet() {
  const { data: balances, isLoading } = useGetMyPoints();
  const redeem = useRedeemReward();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  async function handleRedeem(tierId: number, name: string) {
    if (!confirm(`Redeem "${name}"?`)) return;
    try {
      await redeem.mutateAsync({ data: { tierId } });
      await queryClient.invalidateQueries();
      toast({ title: `Redeemed: ${name}!` });
    } catch {
      toast({ title: "Redemption failed", variant: "destructive" });
    }
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">My Points Wallet</h1>
          <p className="text-muted-foreground">Earn 100 pts per 30 min of phone-locked time (100 pts = $1.00)</p>
        </div>

        {isLoading ? (
          <div className="space-y-4">{[...Array(2)].map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}</div>
        ) : !(balances as any[])?.length ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Star className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="font-medium">No points yet</p>
              <p className="text-sm">Check in with an event code to start earning!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {(balances as any[]).map((b: any, i: number) => (
              <Card key={i} className="overflow-hidden">
                <CardHeader className="bg-primary pb-4 text-primary-foreground">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{b.businessName}</CardTitle>
                      <p className="text-sm opacity-80">{b.businessAddress}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-3xl font-bold">{b.totalPoints.toLocaleString()}</p>
                      <p className="text-sm opacity-80">points</p>
                    </div>
                  </div>
                  <p className="mt-1 text-xs opacity-70">{b.totalVisits} visits · ${(b.totalPoints / 100).toFixed(2)} value</p>
                </CardHeader>
                {b.availableRewards?.length > 0 && (
                  <CardContent className="pt-4">
                    <p className="mb-3 text-sm font-semibold flex items-center gap-2">
                      <Gift className="h-4 w-4 text-primary" />
                      Available Rewards
                    </p>
                    <div className="space-y-2">
                      {b.availableRewards.map((r: any) => (
                        <div key={r.id} className="flex items-center justify-between rounded-md border p-3">
                          <div>
                            <p className="text-sm font-medium">{r.name}</p>
                            <p className="text-xs text-muted-foreground">{r.pointsRequired.toLocaleString()} pts · ${r.dollarValue} value</p>
                          </div>
                          <Button size="sm" onClick={() => handleRedeem(r.id, r.name)} disabled={redeem.isPending}>
                            Redeem
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
