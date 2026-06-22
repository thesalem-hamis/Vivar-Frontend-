import AboutContent from "@/components/about/AboutContent";
import AboutHero from "@/components/about/AboutHeroSection";
import AboutWhatWeDo from "@/components/about/AboutWhatWeDo";
import Authoritybar from "@/components/about/AuthorityBar";
// import ClosingCTASection from "@/components/home/ClosingCTASection";
import Footer from "@/components/layout/Footer";
import PageNavbar from "@/components/layout/PageNavbar";

const AboutPage = () => {
  return (
    <div>
      <AboutHero />
      <PageNavbar/>
      <AboutContent />
      <AboutWhatWeDo />
      <Authoritybar />

      {/* <ClosingCTASection /> */}

      <Footer />
    </div>
  );
};

export default AboutPage;