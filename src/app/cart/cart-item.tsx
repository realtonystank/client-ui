import React from "react";
import {
  changeQty,
  CartItem as Item,
  removeFromCart,
} from "@/lib/store/features/cart/cartSlice";
import Image from "next/image";
import { X } from "lucide-react";
import QtyChanger from "./qty-changer";
import { useAppDispatch } from "@/lib/store/hooks";
const CartItem = ({ item }: { item: Item }) => {
  const dispatch = useAppDispatch();
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="flex items-center w-3/4 gap-10">
          <Image src={item.image} width={100} height={100} alt={item.name} />
          <div className="flex-1">
            <h2 className="font-bold">{item.name}</h2>
            <h3 className="text-xs text-gray-500">
              {Object.values(item.chosenConfiguration.priceConfiguration)
                .map((value) => value)
                .join(", ")}
            </h3>
            <h3 className="text-xs text-gray-500">
              {item.chosenConfiguration.selectedToppings
                .map((topping) => topping.name)
                .join(", ")}
            </h3>
          </div>
        </div>
        <div className="flex items-center gap-4 justify-between">
          <div>
            <QtyChanger
              handleQtyChange={(d: number) => {
                dispatch(changeQty({ hash: item.hash!, qty: d }));
              }}
            >
              {item.qty}
            </QtyChanger>
          </div>
          <div className="flex">
            <div className="font-bold w-12">&#8377;300</div>
            <button
              className="ml-4 hover:cursor-pointer"
              onClick={() => {
                dispatch(removeFromCart({ hash: item.hash! }));
              }}
            >
              <X />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartItem;
