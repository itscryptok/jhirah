/**
 * Static-clone stub for `@workspace/api-client-react`.
 *
 * The original Jhirah frontend talks to a live backend through a generated
 * react-query API client that lives in a separate Replit monorepo package
 * (not recoverable from the web dev server). This static clone has no
 * backend, so every hook below returns a safe react-query-shaped result:
 * queries resolve to `undefined` data (components render their empty /
 * signed-out states), mutations are no-ops, and query-key factories return
 * stable key arrays. Nothing here performs network I/O.
 */

// Query hooks accept anything the generated client accepted (options
// objects, positional args) and return `any`-typed data so page code
// compiles unchanged.
type AnyQuery = ( ...args: any[] ) => {
  data: any;
  isLoading: boolean;
  isError: boolean;
  error: any;
  refetch: () => Promise<any>;
};

type AnyMutation = ( ...args: any[] ) => {
  mutate: (...args: any[]) => void;
  mutateAsync: (...args: any[]) => Promise<any>;
  isPending: boolean;
  isError: boolean;
  error: any;
  reset: () => void;
};

const makeQuery: AnyQuery = () => ({
  data: undefined,
  isLoading: false,
  isError: false,
  error: null,
  refetch: async () => undefined,
});

const makeMutation: AnyMutation = () => ({
  mutate: () => undefined,
  mutateAsync: async () => undefined,
  isPending: false,
  isError: false,
  error: null,
  reset: () => undefined,
});

// Query-key factories
export const getGetMyProfileQueryKey = (...args: any[]) =>
  ["profile", ...args] as const;
export const getGetBusinessBySessionCodeQueryKey = (...args: any[]) =>
  ["business-by-session-code", ...args] as const;

// Query hooks
export const useGetMyProfile: AnyQuery = makeQuery;
export const useGetMyBusiness: AnyQuery = makeQuery;
export const useGetMyBusinessStats: AnyQuery = makeQuery;
export const useGetMyBusinessAnalytics: AnyQuery = makeQuery;
export const useGetMyBusinessEventCode: AnyQuery = makeQuery;
export const useListCampaigns: AnyQuery = makeQuery;
export const useGetAudienceStats: AnyQuery = makeQuery;
export const useGetMySubscription: AnyQuery = makeQuery;
export const useListRewardTiers: AnyQuery = makeQuery;
export const useListMyBusinessCustomers: AnyQuery = makeQuery;
export const useGetMyVisitHistory: AnyQuery = makeQuery;
export const useGetActiveSession: AnyQuery = makeQuery;
export const useGetMyNotifications: AnyQuery = makeQuery;
export const useListMyRedemptions: AnyQuery = makeQuery;
export const useGetBusinessBySessionCode: AnyQuery = makeQuery;
export const useGetMyPoints: AnyQuery = makeQuery;

// Mutation hooks
export const useCheckIn: AnyMutation = makeMutation;
export const useSendHeartbeat: AnyMutation = makeMutation;
export const useRedeemReward: AnyMutation = makeMutation;
export const useMarkNotificationRead: AnyMutation = makeMutation;
export const useCreateCampaign: AnyMutation = makeMutation;
export const useCreateCampaignCheckout: AnyMutation = makeMutation;
export const useCreateRewardTier: AnyMutation = makeMutation;
export const useUpdateRewardTier: AnyMutation = makeMutation;
export const useDeleteRewardTier: AnyMutation = makeMutation;
export const useUpsertMyBusiness: AnyMutation = makeMutation;
export const useRegenerateMyBusinessEventCode: AnyMutation = makeMutation;
