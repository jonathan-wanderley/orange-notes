import getSubscriptionAction from "@/actions/payments/get-subscription";
import Index from "./_components";
import getPlansAction from "@/actions/payments/get-plans";

export default async function PaymentsPage() {
  const prices = await getPlansAction();
  const subscription = await getSubscriptionAction();

  return <Index data={prices.data} subscription={subscription.data} />;
}
