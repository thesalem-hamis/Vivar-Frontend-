import HeroSection from "@/components/home/HeroSection";
import { BrandMetricsGrid } from "@/components/home/BrandMetricsMarquee";
import BrandStatementSection from "@/components/home/BrandStatementSection";
import HowWeHelpSection from "@/components/home/HowWeHelpSection";
import FeaturedListingsSection from "@/components/home/FeaturedListingsSection";
import LeadMagnetSection from "@/components/home/LeadMagnetSection";
import TrustSocialProofSection from "@/components/home/TrustSocialProofSection";
import InsightsPreviewSection from "@/components/home/InsightsPreviewSection";
import ClosingCTASection from "@/components/home/ClosingCTASection";
import Footer from "@/components/layout/Footer";

const HomePage = () => {
  return (
    <div>
      <HeroSection />

      <BrandMetricsGrid />

      <BrandStatementSection />

      <HowWeHelpSection />

      <FeaturedListingsSection />

      <LeadMagnetSection />

      <TrustSocialProofSection />

      <InsightsPreviewSection />

      <ClosingCTASection />

      <Footer />
    </div>
  );
};

export default HomePage;
