"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getCustomer } from "@/lib/http/api";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import React from "react";

interface Address {
  text: string;
  isDefault: boolean;
}

interface Customer {
  firstName: string;
  lastName: string;
  email: string;
  addresses: Address[];
}

const CustomerForm = () => {
  const { data: customer, isPending } = useQuery({
    queryKey: ["customer"],
    queryFn: async (): Promise<Customer> => {
      const response = await getCustomer();
      return response.data as Customer;
    },
  });

  return (
    <div className="flex container gap-6 mt-16 mx-auto">
      <Card className="w-3/5 border-none">
        <CardHeader className="flex justify-between min-h-6">
          <CardTitle>Customer details</CardTitle>
          {isPending && (
            <Loader className="h-6 w-6 animate-spin text-primary" />
          )}
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                className="w-full"
                defaultValue={customer?.firstName}
                disabled={true}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                className="w-full"
                defaultValue={customer?.lastName}
                disabled={true}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                defaultValue={customer?.email}
                disabled={true}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
