import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import Image from "next/image";
import React from "react";

import { Product } from "@/lib/types";
import ProductModal from "./product-modal";
import { getFromPrice } from "@/lib/utils";

// export type Product = {
//   id: string;
//   name: string;
//   description: string;
//   image: string;
//   price: number;
// };

type PropTypes = {
  product: Product;
  categoryName: string;
};

const ProductCard = ({ product, categoryName }: PropTypes) => {
  return (
    <Card className="border-none rounded-xl p-4 flex flex-col h-full">
      <CardHeader className="flex justify-center">
        <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center">
          <Image
            alt={"pizza-img"}
            src={product.image}
            width={150}
            height={150}
            className="w-24 sm:w-28 md:w-32 h-auto object-contain"
          />
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <h2 className="text-lg sm:text-xl font-bold">{product.name}</h2>
        <p className="mt-2 text-sm sm:text-base">{product.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center pt-4 mt-auto border-t">
        <p className="text-sm sm:text-base">
          <span className="text-gray-500">From&nbsp;&nbsp;&nbsp;</span>
          <span className="font-bold text-lg sm:text-xl">
            ₹{getFromPrice(product)}
          </span>
        </p>
        <ProductModal product={product} categoryName={categoryName} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
