"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  data: any;
}

export default async function getNoteByIdAction(id: string) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const url = `${process.env.API_URL}/notes/${id}`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.status === 200) {
    const { data }: ResponseDto = await response.json();

    return data;
  } else {
    throw new Error("Failed to get note by id");
  }
}
