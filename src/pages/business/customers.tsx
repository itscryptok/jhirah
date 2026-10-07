import { useListMyBusinessCustomers } from "@workspace/api-client-react";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

export default function Customers() {
  const { data: customers, isLoading } = useListMyBusinessCustomers();

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Everyone who has visited your business and earned points.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-16 w-full" />)}</div>
        ) : !(customers as any[])?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No customers yet. Share your event code!
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {(customers as any[]).map((c, i) => (
                  <div key={i} className="flex items-center gap-4 p-4">
                    <Avatar>
                      <AvatarImage src={c.profileImageUrl ?? undefined} />
                      <AvatarFallback>{(c.displayName ?? "U")[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{c.displayName ?? "Anonymous"}</p>
                      <p className="text-xs text-muted-foreground">
                        Last visit: {formatDistanceToNow(new Date(c.lastVisit), { addSuffix: true })} · {c.totalVisits} visits
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-primary">{c.totalPoints.toLocaleString()} pts</p>
                      <p className="text-xs text-muted-foreground">${(c.totalPoints / 100).toFixed(2)} value</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </PageLayout>
  );
}
