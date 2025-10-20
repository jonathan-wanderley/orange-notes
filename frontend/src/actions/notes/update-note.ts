"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  data: any;
}

export default async function updateNoteAction(id: string, body: any) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const url = `${process.env.API_URL}/notes/${id}`;

  const response = await fetch(url, {
    method: "PUT",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    const data: any = await response.json();

    revalidatePath("/notes");

    return data;
  } else {
    throw new Error("Failed to update note");
  }
}
