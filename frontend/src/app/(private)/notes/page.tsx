import getAllNotesAction from "@/actions/notes/get-all-notes";
import Notes from "./_components";
import getSubscriptionAction from "@/actions/payments/get-subscription";

export default async function NotesPage() {
  const data = await getAllNotesAction();
  const subscription = await getSubscriptionAction();

  return <Notes data={data} subscription={subscription.data} />;
}
