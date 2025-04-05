import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import ProductCard, { Product } from "./components/product-card";

const products: Product[] = [
  {
    id: "1",
    name: "Margharita Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 500,
  },
  {
    id: "2",
    name: "4 Seasons Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 600,
  },
  {
    id: "3",
    name: "Chicken Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 650,
  },
  {
    id: "4",
    name: "Farm house Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 650,
  },
  {
    id: "5",
    name: "Cheesy delight Pizza",
    description: "This is a very tasty pizza",
    image: "/pizza-main.png",
    price: 650,
  },
];

export default function Home() {
  return (
    <>
      <section className="bg-white flex justify-center py-10">
        <div className="container px-35 flex justify-between items-center">
          <div>
            <h1 className="text-7xl font-black font-sans leading-2">
              Super Delicious Pizza in
              <span className="text-primary block mt-15 ">
                Only 45 minutes!
              </span>
            </h1>
            <p className="text-2xl mt-12 max-w-lg leading-snug">
              Enjoy a free meal if your order takes more than 45 mintues
            </p>
            <Button className="mt-8 text-lg rounded-full py-7 px-6 font-bold">
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
      <section>
        <div className="mt-6">
          <Tabs defaultValue="pizza" className=" container mx-auto">
            <TabsList className="grid  grid-cols-2">
              <TabsTrigger value="pizza" className="w-[100]">
                Pizza
              </TabsTrigger>
              <TabsTrigger value="beverages" className="w-[100]">
                Beverages
              </TabsTrigger>
            </TabsList>
            <TabsContent value="pizza" className="mt-6">
              <div className="grid grid-cols-4 gap-6">
                {products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            </TabsContent>
            <TabsContent value="beverages" className="mt-6">
              {" "}
              <div className="grid grid-cols-4 gap-6">
                {products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
