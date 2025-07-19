import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const HeroSection = () => {
  const trustLogos = [
    "Company 1",
    "Company 2",
    "Company 3",
    "Company 4",
    "Company 5",
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="w-fit">
              Some with clarity and credibility.
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              High Converting Heading
              <span className="block">Comes Here</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg">
              Deliver ultra-fast-loading, high-converting landing pages that
              sell with AI precision while our team of experts seamlessly
              handles all the complex technical work behind the scenes.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8"
                tabIndex={0}
                aria-label="Get Started"
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8"
                tabIndex={0}
                aria-label="Learn More"
              >
                Learn More ↗
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">
                ALL THE COMPANIES USE US FOR THEIR NEEDS AND ACHIEVEMENTS WHILE
                ALL OTHERS CAN BENEFIT FROM US
              </p>
              <div className="flex flex-wrap items-center gap-6 opacity-60">
                {trustLogos.map((logo, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-300 rounded"></div>
                    <span className="text-sm font-medium text-gray-600">
                      {logo}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Visual/Image Placeholder */}
          <div className="relative">
            <div className="bg-gray-100 rounded-lg p-8 border">
              <div className="space-y-6">
                {/* Placeholder for testimonial/feature visual */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="h-4 bg-gray-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-24"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-4 bg-gray-300 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>

                <div className="pt-4">
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    Build trust through association.
                  </div>
                  <div className="text-sm text-gray-600">
                    Share with these logos of industry giants and gain trust
                    through association. Make visitors feel more comfortable
                    about you by showcasing your trusted.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
