import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { verifyCoupon } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import {
  CouponResponseType,
  CouponTypeData,
  ServerErrorType,
} from "@/lib/types";
import { getItemTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useRef, useState } from "react";

//todo: move this to server
const TAXES_PERCENTAGE = 18;
const DELIVERY_CHARGES = 100;

const OrderSummary = ({
  handleCouponCodeChange,
}: {
  handleCouponCodeChange: (code: string) => void;
}) => {
  const searchParams = useSearchParams();
  const cart = useAppSelector((state) => state.cart.cartItems);
  const [discountError, setDiscountError] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const couponCodeRef = useRef<HTMLInputElement>(null);

  const subTotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      return acc + curr.qty * getItemTotal(curr);
    }, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((subTotal * discountPercentage) / 100);
  }, [subTotal, discountPercentage]);

  const taxesAmount = useMemo(() => {
    const amountAfterDiscount = subTotal - discountAmount;
    return Math.round((amountAfterDiscount * TAXES_PERCENTAGE) / 100);
  }, [subTotal, discountAmount]);

  const grandTotalWithDiscount = useMemo(() => {
    return subTotal - discountAmount + taxesAmount + DELIVERY_CHARGES;
  }, [subTotal, discountAmount, taxesAmount]);

  const grandTotalWithoutDiscount = useMemo(() => {
    return subTotal + taxesAmount + DELIVERY_CHARGES;
  }, [subTotal, taxesAmount]);

  const { mutate } = useMutation({
    mutationKey: ["couponCode"],
    mutationFn: async () => {
      if (!couponCodeRef.current) {
        return;
      }
      const restaurantId = searchParams.get("restaurantId");
      if (!restaurantId) {
        return;
      }
      const data: CouponTypeData = {
        code: couponCodeRef.current?.value,
        tenantId: restaurantId,
      };
      const response = await verifyCoupon(data);
      return response.data;
    },
    onSuccess: (data) => {
      const _data = data as CouponResponseType;
      if (_data?.valid) {
        console.log(_data);
        setDiscountError("");
        setDiscountPercentage(Number(_data.discount));
        handleCouponCodeChange(
          couponCodeRef.current ? couponCodeRef.current.value : ""
        );
        return;
      } else {
        setDiscountError("Coupon expired");
        setDiscountPercentage(0);
        handleCouponCodeChange("");
      }
    },
    onError: (error: ServerErrorType) => {
      console.log(error);
      setDiscountError(error.response.data.errors[0].msg);
      setDiscountPercentage(0);
    },
  });

  const handleCouponValidation = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <Card className="w-2/5 border-none h-auto self-start">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 pt-6">
        <div className="flex items-center justify-between">
          <span>Subtotal</span>
          <span className="font-bold">₹{subTotal}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Taxes</span>
          <span className="font-bold">₹{taxesAmount}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Delivery Charges</span>
          <span className="font-bold">₹{DELIVERY_CHARGES}</span>
        </div>
        <div className="flex items-center justify-between">
          <span>Discount</span>
          <span className="font-bold">₹{discountAmount}</span>
        </div>
        <hr />
        <div className="flex items-center justify-between">
          <span className="font-bold">Order total</span>
          <span className="font-bold flex flex-col items-end">
            <span
              className={discountPercentage ? "line-through text-gray-400" : ""}
            >
              ₹{grandTotalWithoutDiscount}
            </span>
            {discountPercentage ? (
              <span className="text-green-700">₹{grandTotalWithDiscount}</span>
            ) : null}
          </span>
        </div>
        <div className="flex items-center  flex-col">
          <span className="text-red-500">{discountError}</span>
          <div className="flex items-center gap-4">
            <Input
              id="coupon"
              name="code"
              type="text"
              className="w-full"
              placeholder="Coupon code"
              ref={couponCodeRef}
            />
            <Button variant={"outline"} onClick={handleCouponValidation}>
              Apply
            </Button>
          </div>
        </div>
        <div className="text-right mt-6">
          <Button>Place order</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
