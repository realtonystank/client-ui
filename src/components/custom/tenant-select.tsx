"use client";
import React from "react";
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

  const handleValueChange = (value: string) => {
    console.log(value);
    router.push(`/?restaurantId=${value}`);
  };

  return (
    <Select
      onValueChange={handleValueChange}
      defaultValue={searchParams.get("restaurantId") || ""}
    >
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
