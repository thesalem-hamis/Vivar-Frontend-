import HeroSection from "@/components/home/HeroSection";
import BrandStatementSection from "@/components/home/BrandStatementSection";
import HowWeHelpSection from "@/components/home/HowWeHelpSection";

import LeadMagnetSection from "@/components/home/LeadMagnetSection";
import TrustSocialProofSection from "@/components/home/TrustSocialProofSection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import ClosingCTASection from "@/components/home/ClosingCTASection";
import Footer from "@/components/layout/Footer";
import PropertyCategory from "@/components/home/PropertyCategory";
import TestimonialsSection from "@/components/home/Testimonial";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <BrandStatementSection />
      <HowWeHelpSection />
      <PropertyCategory />
      {/* <FeaturedListingsSection /> this component should be the card component for search "see more properties" */}
      <LeadMagnetSection />
      <TrustSocialProofSection />
      <TestimonialsSection />
      <InsightsPreviewSection />
      <ClosingCTASection />

      <Footer />
    </div>
  );
};

export default HomePage;
