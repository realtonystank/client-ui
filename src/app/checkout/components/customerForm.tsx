"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { getCustomer } from "@/lib/http/api";
import { useQuery } from "@tanstack/react-query";
import { Loader, Plus } from "lucide-react";
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
  const { data: customer, isPending } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
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
            <div className="grid gap-3">
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="name">Address</Label>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size={"sm"} variant={"link"}>
                        <Plus size={"16"} />
                        <span className="ml-2">Add New Address</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Add Address</DialogTitle>
                        <DialogDescription>
                          We can sve your address for next time order.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div>
                          <Label htmlFor="address">Address</Label>
                          <Textarea className="mt-2" />
                        </div>
                      </div>
                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
                <RadioGroup
                  defaultValue="option-one"
                  className="grid grid-cols-2 gap-6 mt-2"
                >
                  {customer?.addresses.map((address) => {
                    return (
                      <Card key={address.text} className="p-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="option-one" id="option-one" />
                          <Label
                            htmlFor="option-one"
                            className="leading-normal"
                          >
                            {address.text}
                          </Label>
                        </div>
                      </Card>
                    );
                  })}
                </RadioGroup>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerForm;
