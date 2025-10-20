"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  data: any;
}

export default async function addNoteAction(body: any) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const url = `${process.env.API_URL}/notes`;

  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (response.status === 201) {
    const data: any = await response.json();

    revalidatePath("/notes");

    return {
      data,
    };
  } else if (response.status === 402) {
    throw new Error("Free plan limit reached");
  } else {
    throw new Error("Failed to add note, try again later");
  }
}
