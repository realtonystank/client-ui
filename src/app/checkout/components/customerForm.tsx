"use client";
import { load } from "@cashfreepayments/cashfree-js";
import React, { useRef } from "react";
import { z } from "zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import { Coins, CreditCard, Loader } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { createOrder, getCustomer } from "@/lib/http/api";

import AddAddress from "./addAddress";
import { Customer, OrderData } from "@/lib/types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary from "./orderSummary";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useSearchParams } from "next/navigation";
import { clearCart } from "@/lib/store/features/cart/cartSlice";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  address: z.string({ required_error: "Please select an address" }),
  paymentMode: z.enum(["card", "cash"], {
    required_error: "You need to select a payment mode",
  }),
  comment: z.any(),
});

const CustomerForm = () => {
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: customer, isPending } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      const response = await getCustomer();
      return response.data as Customer;
    },
  });

  const idempotencyKeyRef = useRef("");

  const { mutate, isPending: isPlaceOrderPending } = useMutation({
    mutationKey: ["order"],
    mutationFn: async (data: OrderData) => {
      const idempotencyKey = idempotencyKeyRef.current
        ? idempotencyKeyRef.current
        : (idempotencyKeyRef.current = uuidv4() + customer?._id);
      const response = await createOrder(data, idempotencyKey);
      console.log(response);
      return response.data;
    },
    onSuccess: async (data) => {
      const cashfree = await load({ mode: "sandbox" });
      console.log("data in after success - ", data);
      if (
        cashfree &&
        data.session &&
        data.session.paymentMode &&
        data.session.paymentMode !== "cash"
      ) {
        const checkoutOptions = {
          paymentSessionId: data.session.id,
          redirectTarget: "_self",
        };
        cashfree.checkout(checkoutOptions);
      } else {
        alert("Order placed successfully!");
        dispatch(clearCart());
        router.push(`/?restaurantId=${data.session.tenantId}`);
      }
    },
    retry: 3,
  });

  const customerForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const cart = useAppSelector((state) => state.cart);
  const chosenCouponCode = useRef("");

  const handlePlaceOrder = (data: z.infer<typeof formSchema>) => {
    const tenantId = searchParams.get("restaurantId");
    if (!tenantId) {
      alert("Restaurant Id is required");
      return;
    }
    const orderData: OrderData = {
      cart: cart.cartItems,
      couponCode: chosenCouponCode.current ? chosenCouponCode.current : "",
      tenantId,
      customerId: customer ? customer?._id : "",
      comment: data.comment,
      address: data.address,
      paymentMode: data.paymentMode,
    };

    mutate(orderData);

    console.log("orderData - ", orderData);
  };

  return (
    <Form {...customerForm}>
      <form onSubmit={customerForm.handleSubmit(handlePlaceOrder)}>
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
                      <AddAddress customerId={customer?._id} />
                    </div>
                    <FormField
                      name="address"
                      control={customerForm.control}
                      render={({ field }) => {
                        return (
                          <FormItem>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                className="grid grid-cols-2 gap-6 mt-2"
                              >
                                {customer?.addresses.map((address) => {
                                  return (
                                    <Card key={address.text} className="p-6">
                                      <div className="flex items-center space-x-2">
                                        <RadioGroupItem
                                          value={address.text}
                                          id={address.text}
                                        />
                                        <Label
                                          htmlFor={address.text}
                                          className="leading-normal"
                                        >
                                          {address.text}
                                        </Label>
                                      </div>
                                    </Card>
                                  );
                                })}
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        );
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-3 mt-7">
                <Label>Payment Mode</Label>
                <FormField
                  name="paymentMode"
                  control={customerForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <RadioGroup
                            className="flex gap-6"
                            onValueChange={field.onChange}
                          >
                            <div className="w-36">
                              <RadioGroupItem
                                value={"card"}
                                id={"card"}
                                className={"peer sr-only"}
                                aria-label={"card"}
                              />
                              <Label
                                htmlFor={"card"}
                                className="flex items-center justify-center rounded-md border-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <CreditCard size={"20"} />
                                <span className="ml-2">Card</span>
                              </Label>
                            </div>
                            <div className="w-36">
                              <RadioGroupItem
                                value={"cash"}
                                id={"cash"}
                                className="peer sr-only"
                                aria-label={"cash"}
                              />
                              <Label
                                htmlFor={"cash"}
                                className="flex items-center justify-center rounded-md border-md border-2 bg-white p-2 h-16 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                              >
                                <Coins size={"20"} />
                                <span className="ml-2 text-md">Cash</span>
                              </Label>
                            </div>
                          </RadioGroup>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>
              <div className="grid gap-3 mt-7">
                <Label htmlFor="comment">Comment</Label>
                <FormField
                  name="comment"
                  control={customerForm.control}
                  render={({ field }) => {
                    return (
                      <FormItem>
                        <FormControl>
                          <Textarea {...field} />
                        </FormControl>
                      </FormItem>
                    );
                  }}
                />
              </div>
            </CardContent>
          </Card>
          <OrderSummary
            handleCouponCodeChange={(code) => {
              chosenCouponCode.current = code;
            }}
            isPlaceOrderPending={isPlaceOrderPending}
          />
        </div>
      </form>
    </Form>
  );
};

export default CustomerForm;
