import React from "react";
import Image from "next/image";

const StayInTheLoop = () => {
  return (
    <div className="relative h-[50vh] xl:h-[50vh] bg-slate-50">
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white mx-12 xl:mx-24">
        <h1 className="text-xl xl:text-6xl  font-bold pb-4">
          <span className="text-black italic">STAY IN THE LOOP</span>
        </h1>
        <p className=" text-black">
          Be the first to hear about our new drops when you sign up for
          exclusive access, discounts and so much more.
        </p>
        <textarea
          name="email"
          id="email"
          className="border-black border rounded-md my-4  w-64"
        ></textarea>
        <button className="px-6 py-3 bg-white text-black rounded hover:bg-black hover:text-white">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default StayInTheLoop;
