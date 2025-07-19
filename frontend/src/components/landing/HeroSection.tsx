import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { Badge } from "../shared/ui/badge";

const HeroSection = () => {
  const navigate = useNavigate();

  const trustLogos = [
    "Sport Centers",
    "Coworking Hubs",
    "Meeting Rooms",
    "Event Venues",
  ];

  return (
    <section id="home" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="secondary" className="w-fit">
              Powered by IOTA Identity & Gas Station
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Secure, Decentralized
              <span className="block">Space Access Management</span>
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-600 max-w-lg">
              Book sport venues, meeting rooms, and coworking spaces with
              blockchain-powered access control. Earn loyalty rewards through
              IOTA Gas Station while enjoying seamless, secure access to shared
              spaces across Malaysia.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black text-white hover:bg-gray-800 px-8"
                tabIndex={0}
                aria-label="Start Booking Spaces"
                onClick={() => navigate("/booking")}
              >
                Book Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="px-8"
                tabIndex={0}
                aria-label="Learn About Access Management"
                onClick={() =>
                  document
                    .getElementById("how-it-works")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                How It Works ↗
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="pt-8">
              <p className="text-sm text-gray-500 mb-4">
                TRUSTED BY LEADING SPACES ACROSS MALAYSIA FOR SECURE ACCESS
                MANAGEMENT
              </p>
              <div className="flex flex-wrap items-center gap-6 opacity-60">
                {trustLogos.map((logo, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded"></div>
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
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 border">
              <div className="space-y-6">
                {/* Placeholder for booking interface */}
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm">🏢</span>
                  </div>
                  <div>
                    <div className="h-4 bg-blue-300 rounded w-32 mb-2"></div>
                    <div className="h-3 bg-blue-200 rounded w-24"></div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="h-4 bg-purple-300 rounded"></div>
                  <div className="h-4 bg-purple-200 rounded w-3/4"></div>
                  <div className="h-4 bg-purple-200 rounded w-1/2"></div>
                </div>

                <div className="pt-4">
                  <div className="text-lg font-semibold text-gray-700 mb-2">
                    IOTA-Powered Security
                  </div>
                  <div className="text-sm text-gray-600">
                    Experience next-generation access control with IOTA Identity
                    and Wallet SDK. Secure, decentralized, and seamless access
                    to all your booked spaces.
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
