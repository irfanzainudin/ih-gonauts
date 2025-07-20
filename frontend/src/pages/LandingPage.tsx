import HeroSection from "../components/landing/HeroSection";
import PopularPlacesSection from "../components/landing/PopularPlacesSection";
import ServicesSection from "../components/landing/ServicesSection";
import ProcessSection from "../components/landing/ProcessSection";
import AboutSection from "../components/landing/AboutSection";
import TestimonialSection from "../components/landing/TestimonialSection";
import WhyChooseUsSection from "../components/landing/WhyChooseUsSection";
import FAQSection from "../components/landing/FAQSection";
import Footer from "../components/landing/Footer";

const LandingPage = () => {
  return (
    <>
      <HeroSection />
      <PopularPlacesSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialSection />
      <WhyChooseUsSection />
      <FAQSection />
      <Footer />
    </>
  );
};

export default LandingPage;
