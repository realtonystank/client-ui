import { Product, Topping } from "@/lib/types";
import { hashTheItem } from "@/lib/utils";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem
  extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {
  chosenConfiguration: {
    priceConfiguration: {
      [key: string]: string;
    };
    selectedToppings: Topping[];
  };
  qty: number;
  hash?: string;
}

export interface CartState {
  cartItems: CartItem[];
}

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const hash = hashTheItem(action.payload);
      const newItem = {
        ...action.payload,
        hash: hash,
      };
      if (typeof window != "undefined" && window.localStorage) {
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify([...state.cartItems, newItem])
        );
      }

      return {
        cartItems: [...state.cartItems, newItem],
      };
    },
    setInitialCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.cartItems.push(...action.payload);
    },
    changeQty: (
      state,
      action: PayloadAction<{ hash: string; qty: number }>
    ) => {
      const index = state.cartItems.findIndex(
        (item) => item.hash === action.payload.hash
      );
      state.cartItems[index].qty = Math.max(
        state.cartItems[index].qty + action.payload.qty,
        1
      );
      if (typeof window != "undefined" && window.localStorage) {
        window.localStorage.setItem(
          "cartItems",
          JSON.stringify(state.cartItems)
        );
      }
    },
    removeFromCart: (state, action: PayloadAction<{ hash: string }>) => {
      if (typeof window != "undefined" && window.localStorage) {
        const cartItemsFromLocalStorage = JSON.parse(
          window.localStorage.getItem("cartItems") || "[]"
        );
        if (cartItemsFromLocalStorage.length > 0) {
          const index = cartItemsFromLocalStorage.findIndex(
            (item: CartItem) => item.hash === action.payload.hash
          );

          if (index === -1) {
            console.error("Local storage and cart not in sync");
          } else {
            cartItemsFromLocalStorage.splice(index, 1);
            window.localStorage.setItem(
              "cartItems",
              JSON.stringify(cartItemsFromLocalStorage)
            );
          }
        }
        console.error("Local storage and cart not in sync.");
      }

      return {
        cartItems: state.cartItems.filter(
          (item) => item.hash !== action.payload.hash
        ),
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCartItems, changeQty, removeFromCart } =
  cartSlice.actions;

export default cartSlice.reducer;
