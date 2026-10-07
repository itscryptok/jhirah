import { useListMyRedemptions } from "@workspace/api-client-react";
import { PageLayout } from "@/components/nav";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tag } from "lucide-react";
import { format } from "date-fns";

export default function Redemptions() {
  const { data: redemptions, isLoading } = useListMyRedemptions();

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Redeemed Rewards</h1>
          <p className="text-muted-foreground">All rewards you've redeemed with your points.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
        ) : !(redemptions as any[])?.length ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Tag className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="font-medium">No redemptions yet</p>
              <p className="text-sm">Earn enough points, then visit your Wallet to redeem!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(redemptions as any[]).map((r: any) => (
              <Card key={r.id}>
                <CardContent className="flex items-center justify-between p-4 gap-4">
                  <div>
                    <p className="font-semibold">{r.tierName}</p>
                    <p className="text-xs text-muted-foreground">{r.businessName}</p>
                    <p className="text-xs text-muted-foreground">{format(new Date(r.redeemedAt), "MMM d, yyyy h:mm a")}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-primary">−{r.pointsSpent.toLocaleString()} pts</p>
                    <p className="text-sm text-muted-foreground">${r.dollarValue} value</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
}
