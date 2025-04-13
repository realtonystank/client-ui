import { Button } from "@/components/ui/button";
import Image from "next/image";
import ProductList from "./components/product-list";
import { Suspense } from "react";
import ProductSkeleton from "./components/product-skeleton";
import { searchType } from "@/lib/types";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<searchType>;
}) {
  return (
    <>
      <section className="bg-white flex justify-center py-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black font-sans leading-tight">
              Super Delicious Pizza in
              <span className="text-primary block ">Only 45 minutes!</span>
            </h1>
            <p className="text-base sm:text-lg lg:text-2xl mt-4 sm:mt-6 max-w-lg leading-snug">
              Enjoy a free meal if your order takes more than 45 mintues
            </p>
            <Button className="mt-6 sm:mt-8 text-base sm:text-lg rounded-full py-4 sm:py-5 px-6 font-bold">
              Get your pizza now
            </Button>
          </div>
          <div>
            <Image
              alt="pizza-main"
              src={"/pizza-main.png"}
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>
      <Suspense fallback={<ProductSkeleton />}>
        <ProductList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
