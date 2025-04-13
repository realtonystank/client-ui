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
import { useRouter } from "next/navigation";

const TenantSelect = ({
  restaurants,
}: {
  restaurants: { data: Restaurant[] };
}) => {
  const router = useRouter();

  const handleValueChange = (value: string) => {
    console.log(value);
    router.push(`/?id=${value}`);
  };

  return (
    <Select onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select restaurant" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {restaurants?.data.map((restaurant: Restaurant) => {
            return (
              <SelectItem
                key={restaurant.id}
                value={restaurant.id}
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
