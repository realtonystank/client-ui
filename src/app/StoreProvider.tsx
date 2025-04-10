"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store/store";
import { setInitialCartItems } from "@/lib/store/features/cart/cartSlice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
    storeRef.current = makeStore();
  }

  useEffect(() => {
    //set intial cart data from local storage
    const isLocalStorageAvailable =
      typeof window != "undefined" && window.localStorage;
    if (isLocalStorageAvailable) {
      const cartItems = window.localStorage.getItem("cartItems");
      try {
        const parsedItems = JSON.parse(cartItems as string);
        storeRef?.current?.dispatch(setInitialCartItems(parsedItems));
      } catch (err) {
        console.error(err);
      }
    }
  }, [storeRef]);

  return <Provider store={storeRef.current}>{children}</Provider>;
}
