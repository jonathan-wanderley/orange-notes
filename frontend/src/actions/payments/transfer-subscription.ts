"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface TransferSubscriptionDto {
  fromUserEmail: string;
  toUserEmail: string;
}

interface ResponseDto {
  message: string;
}

export default async function transferSubscriptionAction(
  transferData: TransferSubscriptionDto
) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const url = `${process.env.API_URL}/payments/transfer-subscription`;

  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(transferData),
  });

  if (response.status === 200) {
    const data: ResponseDto = await response.json();
    return data;
  } else {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to transfer subscription");
  }
}
