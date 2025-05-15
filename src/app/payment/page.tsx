import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle2, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";
import React from "react";

const Payment = () => {
  return (
    <div className="flex flex-col items-center gap-4 w-full mt-32">
      <CheckCircle2 size={80} className="text-green-500" />
      <h1 className="text-2xl font-bold mt-2 text-center">
        Order placed successfully.
      </h1>
      <p className="text-base font-semibold -mt-2">Thank you for your order.</p>
      <Card className="mt-6 min-w-110">
        <CardHeader className="px-4 ">
          <CardTitle className="flex items-center justify-between gap-12 ">
            <div className="flex items-center gap-3">
              <Store size={35} className="text-primary" />
              <span className="text-base">Your order information.</span>
            </div>
            <Badge className="text-sm px-4" variant={"secondary"}>
              Confirmed
            </Badge>
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-3">
          <div className="flex items-center gap-2">
            <LayoutDashboard size={20} />
            <h2 className="text-base font-medium">Order reference:</h2>
            <Link href="/" className="underline">
              3213531314
            </Link>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <LayoutDashboard size={20} />
            <h2 className="text-base font-medium">Payment status:</h2>
            <Link href="/" className="underline">
              Paid
            </Link>
          </div>
        </CardContent>
      </Card>

      <Button asChild className="mt-6">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft size={20} className="text-white" />
          <span>Place another order</span>
        </Link>
      </Button>
    </div>
  );
};

export default Payment;
