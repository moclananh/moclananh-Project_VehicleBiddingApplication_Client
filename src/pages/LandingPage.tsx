import React from "react";
import HeroSection from "../components/hero-section/HeroSection";
import { FeaturesAsymmetrical } from "../components/feature-section/FeatureSection";
import { FaqWithHeader } from "../components/frequently-asked-section/FrequenlyAskedSection";

const LandingPage = () => {
  return (
    <section>
      <HeroSection />
      <FeaturesAsymmetrical />
      <FaqWithHeader />
    </section>
  );
};

export default LandingPage;
