"use server";
import cookie from "cookie";
import { cookies } from "next/headers";

type AccessTokenType = {
  accessToken: string;
  expires: string;
  httpOnly: boolean;
  Path: string;
  Domain: string;
  SameSite: string;
  "Max-age": string;
};

type RefreshTokenType = Omit<AccessTokenType, "accessToken"> & {
  refreshToken: string;
};

export default async function login(
  prevState: { type: string; message: unknown },
  formData: FormData
) {
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const response = await fetch(
      `${process.env.BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return {
        type: "error",
        message: error.errors[0].msg,
      };
    }

    const c = response.headers.getSetCookie();
    const accessToken = c.find((cookie) => cookie.includes("accessToken"));
    const refreshToken = c.find((cookie) => cookie.includes("refreshToken"));

    if (!accessToken || !refreshToken) {
      return {
        type: "error",
        message: "No ccokies were found!",
      };
    }

    const parsedAccessToken: AccessTokenType = cookie.parse(
      accessToken
    ) as unknown as AccessTokenType;
    const parsedRefreshToken: RefreshTokenType = cookie.parse(
      refreshToken
    ) as unknown as RefreshTokenType;

    console.log(parsedAccessToken);
    console.log(parsedRefreshToken);

    (await cookies()).set({
      name: "accessToken",
      value: parsedAccessToken.accessToken,
      expires: new Date(parsedAccessToken.expires),
      httpOnly: (parsedAccessToken.httpOnly as unknown as boolean) || true,
      path: parsedAccessToken.Path,
      domain: parsedAccessToken.Domain,
      sameSite: parsedAccessToken.SameSite as "strict",
    });
    (await cookies()).set({
      name: "refreshToken",
      value: parsedRefreshToken.refreshToken,
      expires: new Date(parsedRefreshToken.expires),
      httpOnly: (parsedRefreshToken.httpOnly as unknown as boolean) || true,
      path: parsedRefreshToken.Path,
      domain: parsedRefreshToken.Domain,
      sameSite: parsedRefreshToken.SameSite as "strict",
    });

    return {
      type: "success",
      message: "Login successful!",
    };
  } catch (err) {
    console.error(err);
    return {
      type: "error",
      message: err instanceof Error ? err.message : "Login failure!",
    };
  }
}
