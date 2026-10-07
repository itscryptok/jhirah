import { useGetMyVisitHistory } from "@workspace/api-client-react";
import { PageLayout } from "@/components/nav";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Clock, Star } from "lucide-react";
import { formatDistanceToNow, format } from "date-fns";

const statusColors: Record<string, string> = {
  completed: "bg-green-100 text-green-700",
  active: "bg-blue-100 text-blue-700",
  invalidated: "bg-red-100 text-red-700",
};

export default function History() {
  const { data: sessions, isLoading } = useGetMyVisitHistory();

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Visit History</h1>
          <p className="text-muted-foreground">All your past check-ins and points earned.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
        ) : !(sessions as any[])?.length ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Clock className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="font-medium">No visits yet</p>
              <p className="text-sm">Check in at a business to start earning!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(sessions as any[]).map((s: any) => (
              <Card key={s.sessionId}>
                <CardContent className="flex items-center justify-between p-4 gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-medium truncate">{s.businessName}</p>
                      <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusColors[s.status] ?? ""}`}>{s.status}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(s.checkInTime), "MMM d, yyyy h:mm a")}
                      {s.checkOutTime && ` → ${format(new Date(s.checkOutTime), "h:mm a")}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{s.phoneLockMinutes} min locked</p>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <Star className="h-3.5 w-3.5" />
                      <span>{s.pointsEarned.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">pts</p>
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
