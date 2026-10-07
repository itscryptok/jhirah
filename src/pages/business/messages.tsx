import { useState, useEffect } from "react";
import { useListCampaigns, useCreateCampaign, useGetAudienceStats, useGetMySubscription, useCreateCampaignCheckout } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { PageLayout } from "@/components/nav";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Send, Users, Mail, UserX, CheckCircle2, ChevronRight, AlertTriangle, CreditCard, Zap, ShoppingBag, Megaphone, PackagePlus, Sparkles } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "@/hooks/use-toast";
import { RichTextEditor } from "@/components/rich-text-editor";

const DRAFT_KEY = "jhirah_campaign_draft";

const TYPE_META: Record<string, { label: string; description: string; color: string; icon: React.ElementType }> = {
  promotion:      { label: "Promotion",     description: "Deals, discounts & limited-time offers",  color: "bg-blue-100 text-blue-700",   icon: ShoppingBag   },
  product_arrival:{ label: "New Arrival",   description: "Announce new products or services",        color: "bg-emerald-100 text-emerald-700", icon: PackagePlus },
  announcement:   { label: "Announcement",  description: "Store news, hours, events & updates",      color: "bg-purple-100 text-purple-700", icon: Megaphone   },
  custom:         { label: "Custom",        description: "Write your own message from scratch",       color: "bg-gray-100 text-gray-700",   icon: Sparkles    },
};

interface SendResult {
  totalAudience: number;
  subscribedCount: number;
  emailsSent: number;
  optedOutCount: number;
}

type FormState = {
  title: string;
  message: string;
  htmlContent: string;
  type: "promotion" | "announcement" | "product_arrival" | "custom";
};

function emptyForm(): FormState {
  return { title: "", message: "", htmlContent: "", type: "promotion" };
}

const PLACEHOLDERS: Record<string, string> = {
  promotion: "e.g. Flash Sale this Friday — 20% off everything in store!",
  product_arrival: "e.g. Just landed: our new autumn collection is here.",
  announcement: "e.g. We're extending our weekend hours starting this Saturday.",
  custom: "Write your message to your subscribers…",
};

const BODY_PLACEHOLDERS: Record<string, string> = {
  promotion: "Tell your subscribers about your offer, how long it lasts, and what they need to do to claim it…",
  product_arrival: "Describe the new product or service — what it is, who it's for, and why they should come see it…",
  announcement: "Share the news clearly. Include any dates, locations, or actions your audience should take…",
  custom: "Write your message here. Use the toolbar for bold text, links, lists, and more…",
};

export default function Messages() {
  const { data: campaigns, isLoading } = useListCampaigns();
  const { data: audience } = useGetAudienceStats();
  const { data: subscription, isLoading: subLoading } = useGetMySubscription();
  const create = useCreateCampaign();
  const checkout = useCreateCampaignCheckout();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const [composerOpen, setComposerOpen] = useState(false);
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [sendResult, setSendResult] = useState<SendResult | null>(null);
  const [processingPayment, setProcessingPayment] = useState(false);

  const [form, setForm] = useState<FormState>(emptyForm());

  // Handle return from Stripe Checkout
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stripeSession = params.get("stripe_session");
    if (!stripeSession) return;

    window.history.replaceState({}, "", window.location.pathname);

    const rawDraft = sessionStorage.getItem(DRAFT_KEY);
    sessionStorage.removeItem(DRAFT_KEY);

    if (!rawDraft) {
      toast({ title: "Campaign draft not found", description: "Your draft was lost during payment. Please compose and send again.", variant: "destructive" });
      return;
    }

    let draft: FormState;
    try {
      draft = JSON.parse(rawDraft);
    } catch {
      toast({ title: "Failed to restore campaign draft", variant: "destructive" });
      return;
    }

    setProcessingPayment(true);

    create.mutateAsync({
      data: {
        title: draft.title,
        message: draft.message,
        htmlContent: draft.htmlContent,
        type: draft.type,
        stripeSessionId: stripeSession,
      },
    }).then((result) => {
      queryClient.invalidateQueries();
      setSendResult({
        totalAudience: (result as any).totalAudience ?? 0,
        subscribedCount: (result as any).subscribedCount ?? 0,
        emailsSent: (result as any).emailsSent ?? 0,
        optedOutCount: (result as any).optedOutCount ?? 0,
      });
      setConfirmOpen(true);
    }).catch((err: any) => {
      const msg = err?.response?.data?.message ?? "Payment verified but send failed. Contact support.";
      toast({ title: "Failed to send campaign", description: msg, variant: "destructive" });
    }).finally(() => {
      setProcessingPayment(false);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleNewEmail() {
    if (subLoading) return;
    setForm(emptyForm());
    setComposerOpen(true);
  }

  async function handleSend() {
    if (!form.title.trim()) {
      toast({ title: "Subject line is required", variant: "destructive" });
      return;
    }
    if (!form.htmlContent || form.htmlContent === "<p></p>") {
      toast({ title: "Email body is required", variant: "destructive" });
      return;
    }

    const freeSendsRemaining = subscription?.freeSendsRemaining ?? 1;
    if (freeSendsRemaining > 0) {
      await sendCampaign();
    } else {
      setComposerOpen(false);
      setPaymentOpen(true);
    }
  }

  async function sendCampaign(stripeSessionId?: string) {
    const plainText = form.htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    try {
      const result = await create.mutateAsync({
        data: {
          title: form.title,
          message: plainText || form.title,
          htmlContent: form.htmlContent,
          type: form.type,
          ...(stripeSessionId ? { stripeSessionId } : {}),
        },
      });
      await queryClient.invalidateQueries();
      setComposerOpen(false);
      setPaymentOpen(false);
      setSendResult({
        totalAudience: (result as any).totalAudience ?? 0,
        subscribedCount: (result as any).subscribedCount ?? 0,
        emailsSent: (result as any).emailsSent ?? 0,
        optedOutCount: (result as any).optedOutCount ?? 0,
      });
      setConfirmOpen(true);
      setForm(emptyForm());
    } catch {
      toast({ title: "Failed to send campaign", variant: "destructive" });
    }
  }

  async function handlePayAndSend() {
    const plainText = form.htmlContent.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
    const draft: FormState = { ...form, message: plainText || form.title };
    sessionStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
    try {
      const result = await checkout.mutateAsync();
      if (result.checkoutUrl) window.location.href = result.checkoutUrl;
    } catch {
      sessionStorage.removeItem(DRAFT_KEY);
      toast({ title: "Could not start payment", description: "Stripe is not available right now. Try again in a moment.", variant: "destructive" });
    }
  }

  const freeSendsRemaining = subscription?.freeSendsRemaining ?? 1;
  const hasUsedFree = freeSendsRemaining <= 0;
  const TypeIcon = TYPE_META[form.type]?.icon ?? ShoppingBag;

  return (
    <PageLayout>
      {processingPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-xl p-8 shadow-xl text-center space-y-3">
            <div className="animate-spin h-8 w-8 border-4 border-emerald-600 border-t-transparent rounded-full mx-auto" />
            <p className="font-semibold">Verifying payment & sending campaign…</p>
          </div>
        </div>
      )}

      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">Promotions & Email Marketing</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Send product and service promotions directly to the organic subscribers who signed up at your events — no ads, no cold lists.
            </p>
          </div>
          <Button onClick={handleNewEmail} disabled={subLoading} className="shrink-0">
            <Plus className="mr-2 h-4 w-4" /> New Campaign
          </Button>
        </div>

        {/* Free send status banner */}
        {!subLoading && (
          <Card className={hasUsedFree ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"}>
            <CardContent className="p-4 flex items-center gap-3">
              {hasUsedFree ? (
                <>
                  <CreditCard className="h-5 w-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-amber-900 text-sm">Free send used for this month</p>
                    <p className="text-xs text-amber-700 mt-0.5">Additional campaigns are <strong>$1 per send</strong>. Your free send resets on the 1st of next month.</p>
                  </div>
                </>
              ) : (
                <>
                  <Zap className="h-5 w-5 text-emerald-600 shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-900 text-sm">1 free campaign send available this month</p>
                    <p className="text-xs text-emerald-700 mt-0.5">After your free send, additional campaigns are $1 each. Resets on the 1st.</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        )}

        {/* Audience summary */}
        {audience ? (
          <div className="grid grid-cols-3 gap-3">
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Users className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-2xl font-bold">{audience.totalAudience}</p>
                  <p className="text-xs text-muted-foreground">Event subscribers</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <Mail className="h-5 w-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="text-2xl font-bold">{audience.subscribedCount}</p>
                  <p className="text-xs text-muted-foreground">Active recipients</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <UserX className="h-5 w-5 text-muted-foreground shrink-0" />
                <div>
                  <p className="text-2xl font-bold">{audience.optedOutCount}</p>
                  <p className="text-xs text-muted-foreground">Opted out</p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card className="border-dashed">
            <CardContent className="p-5 text-center text-muted-foreground text-sm">
              <Users className="h-8 w-8 mx-auto mb-2 text-muted-foreground/40" />
              Your subscriber count will appear here once customers start checking in to your events.
            </CardContent>
          </Card>
        )}

        {/* Campaign history */}
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">Sent campaigns</h2>
          {isLoading ? (
            <div className="space-y-3">{[...Array(3)].map((_, i) => <Skeleton key={i} className="h-20 w-full" />)}</div>
          ) : !(campaigns as any[])?.length ? (
            <Card className="border-dashed">
              <CardContent className="py-12 text-center">
                <ShoppingBag className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
                <p className="font-medium text-muted-foreground">No campaigns sent yet</p>
                <p className="text-sm text-muted-foreground mt-1">Hit <strong>New Campaign</strong> to promote your products and services to your event subscribers.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-2">
              {(campaigns as any[]).map((c: any) => {
                const meta = TYPE_META[c.type];
                const Icon = meta?.icon ?? ShoppingBag;
                return (
                  <Card key={c.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-3 min-w-0">
                          <div className={`mt-0.5 rounded-lg p-2 shrink-0 ${meta?.color ?? "bg-gray-100 text-gray-700"}`}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold truncate">{c.title}</p>
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium shrink-0 ${meta?.color ?? "bg-gray-100 text-gray-700"}`}>
                                {meta?.label ?? c.type}
                              </span>
                              {c.stripeSessionId && (
                                <span className="rounded-full px-2 py-0.5 text-xs font-medium bg-purple-100 text-purple-700 shrink-0 flex items-center gap-1">
                                  <CreditCard className="h-3 w-3" /> Paid send
                                </span>
                              )}
                            </div>
                            <p className="mt-1 text-sm text-muted-foreground line-clamp-1">{c.message}</p>
                          </div>
                        </div>
                        <div className="shrink-0 text-right space-y-1">
                          <p className="text-xs text-muted-foreground">{formatDistanceToNow(new Date(c.sentAt), { addSuffix: true })}</p>
                          <div className="flex items-center gap-3 justify-end text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Users className="h-3 w-3" />{c.totalAudience ?? c.deliveryCount}</span>
                            <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{c.emailsSent ?? 0} delivered</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Composer dialog ── */}
      <Dialog open={composerOpen} onOpenChange={setComposerOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TypeIcon className="h-5 w-5 text-muted-foreground" />
              New Promotion
            </DialogTitle>
            <div className="flex items-center justify-between pt-1">
              {audience ? (
                <p className="text-sm text-muted-foreground">
                  Reaches <strong>{audience.subscribedCount}</strong> organic event subscriber{audience.subscribedCount !== 1 ? "s" : ""}{audience.totalAudience > audience.subscribedCount ? ` (${audience.totalAudience - audience.subscribedCount} opted out)` : ""}.
                </p>
              ) : (
                <p className="text-sm text-muted-foreground">Loading subscriber count…</p>
              )}
              {!hasUsedFree ? (
                <span className="text-xs text-emerald-700 shrink-0 ml-4 flex items-center gap-1">
                  <Zap className="h-3 w-3" /> Free send
                </span>
              ) : (
                <span className="text-xs text-amber-700 shrink-0 ml-4 flex items-center gap-1">
                  <CreditCard className="h-3 w-3" /> $1 to send
                </span>
              )}
            </div>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Campaign type selector — shown first to adapt placeholders */}
            <div className="space-y-1.5">
              <Label>Campaign type</Label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.entries(TYPE_META) as [string, typeof TYPE_META[string]][]).map(([value, meta]) => {
                  const Icon = meta.icon;
                  const selected = form.type === value;
                  return (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm(f => ({ ...f, type: value as FormState["type"] }))}
                      className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-colors ${
                        selected
                          ? "border-emerald-500 bg-emerald-50 ring-1 ring-emerald-400"
                          : "border-border hover:bg-muted/50"
                      }`}
                    >
                      <span className={`rounded-md p-1.5 ${meta.color}`}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="text-sm font-medium leading-none">{meta.label}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{meta.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-1.5">
              <Label>Subject line *</Label>
              <Input
                value={form.title}
                onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                placeholder={PLACEHOLDERS[form.type]}
              />
            </div>

            <div className="space-y-1.5">
              <Label>Email body *</Label>
              <RichTextEditor
                value={form.htmlContent}
                onChange={html => setForm(f => ({ ...f, htmlContent: html }))}
                placeholder={BODY_PLACEHOLDERS[form.type]}
              />
              <p className="text-xs text-muted-foreground">
                Formatting is preserved in the email. An unsubscribe link is added to the footer automatically.
              </p>
            </div>
          </div>

          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setComposerOpen(false); setForm(emptyForm()); }}>Cancel</Button>
            <Button onClick={handleSend} disabled={create.isPending}>
              {hasUsedFree ? (
                <><CreditCard className="mr-2 h-4 w-4" />{create.isPending ? "Processing…" : `Pay $1 & send to ${audience?.subscribedCount ?? "your"} subscribers`}</>
              ) : (
                <><Send className="mr-2 h-4 w-4" />{create.isPending ? "Sending…" : `Send to ${audience?.subscribedCount ?? "your"} subscribers`}</>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── $1 payment confirmation dialog ── */}
      <Dialog open={paymentOpen} onOpenChange={setPaymentOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-amber-600" />
              Send this campaign for $1?
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="rounded-lg border bg-muted/40 p-4 space-y-2">
              <p className="font-semibold text-sm truncate">"{form.title}"</p>
              {audience && (
                <p className="text-sm text-muted-foreground">
                  To <strong>{audience.subscribedCount}</strong> organic event subscriber{audience.subscribedCount !== 1 ? "s" : ""}
                </p>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              You've used your free campaign send for this month. A one-time <strong>$1 payment</strong> lets you send this promotion right away.
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <AlertTriangle className="h-3 w-3 shrink-0" />
              You'll be redirected to Stripe. After payment, your campaign sends automatically.
            </p>
          </div>
          <DialogFooter className="gap-2">
            <Button variant="outline" onClick={() => { setPaymentOpen(false); setComposerOpen(true); }}>Back to editor</Button>
            <Button onClick={handlePayAndSend} disabled={checkout.isPending} className="bg-amber-600 hover:bg-amber-700 text-white border-0">
              <CreditCard className="mr-2 h-4 w-4" />
              {checkout.isPending ? "Redirecting…" : "Pay $1 & send →"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Send confirmation dialog ── */}
      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              Campaign sent!
            </DialogTitle>
          </DialogHeader>
          {sendResult && (
            <div className="space-y-4 py-2">
              <p className="text-sm text-muted-foreground">Your promotion has been dispatched. Here's the delivery summary:</p>
              <div className="rounded-lg border divide-y">
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-sm"><Users className="h-4 w-4 text-muted-foreground" /><span>Organic event subscribers</span></div>
                  <span className="font-semibold">{sendResult.totalAudience}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-sm"><Mail className="h-4 w-4 text-emerald-600" /><span>Emails delivered</span></div>
                  <span className="font-semibold text-emerald-700">{sendResult.emailsSent}</span>
                </div>
                <div className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-2 text-sm"><UserX className="h-4 w-4 text-muted-foreground" /><span>Opted out / no email</span></div>
                  <span className="font-semibold text-muted-foreground">{sendResult.optedOutCount + (sendResult.subscribedCount - sendResult.emailsSent)}</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">Individual email addresses are never shared with business owners.</p>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setConfirmOpen(false)} className="w-full">
              Done <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </PageLayout>
  );
}
