import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";
import { Topping } from "./topping-list";
import { cn } from "@/lib/utils";
import { CircleCheck } from "lucide-react";

type ToppingCardProps = {
  topping: Topping;
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
};

const ToppingCard = ({
  topping,
  selectedToppings,
  handleCheckBoxCheck,
}: ToppingCardProps) => {
  const isCurrentSelected = selectedToppings.some(
    (element: Topping) => element.id === topping.id
  );
  return (
    <Button
      variant={"outline"}
      className={cn(
        "flex flex-col h-36 relative",
        isCurrentSelected ? "border-primary" : ""
      )}
      onClick={() => handleCheckBoxCheck(topping)}
    >
      <Image src={topping.image} width={80} height={80} alt={topping.name} />
      <h4>{topping.name}</h4>
      <p>&#8377; {topping.price}</p>
      {isCurrentSelected && (
        <CircleCheck className="absolute top-1 right-1 text-primary" />
      )}
    </Button>
  );
};

export default ToppingCard;
