import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentSession } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  CheckCircle2,
  CircleX,
  LayoutDashboard,
  Store,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import CartCleaner from "../checkout/components/cartCleaner";

const Payment = async ({
  searchParams,
}: {
  searchParams: Promise<{ order_id: string; restaurantId: string }>;
}) => {
  const { order_id, restaurantId } = await searchParams;
  console.log("order_id is -", order_id);

  const response = await fetch(
    `${process.env.BACKEND_URL}/api/order/payments/verify?order_id=${order_id}`
  );

  const paymentSession: PaymentSession = await response.json();
  console.log("paymentSession - ", paymentSession);

  const isOrderSuccess = paymentSession.paymentStatus === "paid";

  return (
    <>
      {isOrderSuccess && <CartCleaner />}
      <div className="flex flex-col items-center gap-4 w-full mt-32">
        {isOrderSuccess ? (
          <CheckCircle2 size={80} className="text-green-500" />
        ) : (
          <CircleX size={80} className="text-red-500" />
        )}

        <h1 className="text-2xl font-bold mt-2 text-center">
          {isOrderSuccess ? (
            <span>Order Placed Succesfully</span>
          ) : (
            <span>Order failed</span>
          )}
        </h1>
        <p className="text-base font-semibold -mt-2">
          {isOrderSuccess ? (
            <span>Thank you for your order.</span>
          ) : (
            <span>Please try again.</span>
          )}
        </p>
        <Card className="mt-6 min-w-110">
          <CardHeader className="px-4 ">
            <CardTitle className="flex items-center justify-between gap-12 ">
              <div className="flex items-center gap-3">
                <Store size={35} className="text-primary" />
                <span className="text-base">Your order information.</span>
              </div>
              <Badge
                className={cn(
                  `text-sm font-semibold px-4 `,
                  isOrderSuccess
                    ? `bg-green-500 text-white`
                    : `bg-red-500 text-white`
                )}
              >
                {isOrderSuccess ? <span>Confirmed</span> : <span>Failed</span>}
              </Badge>
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-3">
            <div className="flex items-center gap-2">
              <LayoutDashboard size={20} />
              <h2 className="text-base font-medium">Order reference:</h2>
              <Link href="/" className="underline">
                {paymentSession.metadata.orderId}
              </Link>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <LayoutDashboard size={20} />
              <h2 className="text-base font-medium">Payment status:</h2>
              <Link href="/" className="underline">
                {isOrderSuccess ? <span>Paid</span> : <span>Unpaid</span>}
              </Link>
            </div>
          </CardContent>
        </Card>
        {isOrderSuccess ? (
          <Button asChild className="mt-6">
            <Link
              href={`/order-status/${paymentSession.metadata.orderId}?restaurantId=${restaurantId}`}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} className="text-white" />
              <span>Go to order status page</span>
            </Link>
          </Button>
        ) : (
          <Button asChild className="mt-6">
            <Link
              href={`/checkout?restaurantId=${restaurantId}`}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={20} className="text-white" />
              <span>Go to checkout</span>
            </Link>
          </Button>
        )}
      </div>
    </>
  );
};

export default Payment;
