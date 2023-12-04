import React from "react";
import Navbar from "../../../UI/Navbar/Navbar";

import ArticleSection from "./ArticleSection";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import FeaturesSection from "./FeaturesSection";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <ArticleSection />
    </>
  );
};

export default Homepage;
