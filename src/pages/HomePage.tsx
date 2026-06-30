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
import Navbar from "@/components/layout/Navbar";
import PageNavbar from "@/components/layout/PageNavbar";
import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";
import Locations from "@/components/home/Locations";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      {/* <PageNavbar /> */}
      <Navbar />
      <BrandStatementSection />
      <FeaturedListingsSection /> 
      <HowWeHelpSection />
      <Locations />
      <LeadMagnetSection />
      <PropertyCategory />
      <TrustSocialProofSection />
      <TestimonialsSection />
      <InsightsPreviewSection />
      <ClosingCTASection />

      <Footer />
    </div>
  );
};

export default HomePage;