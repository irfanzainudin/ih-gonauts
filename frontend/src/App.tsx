import Topbar from "@/components/Topbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessSection from "@/components/ProcessSection";
import AboutSection from "@/components/AboutSection";
import TestimonialSection from "@/components/TestimonialSection";
import WhyChooseUsSection from "@/components/WhyChooseUsSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Topbar />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <TestimonialSection />
      <WhyChooseUsSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default App;
