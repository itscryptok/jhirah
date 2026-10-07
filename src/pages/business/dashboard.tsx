import { useGetMyBusinessStats } from "@workspace/api-client-react";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Users, Star, Award, Send, Activity, TrendingUp } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export default function Dashboard() {
  const { data: stats, isLoading } = useGetMyBusinessStats();

  const cards = [
    { label: "Total Visits", value: stats?.totalVisits ?? 0, icon: TrendingUp },
    { label: "Unique Customers", value: stats?.totalCustomers ?? 0, icon: Users },
    { label: "Points Issued", value: stats?.totalPointsIssued ?? 0, icon: Star },
    { label: "Campaigns Sent", value: stats?.campaignsSent ?? 0, icon: Send },
    { label: "Rewards Redeemed", value: stats?.totalRedemptions ?? 0, icon: Award },
    { label: "Active Sessions", value: stats?.activeSessionsCount ?? 0, icon: Activity },
  ];

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Overview of your business performance</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map(({ label, value, icon: Icon }) => (
            <Card key={label}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <Skeleton className="h-8 w-20" />
                ) : (
                  <p className="text-3xl font-bold">{value.toLocaleString()}</p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Recent Visits</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}</div>
            ) : !stats?.recentVisits?.length ? (
              <p className="text-sm text-muted-foreground">No visits yet. Share your event code to get started!</p>
            ) : (
              <div className="space-y-2">
                {stats.recentVisits.map((v: any) => (
                  <div key={v.sessionId} className="flex items-center justify-between rounded-md border p-3">
                    <div>
                      <p className="text-sm font-medium">Visit at {v.businessName}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(v.checkInTime), { addSuffix: true })} · {v.phoneLockMinutes} min locked
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-primary">+{v.pointsEarned} pts</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
