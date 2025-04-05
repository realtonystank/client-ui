"use client";
import React, { useState } from "react";
import ToppingCard from "./topping-card";

export type Topping = {
  id: string;
  name: string;
  image: string;
  price: number;
  isAvailable: boolean;
};

const toppings = [
  {
    id: "1",
    name: "Cheese",
    image: "/chicken.png",
    price: 50,
    isAvailable: true,
  },
  {
    id: "2",
    name: "Jelapenjo",
    image: "/Jelapeno.png",
    price: 50,
    isAvailable: true,
  },
  {
    id: "3",
    name: "Cheese",
    image: "/cheese.png",
    price: 50,
    isAvailable: true,
  },
];

const ToppingList = () => {
  const [selectedToppings, setSelectedToppings] = useState([toppings[0]]);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element.id === topping.id
    );

    if (isAlreadyExists) {
      setSelectedToppings((prev) =>
        prev.filter((element) => element.id !== topping.id)
      );
      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
  };
  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings.map((topping: Topping) => {
          return (
            <ToppingCard
              key={topping.id}
              topping={topping}
              selectedToppings={selectedToppings}
              handleCheckBoxCheck={handleCheckBoxCheck}
            />
          );
        })}
      </div>
    </section>
  );
};

export default ToppingList;
