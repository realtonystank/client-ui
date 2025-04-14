"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Restaurant } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

const TenantSelect = ({
  restaurants,
}: {
  restaurants: { data: Restaurant[] };
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [value, setValue] = useState("");

  const handleValueChange = (newValue: string) => {
    console.log(newValue);
    router.push(`?restaurantId=${newValue}`);
    setValue(newValue);
  };

  useEffect(() => {
    const restId = searchParams.get("restaurantId");
    console.log("restId -> ", restId);
    if (restId) {
      router.push(`?restaurantId=${restId}`);
      setValue(restId);
    } else {
      setValue("");
    }
  }, [router, searchParams]);

  return (
    <Select onValueChange={handleValueChange} value={value}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select restaurant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {restaurants?.data.map((restaurant: Restaurant) => {
            return (
              <SelectItem
                key={restaurant.id}
                value={String(restaurant.id)}
                className={"w-full"}
              >
                {restaurant.name}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
