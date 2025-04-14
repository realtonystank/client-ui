"use client";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { ArrowRight, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import CartItem from "./cart-item";

const CartItems = () => {
  const searchParams = useSearchParams();
  const cart = useAppSelector((state) => state.cart.cartItems);

  if (!cart.length) {
    return (
      <div className="flex items-center gap-2">
        <ShoppingCart />
        <p className="text-gray-500">
          Your cart is empty!{" "}
          <Link
            className="text-orange-500"
            href={`/?retaurantId=${searchParams.get("restaurantId")}`}
          >
            Continue shopping?
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {cart.map((cartItem) => {
        return <CartItem key={cartItem.hash!} item={cartItem} />;
      })}
      <div className="flex justify-between items-center mt-10">
        <span className="font-bold">&#8377; {4000}</span>
        <Button>
          Checkout
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default CartItems;
