import Footer from "@/components/layout/Footer";
import PageNavbar from "@/components/layout/PageNavbar";
import ContactHero from "@/components/contact/ContactHeroSection";
import ClosingCTASection from "@/components/home/ClosingCTASection";
import ContactPatner from "@/components/contact/ContactFormSection";
import ContactFAQSection from "@/components/contact/ContactFAQSection";

const ContactUsPage = () => {
  return (
    <div>
      <PageNavbar />
      <ContactHero />
      <ContactPatner />
      <ContactFAQSection />
      <ClosingCTASection />
      <Footer />
    </div>
  );
};

export default ContactUsPage;
