import { useState, useEffect } from "react";
import { useGetMyBusiness, useUpsertMyBusiness } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";

const LOCK_OPTIONS = [
  { value: 15, label: "15 min" },
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 hour" },
  { value: 90, label: "1.5 hours" },
  { value: 120, label: "2 hours" },
];

export default function Settings() {
  const { data: biz, isLoading } = useGetMyBusiness();
  const upsert = useUpsertMyBusiness();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [form, setForm] = useState({
    name: "", address: "", latitude: "", longitude: "",
    description: "", logoUrl: "", minLockMinutes: 30,
  });

  useEffect(() => {
    if (biz) {
      setForm({
        name: (biz as any).name ?? "",
        address: (biz as any).address ?? "",
        latitude: String((biz as any).latitude ?? ""),
        longitude: String((biz as any).longitude ?? ""),
        description: (biz as any).description ?? "",
        logoUrl: (biz as any).logoUrl ?? "",
        minLockMinutes: (biz as any).minLockMinutes ?? 30,
      });
    }
  }, [biz]);

  async function handleSave() {
    if (!form.name || !form.address) {
      toast({ title: "Name and address are required", variant: "destructive" });
      return;
    }
    await upsert.mutateAsync({
      data: {
        name: form.name,
        address: form.address,
        latitude: parseFloat(form.latitude) || 0,
        longitude: parseFloat(form.longitude) || 0,
        description: form.description || undefined,
        logoUrl: form.logoUrl || undefined,
        minLockMinutes: form.minLockMinutes,
      } as any,
    });
    await queryClient.invalidateQueries();
    toast({ title: "Settings saved" });
  }

  return (
    <PageLayout>
      <div className="max-w-lg space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Business Settings</h1>
          <p className="text-muted-foreground">Update your business details, location, and event settings.</p>
        </div>

        <Card>
          <CardHeader><CardTitle className="text-base">Business Info</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {isLoading ? (
              <div className="space-y-3">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
            ) : (
              <>
                <div className="space-y-1">
                  <Label>Business name *</Label>
                  <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>
                <div className="space-y-1">
                  <Label>Address *</Label>
                  <Input value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label>Latitude</Label>
                    <Input value={form.latitude} onChange={e => setForm(f => ({ ...f, latitude: e.target.value }))} />
                  </div>
                  <div className="space-y-1">
                    <Label>Longitude</Label>
                    <Input value={form.longitude} onChange={e => setForm(f => ({ ...f, longitude: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label>Description</Label>
                  <Textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={3} />
                </div>
                <div className="space-y-1">
                  <Label>Logo URL</Label>
                  <Input value={form.logoUrl} onChange={e => setForm(f => ({ ...f, logoUrl: e.target.value }))} placeholder="https://..." />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Event Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Minimum lock time for point award</Label>
              <p className="text-xs text-muted-foreground">Customers must keep their phone locked for this duration before their session auto-completes and points are credited to their Wallet.</p>
              <div className="grid grid-cols-3 gap-2">
                {LOCK_OPTIONS.map(opt => (
                  <button
                    key={opt.value}
                    onClick={() => setForm(f => ({ ...f, minLockMinutes: opt.value }))}
                    className={`rounded-lg border px-3 py-2 text-sm font-medium transition-all ${form.minLockMinutes === opt.value ? "border-primary bg-primary text-primary-foreground" : "border-muted bg-transparent hover:bg-muted/50"}`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <Input
                  type="number"
                  min={1}
                  max={480}
                  value={form.minLockMinutes}
                  onChange={e => setForm(f => ({ ...f, minLockMinutes: parseInt(e.target.value) || 30 }))}
                  className="w-24"
                />
                <span className="text-sm text-muted-foreground">minutes (custom)</span>
              </div>
            </div>

            {!isLoading && (
              <Button onClick={handleSave} disabled={upsert.isPending}>
                {upsert.isPending ? "Saving…" : "Save settings"}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
