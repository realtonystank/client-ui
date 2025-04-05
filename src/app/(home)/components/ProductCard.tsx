import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export type Product = {
  id: string;
  name: string;
  description: string;
  image: string;
  price: number;
};

type PropTypes = {
  product: Product;
};

const ProductCard = ({ product }: PropTypes) => {
  return (
    <Card className="border-none rounded-xl">
      <CardHeader className="flex justify-center">
        <Image alt={"pizza-img"} src={product.image} width={150} height={150} />
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold">{product.name}</h2>
        <p className="mt-2">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p>
          <span>From&nbsp;&nbsp;&nbsp;</span>
          <span className="font-bold">₹{product.price}</span>
        </p>
        <Button className="bg-orange-200 hover:bg-orange:300 text-orange-500 hover:text-white px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
