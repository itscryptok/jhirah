import { useGetMyNotifications, useMarkNotificationRead } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, Check } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { cn } from "@/lib/utils";

const typeIcon: Record<string, string> = { promotion: "🎉", announcement: "📢", reward_alert: "🏆" };

export default function Notifications() {
  const { data: notifications, isLoading } = useGetMyNotifications();
  const markRead = useMarkNotificationRead();
  const queryClient = useQueryClient();

  async function handleMarkRead(id: number) {
    await markRead.mutateAsync({ notificationId: id });
    await queryClient.invalidateQueries();
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">Messages from businesses you've visited.</p>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
        ) : !(notifications as any[])?.length ? (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Bell className="mx-auto mb-3 h-10 w-10 opacity-30" />
              <p className="font-medium">No notifications</p>
              <p className="text-sm">When businesses send campaigns, they'll show up here.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(notifications as any[]).map((n: any) => (
              <Card key={n.id} className={cn(!n.isRead && "border-primary/40 bg-primary/5")}>
                <CardContent className="flex items-start gap-4 p-4">
                  <span className="text-2xl">{typeIcon[n.type] ?? "📬"}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold">{n.title}</p>
                      {!n.isRead && (
                        <Button size="icon" variant="ghost" className="h-7 w-7 shrink-0" onClick={() => handleMarkRead(n.id)}>
                          <Check className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{n.businessName} · {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}</p>
                    <p className="mt-1 text-sm">{n.message}</p>
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
