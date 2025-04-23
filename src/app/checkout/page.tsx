import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

const Checkout = async () => {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  return (
    <div className="flex container gap-6 mt-16 mx-auto">
      <Card className="w-3/5 border-none">
        <CardHeader>
          <CardTitle>Customer details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="fname">First Name</Label>
              <Input
                id="fname"
                type="text"
                className="w-full"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="lname">Last Name</Label>
              <Input
                id="lname"
                type="text"
                className="w-full"
                defaultValue=""
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                className="w-full"
                defaultValue=""
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Checkout;
