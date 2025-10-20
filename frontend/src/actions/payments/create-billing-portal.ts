"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface ResponseDto {
  portalUrl: string;
}

export default async function createBillingPortalAction(returnUrl: string) {
  const localCookies = await cookies();
  const token = localCookies.get("token")?.value;

  if (!token) {
    redirect("/auth");
  }

  const url = `${
    process.env.API_URL
  }/payments/billing-portal?returnUrl=${encodeURIComponent(returnUrl)}`;

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

    if (data.portalUrl) {
      redirect(data.portalUrl);
    }

    return {};
  } else {
    return {
      portalUrl: undefined,
    };
  }
}
