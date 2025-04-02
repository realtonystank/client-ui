import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

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
        <div className="container flex  items-center px-35 py-10">
          <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="pizza">Pizza</TabsTrigger>
              <TabsTrigger value="beverages">Beverages</TabsTrigger>
            </TabsList>
            <TabsContent value="pizza">Pizza list</TabsContent>
            <TabsContent value="beverages">Beverages</TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
