import { useState } from "react";
import {
  useListRewardTiers, useCreateRewardTier, useUpdateRewardTier, useDeleteRewardTier,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Pencil, Trash2, Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type Tier = { id: number; name: string; description: string | null; pointsRequired: number; dollarValue: number };
type TierForm = { name: string; description: string; pointsRequired: string; dollarValue: string };
const emptyForm: TierForm = { name: "", description: "", pointsRequired: "", dollarValue: "" };

export default function Rewards() {
  const { data: tiers, isLoading } = useListRewardTiers();
  const create = useCreateRewardTier();
  const update = useUpdateRewardTier();
  const del = useDeleteRewardTier();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Tier | null>(null);
  const [form, setForm] = useState<TierForm>(emptyForm);

  function openCreate() { setEditing(null); setForm(emptyForm); setOpen(true); }
  function openEdit(t: Tier) {
    setEditing(t);
    setForm({ name: t.name, description: t.description ?? "", pointsRequired: String(t.pointsRequired), dollarValue: String(t.dollarValue) });
    setOpen(true);
  }

  async function handleSave() {
    if (!form.name || !form.pointsRequired || !form.dollarValue) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    const body = { name: form.name, description: form.description || undefined, pointsRequired: parseInt(form.pointsRequired), dollarValue: parseFloat(form.dollarValue) };
    if (editing) {
      await update.mutateAsync({ tierId: editing.id, data: body });
    } else {
      await create.mutateAsync({ data: body });
    }
    await queryClient.invalidateQueries();
    setOpen(false);
    toast({ title: editing ? "Reward updated" : "Reward created" });
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this reward tier?")) return;
    await del.mutateAsync({ tierId: id });
    await queryClient.invalidateQueries();
    toast({ title: "Reward deleted" });
  }

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Reward Tiers</h1>
            <p className="text-muted-foreground">Configure what customers can redeem with their points.</p>
          </div>
          <Button onClick={openCreate}><Plus className="mr-2 h-4 w-4" />Add Reward</Button>
        </div>

        {isLoading ? (
          <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
        ) : !tiers?.length ? (
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              No reward tiers yet. Add your first one!
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {(tiers as unknown as Tier[]).map(t => (
              <Card key={t.id}>
                <CardContent className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{t.name}</p>
                    <p className="text-sm text-muted-foreground">{t.description}</p>
                    <p className="mt-1 text-xs font-medium text-primary">{t.pointsRequired.toLocaleString()} pts = ${t.dollarValue} value</p>
                  </div>
                  <div className="flex gap-2">
                    <Button size="icon" variant="ghost" onClick={() => openEdit(t)}><Pencil className="h-4 w-4" /></Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(t.id)} className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Reward" : "New Reward Tier"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-1">
                <Label>Name *</Label>
                <Input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Free Coffee" />
              </div>
              <div className="space-y-1">
                <Label>Description</Label>
                <Input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} placeholder="One medium drip coffee" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Points required *</Label>
                  <Input type="number" value={form.pointsRequired} onChange={e => setForm(f => ({ ...f, pointsRequired: e.target.value }))} placeholder="500" />
                </div>
                <div className="space-y-1">
                  <Label>Dollar value *</Label>
                  <Input type="number" step="0.01" value={form.dollarValue} onChange={e => setForm(f => ({ ...f, dollarValue: e.target.value }))} placeholder="5.00" />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={create.isPending || update.isPending}>
                {create.isPending || update.isPending ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </PageLayout>
  );
}
