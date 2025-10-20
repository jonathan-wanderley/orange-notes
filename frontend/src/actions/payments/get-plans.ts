"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  hasSubscription: boolean;
  plans: {
    id: string;
    period: "month" | "year" | undefined;
    totalInCents: number | null;
    isActive: boolean;
  }[];
}

export default async function getPlansAction() {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const url = `${process.env.API_URL}/payments/plans`;

  const response = await fetch(url, {
    method: "GET",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 200) {
    const data: ResponseDto = await response.json();

    return data;
  } else {
    throw new Error();
  }
}
