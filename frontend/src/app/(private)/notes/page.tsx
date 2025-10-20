import getAllNotesAction from "@/actions/notes/get-all-notes";
import Notes from "./_components";
import getSubscriptionStatusAction from "@/actions/payments/get-subscription-status";

export default async function NotesPage() {
  const data = await getAllNotesAction();
  const subscriptionStatus = await getSubscriptionStatusAction();

  return <Notes data={data} subscriptionStatus={subscriptionStatus} />;
}
