"use client";
import Link from "next/link";
import React from "react";
import { ShoppingBasket } from "lucide-react";
// import { useAppDispatch} from "@/lib/store/hooks";

const CartCounter = () => {
  // const value = useAppSelector((state) => state.cart.value);
  // const dispatch = useAppDispatch();
  const handleIncrement = () => {
    // dispatch(increment());
  };

  return (
    <div className="relative">
      <Link href="/cart">
        <ShoppingBasket className="hover:text-primary" />
      </Link>
      <span className="absolute -top-4 -right-5 h-6 w-6 flex items-center justify-center rounded-full bg-primary font-bold text-white">
        1
      </span>
      <button style={{ display: "none" }} onClick={handleIncrement}>
        Increment
      </button>
    </div>
  );
};

export default CartCounter;
