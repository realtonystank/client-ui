import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";
import CustomerForm from "./components/customerForm";

const Checkout = async ({
  searchParams,
}: {
  searchParams: Promise<{ restaurantId: string }>;
}) => {
  const session = await getSession();
  const query = await searchParams;
  const sParams = new URLSearchParams(query);
  const existingQueryString = sParams.toString();
  sParams.append("returnTo", `/checkout?${existingQueryString}`);

  if (!session) {
    redirect(`/login?${sParams}`);
  }
  return <CustomerForm />;
};

export default Checkout;
