import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Category, Product } from "@/lib/types";
import React from "react";
import ProductCard from "./product-card";

const ProductList = async () => {
  const categoryPromise = fetch(
    `${process.env.BACKEND_URL}/api/catalog/categories?perPage=100`,
    {
      next: {
        revalidate: 3600, // 1 hr
      },
    }
  );
  const productsPromise = fetch(
    `${process.env.BACKEND_URL}/api/catalog/products?perPage=10`
  );

  const [categoryResponse, productsResponse] = await Promise.all([
    categoryPromise,
    productsPromise,
  ]);
  if (!categoryResponse.ok) {
    throw new Error("Failed to fetch categories");
  }
  const categories = await categoryResponse.json();

  if (!productsResponse.ok) {
    throw new Error("Failed to fetch products");
  }
  const products = await productsResponse.json();
  console.log(products);

  console.log(categories);

  return (
    <section>
      <div className="mt-6">
        <Tabs
          defaultValue={categories?.data[0]?._id}
          className=" container mx-auto"
        >
          <TabsList className="grid  grid-cols-2">
            {categories.data.map((category: Category) => {
              return (
                <TabsTrigger
                  key={category._id}
                  value={category._id}
                  className="w-[100]"
                >
                  {category.name}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {categories.data.map((category: Category) => {
            return (
              <TabsContent
                key={category._id}
                value={category._id}
                className="mt-6"
              >
                <div className="grid grid-cols-4 gap-6">
                  {products.data
                    .filter(
                      (product: Product) => product.categoryId == category._id
                    )
                    .map((product: Product) => {
                      return (
                        <ProductCard
                          key={product._id}
                          product={product}
                          categoryName={category.name}
                        />
                      );
                    })}
                </div>
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
};

export default ProductList;
