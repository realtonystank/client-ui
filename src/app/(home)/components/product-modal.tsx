"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React, { startTransition, useMemo, useState } from "react";
import ToppingList from "./topping-list";
import { CircleCheck, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product, Topping } from "@/lib/types";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { addToCart, CartItem } from "@/lib/store/features/cart/cartSlice";
import { hashTheItem } from "@/lib/utils";
import { toast } from "sonner";

const SuccessToast = () => {
  return (
    <>
      <div className="flex items-center gap-2">
        <CircleCheck className="text-green-500" />
        <span className="font-bold">Added to cart</span>
      </div>
    </>
  );
};

type ChosenConfig = {
  [key: string]: string;
};

const ProductModal = ({
  product,
  categoryName,
}: {
  product: Product;
  categoryName: string;
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const defaultConfiguration = Object.entries(product.priceConfiguration)
    .map(([key, value]) => {
      return { [key]: Object.entries(value.availableOptions)[0][0] };
    })
    .reduce((acc, curr) => ({ ...acc, ...curr }), {});
  // console.log("defaultConfig ->", defaultConfiguration);

  const [chosenConfig, setChosenConfig] = useState<ChosenConfig>(
    defaultConfiguration as unknown as ChosenConfig
  );
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  const totalPrice = useMemo(() => {
    //console.log("selected toppings -> ", selectedToppings);
    const toppingsTotal = selectedToppings.reduce(
      (acc, curr) => acc + curr.price,
      0
    );

    const configPricing = Object.entries(chosenConfig).reduce(
      (acc, [key, value]) => {
        const price = product.priceConfiguration[key].availableOptions[value];

        return acc + price;
      },
      0
    );

    return toppingsTotal + configPricing;
  }, [chosenConfig, selectedToppings, product]);

  const alreadyHasInCart = useMemo(() => {
    const currentConfig: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: { ...chosenConfig },
        selectedToppings: selectedToppings,
      },
      qty: 1,
    };

    const hash = hashTheItem(currentConfig);
    //console.log("new hash -> ", hash);

    return cartItems.some((item) => item.hash === hash);
  }, [product, chosenConfig, selectedToppings, cartItems]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element._id === topping._id
    );

    startTransition(() => {
      if (isAlreadyExists) {
        setSelectedToppings((prev) =>
          prev.filter((element: Topping) => element._id !== topping._id)
        );
        return;
      }
      setSelectedToppings((prev) => [...prev, topping]);
    });
  };

  const handleAddToCart = (product: Product) => {
    console.log("adding to cart...");
    const itemToAdd: CartItem = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      chosenConfiguration: {
        priceConfiguration: chosenConfig!,
        selectedToppings: selectedToppings,
      },
      qty: 1,
    };
    dispatch(addToCart(itemToAdd));
    setSelectedToppings([]);
    setDialogOpen(false);
    toast(<SuccessToast />, {});
  };
  const handleRadioChange = (key: string, data: string) => {
    setChosenConfig((prev) => {
      return { ...prev, [key]: data };
    });
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <Button className="bg-orange-200 hover:bg-orange:300 text-orange-500 hover:text-white px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer">
          Choose
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:min-w-[650px] p-0">
        <div className="flex ">
          <div className="w-1/3 bg-white rounded p-4 flex items-center justify-center   ">
            <Image
              alt={product.name}
              src={product.image}
              width={450}
              height={450}
            />
          </div>
          <div className="w-2/3 p-4">
            <h3 className="text-xl font-bold">{product.name}</h3>
            <p className="mt-1 font-extralight">{product.description}</p>

            {Object.entries(product.priceConfiguration).map(([key, value]) => {
              return (
                <div key={key}>
                  <h4 className="mt-6 ">Choose the {key}</h4>
                  <RadioGroup
                    defaultValue={Object.entries(value.availableOptions)[0][0]}
                    className="grid grid-cols-3 gap-4 mt-2"
                    onValueChange={(data) => {
                      handleRadioChange(key, data);
                    }}
                  >
                    {Object.entries(value.availableOptions).map(
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      ([option, _price]) => {
                        // console.log("option -> ", option);
                        // console.log("_price -> ", _price);
                        return (
                          <div key={option}>
                            <RadioGroupItem
                              value={option}
                              id={option}
                              className="peer sr-only"
                              aria-label={option}
                            />
                            <Label
                              htmlFor={option}
                              className="flex flex-col items-center justify-between rounded-md border-2  bg-white p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
                            >
                              {option}
                            </Label>
                          </div>
                        );
                      }
                    )}
                  </RadioGroup>
                </div>
              );
            })}
            {categoryName.toLowerCase() === "pizza" && (
              <ToppingList
                selectedToppings={selectedToppings}
                handleCheckBoxCheck={handleCheckBoxCheck}
              />
            )}

            <div className="flex items-center justify-between mt-10">
              <span className="font-bold">&#8377; {totalPrice}</span>
              <Button
                onClick={() => handleAddToCart(product)}
                disabled={alreadyHasInCart}
                className={alreadyHasInCart ? "bg-gray-700" : "bg-primary"}
              >
                <ShoppingCart size={20} />
                <span className="ml-2">
                  {alreadyHasInCart ? "Already in cart" : "Add to cart"}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
