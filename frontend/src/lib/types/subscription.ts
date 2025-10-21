export type Subscription = {
  id: string;
  status: "ACTIVE" | "INACTIVE" | "CANCELLED";
  currentPeriodEnd: string;
  stripeSubscriptionPriceId: string;
};
