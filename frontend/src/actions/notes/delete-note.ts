"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function deleteNoteAction(id: string) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }
  const url = `${process.env.API_URL}/notes/${id}`;

  const response = await fetch(url, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if ([200, 204].includes(response.status as number)) {
    revalidatePath("/notes");

    return true;
  } else {
    throw new Error("Failed to delete note");
  }
}
