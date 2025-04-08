"use client";
import React, { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

// const toppings = [
//   {
//     id: "1",
//     name: "Cheese",
//     image: "/chicken.png",
//     price: 50,
//     isAvailable: true,
//   },
//   {
//     id: "2",
//     name: "Jelapenjo",
//     image: "/Jelapeno.png",
//     price: 50,
//     isAvailable: true,
//   },
//   {
//     id: "3",
//     name: "Cheese",
//     image: "/cheese.png",
//     price: 50,
//     isAvailable: true,
//   },
// ];

const ToppingList = () => {
  const [toppings, setToppings] = useState<Topping[]>();
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/toppings`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings?.data);
    };

    fetchData();
  }, []);

  const handleCheckBoxCheck = (topping: Topping) => {
    const isAlreadyExists = selectedToppings.some(
      (element: Topping) => element._id === topping._id
    );

    if (isAlreadyExists) {
      setSelectedToppings((prev) =>
        prev.filter((element: Topping) => element._id !== topping._id)
      );
      return;
    }

    setSelectedToppings((prev) => [...prev, topping]);
  };
  return (
    <section className="mt-6">
      <h3>Extra toppings</h3>
      <div className="grid grid-cols-3 gap-4 mt-2">
        {toppings?.map((topping: Topping) => {
          return (
            <ToppingCard
              key={topping._id}
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
