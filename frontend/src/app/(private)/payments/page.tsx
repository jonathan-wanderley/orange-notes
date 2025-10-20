import Index from "./_components";
import getPlansAction from "@/actions/payments/get-plans";

export default async function PaymentsPage() {
  const data = await getPlansAction();

  return <Index data={data} />;
}
