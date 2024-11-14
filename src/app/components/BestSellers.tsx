import React from "react";

import CatalogCards from "./CatalogCards";

const BestSellers = () => {
  return (
    <div className="mx-24">
      <div className="py-12 xl:py-24  xl:flex justify-start flex-col xl:gap-2 gap-0 mx-12">
        <h1 className="text-4xl font-semibold">Best Sellers</h1>
        <div className="bg-black w-32 h-2 flex"></div>
      </div>

      <CatalogCards />
    </div>
  );
};

export default BestSellers;
