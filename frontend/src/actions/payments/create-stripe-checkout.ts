"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  checkoutUrl: string;
}

export default async function createStripeCheckoutAction(
  planId: string,
  returnBaseUrl: string
) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const checkoutResponse = await fetch(
    `${process.env.API_URL}/payments/checkout`,
    {
      method: "POST",
      cache: "no-cache",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ planId, returnBaseUrl }),
    }
  );

  if (checkoutResponse.status === 200) {
    const data: ResponseDto = await checkoutResponse.json();

    redirect(data.checkoutUrl);

    return data;
  } else {
    throw new Error("Failed to create stripe checkout");
  }
}
