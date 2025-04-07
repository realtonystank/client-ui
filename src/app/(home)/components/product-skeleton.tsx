import { SkeletonCard } from "@/components/skeleton-card";
import React from "react";

const ProductSkeleton = () => {
  return (
    <section className="container mx-auto flex justify-center mt-10">
      <div className="grid grid-cols-4 gap-6">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </section>
  );
};

export default ProductSkeleton;
