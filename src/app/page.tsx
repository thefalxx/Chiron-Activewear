import React from "react";

import HeroSection from "./components/HeroSection";
import FeaturedReleases from "./components/FeaturedReleases";
import SecondHeroSection from "./components/SecondHeroSection";
import BestSellers from "./components/BestSellers";
import Categories from "./components/Categories";
import StayInTheLoop from "./components/StayInTheLoop";

import Footer from "./components/common/Footer";
const Home = () => {
  return (
    <div>
      <HeroSection />
      <div className="py-12">
        <FeaturedReleases />
      </div>

      <div className="py-12">
        <SecondHeroSection />
      </div>

      <div className="py-12">
        <BestSellers />
      </div>

      <div className="py-12">
        <Categories />
      </div>

      <div>
        <StayInTheLoop />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
