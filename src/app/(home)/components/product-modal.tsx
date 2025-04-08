"use client";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import ToppingList from "./topping-list";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/lib/types";

const ProductModal = ({
  product,
  categoryName,
}: {
  product: Product;
  categoryName: string;
}) => {
  const handleAddToCart = () => {
    console.log("adding to cart...");
  };

  return (
    <Dialog>
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
                    defaultValue={value.availableOptions[0]}
                    className="grid grid-cols-3 gap-4 mt-2"
                  >
                    {Object.entries(value.availableOptions).map(
                      // eslint-disable-next-line @typescript-eslint/no-unused-vars
                      ([option, _price]) => {
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
            {categoryName.toLowerCase() === "pizza" && <ToppingList />}
            <div className="flex items-center justify-between mt-10">
              <span className="font-bold">&#8377; {100}</span>
              <Button onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                <span className="ml-2">Add to cart</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
