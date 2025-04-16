"use client";
import React, { ReactNode, useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

const Refresher = ({ children }: { children: ReactNode }) => {
  const timeoutId = useRef<NodeJS.Timeout>(undefined);
  const getAccessToken = async () => {
    const res = await fetch("/api/auth/accessToken");

    if (!res.ok) {
      return;
    }

    const accessToken = await res.json();
    return accessToken?.token;
  };

  const refreshAccessToken = async () => {
    try {
      const res = await fetch("/api/auth/refresh", { method: "POST" });
      if (!res.ok) {
        console.error("Failed to refresh access token");
        return;
      }

      const refreshData = await res.json();

      if (refreshData.success === false) {
        return;
      }
    } catch (err) {
      console.error(err);
    }

    startRefresh();
  };

  const startRefresh = useCallback(async () => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    try {
      const accessToken = await getAccessToken();
      if (!accessToken) {
        return;
      }

      const decodedToken = jose.decodeJwt(accessToken);
      const exp = decodedToken.exp! * 1000; // Convert to milliseconds

      const currentTime = Date.now();
      const refreshTime = exp - currentTime - 5000;

      console.log(`Current time: ${new Date(currentTime).toISOString()}`);
      console.log(`Token expiry time: ${new Date(exp).toISOString()}`);
      console.log(
        `Scheduled refresh time: ${new Date(
          currentTime + refreshTime
        ).toISOString()}`
      );

      timeoutId.current = setTimeout(() => {
        refreshAccessToken();
      }, refreshTime);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    startRefresh();

    return () => {
      clearTimeout(timeoutId.current);
    };
  }, [timeoutId, startRefresh]);
  return <div>{children}</div>;
};

export default Refresher;
