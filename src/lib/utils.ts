import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { CartItem } from "./store/features/cart/cartSlice";
import CryptoJS from "crypto-js";
import { Product } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hashTheItem(payload: CartItem): string {
  const jsonString = JSON.stringify({ ...payload, qty: undefined });

  const hash = CryptoJS.SHA256(jsonString).toString();
  // console.log("hash -> ", hash);
  return hash;
}

export function getFromPrice(product: Product): number {
  // const basePrice = Object.entries(product).filter();
  const basePrice = Object.entries(product.priceConfiguration)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_key, value]) => {
      return value.priceType === "base";
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .reduce((acc, [_key, value]) => {
      const smallestPrice = Math.min(...Object.values(value.availableOptions));

      return acc + smallestPrice;
    }, 0);

  return basePrice;
}
