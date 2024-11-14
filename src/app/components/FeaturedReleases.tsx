import React from "react";
import CatalogCards from "./CatalogCards";

const FeaturedReleases = () => {
  return (
    <div className="mx-24">
      <div className="py-8 xl:py-24  xl:flex justify-start flex-col xl:gap-2 gap-0 mx-8 xl:mx-12">
        <h1 className="text-2xl xl:text-4xl font-semibold">
          Featured Releases
        </h1>
        <div className="bg-black w-32 h-1 xl:h-2 flex"></div>
      </div>

      <CatalogCards />
    </div>
  );
};

export default FeaturedReleases;
