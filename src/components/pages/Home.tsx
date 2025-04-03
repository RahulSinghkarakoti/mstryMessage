"use client";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import HowItWorksSection from "./HowItWorksSection";
import DemoSection from "./DemoSection";
import TestimonialsSection from "./TestimonialsSection";
import PricingSection from "./PricingSection";
import LastSection from "./LastSection";

export default function Home() {
  return (
    <>
      {/* Main content */}
      <main className="flex-1">
        <HeroSection />

        <FeatureSection />

        <HowItWorksSection />

        <DemoSection />

        <TestimonialsSection />
        
        <PricingSection />

        <LastSection />
      </main>
    </>
  );
}
