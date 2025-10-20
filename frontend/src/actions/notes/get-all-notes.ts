"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  data: any;
}

export default async function getAllNotesAction() {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const url = `${process.env.API_URL}/notes`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const data: any = await response.json();

    return data;
  } else {
    throw new Error();
  }
}
