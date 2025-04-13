"use client";
import React, { useEffect, useState } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";
import { SkeletonCard } from "@/components/skeleton-card";
import { useSearchParams } from "next/navigation";

const ToppingList = ({
  selectedToppings,
  handleCheckBoxCheck,
}: {
  selectedToppings: Topping[];
  handleCheckBoxCheck: (topping: Topping) => void;
}) => {
  const searchParams = useSearchParams();
  const [toppings, setToppings] = useState<Topping[]>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const toppingResponse = await fetch(
        `${
          process.env.NEXT_PUBLIC_BACKEND_URL
        }/api/catalog/toppings?tenantId=${searchParams.get("restaurantId")}`
      );
      const toppings = await toppingResponse.json();
      setToppings(toppings?.data);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="mt-5">
        <SkeletonCard />
      </div>
    );
  }

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
