import React from "react";

import CategoryCards from "./CategoryCards";

const Categories = () => {
  return (
    <div className="mx-24">
      <div className="py-4 xl:py-24  xl:flex justify-start flex-col xl:gap-2 gap-0 mx-8 xl:mx-12">
        <h1 className="text-2xl xl:text-4xl font-semibold">Categories</h1>
        <div className="bg-black w-32 h-2 flex"></div>
      </div>

      <CategoryCards />
    </div>
  );
};

export default Categories;
