"use server";

import { cookies } from "next/headers";

export const logout = async () => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/auth/auth/logout`,
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${(await cookies()).get("accessToken")?.value}`,
        cookie: `refreshToken=${(await cookies()).get("refreshToken")?.value}`,
      },
    }
  );

  if (!response.ok) {
    console.error("Logout failed", response.status);
    return false;
  }

  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");

  return true;
};
