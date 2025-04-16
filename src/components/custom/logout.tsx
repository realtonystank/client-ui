"use client";
import React from "react";
import { Button } from "../ui/button";
import { logout } from "@/lib/actions/logout";

const LogoutButton = () => {
  return (
    <Button
      size={"sm"}
      onClick={async () => {
        await logout();
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
