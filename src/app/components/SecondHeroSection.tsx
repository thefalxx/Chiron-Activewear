import React from "react";
import Image from "next/image";

const SecondHeroSection = () => {
  return (
    <div className="relative h-[50vh] xl:h-[50vh]">
      {" "}
      {/* Change height to half of the viewport */}
      <Image
        src="/assets/second-hero-banner.png"
        alt="Hero Background"
        layout="fill"
        objectFit="cover"
        className="z-0"
        quality={100} // Optional: Adjust quality to prevent blurriness
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white mx-12 xl:mx-24">
        <h1 className="text-xl xl:text-6xl  font-bold pb-4">
          <span className="text-black italic">UNI </span>VERSITY
          <span className="text-blue-500 italic">COOL</span>LECTION
        </h1>

        <button className="px-6 py-3 bg-white text-black rounded hover:bg-black hover:text-white">
          Learn More
        </button>
      </div>
    </div>
  );
};

export default SecondHeroSection;
