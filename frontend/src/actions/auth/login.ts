"use server";

import { cookies } from "next/headers";
import ms from "ms";

interface ResponseDto {
  data: {
    status: string;
    token: string;
  };
}

export default async function loginAction(body: any) {
  const cookiesManager = await cookies();
  const url = `${process.env.API_URL}/auth/login`;

  const response = await fetch(url, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (response.status === 200) {
    const { data }: ResponseDto = await response.json();

    const now = new Date();
    const time = now.getTime();
    const expires = time + ms("6h");

    cookiesManager.set("token", data.token, {
      path: "/",
      expires,
    });

    return {
      data,
    };
  } else {
    throw new Error();
  }
}
