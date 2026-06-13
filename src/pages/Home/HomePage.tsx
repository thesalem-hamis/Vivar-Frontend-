import AboutSection from "@/components/home/AboutSection"
import {BrandMetricsGrid}  from "@/components/home/BrandMetricsMarquee"
import HeroSection from "@/components/home/HeroSection"




const HomePage = () => {
  return (
    <div>
        <HeroSection />
        <AboutSection />
        <BrandMetricsGrid />
    </div>
  )
}

export default HomePage
