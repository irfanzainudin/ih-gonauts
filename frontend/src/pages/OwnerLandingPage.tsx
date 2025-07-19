import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Button } from "../components/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/shared/ui/card";
import { Badge } from "../components/shared/ui/badge";
import Footer from "../components/landing/Footer";

const OwnerLandingPage = () => {
  const navigate = useNavigate();
  const [animatedStats, setAnimatedStats] = useState<(number | string)[]>([
    0, 0, 0, 0,
  ]);
  const statsRef = useRef<HTMLDivElement>(null);

  // Animation hook for counting up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start animation when stats section comes into view
            const targetValues = [35, 90, 100, 0]; // 24/7 will be handled separately
            const duration = 1000; // 1 second
            const steps = 30;
            const stepDuration = duration / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
              currentStep++;
              const progress = currentStep / steps;

              setAnimatedStats(
                targetValues.map((target, index) => {
                  if (index === 3) {
                    // Cool animation for "24/7" - show random numbers then settle to 24/7
                    if (progress < 0.9) {
                      // Show random numbers during animation
                      const randomHours = Math.floor(Math.random() * 24) + 1;
                      const randomMinutes = Math.floor(Math.random() * 7) + 1;
                      return `${randomHours}/${randomMinutes}`;
                    } else {
                      // Final value
                      return "24/7";
                    }
                  }
                  return Math.floor(target * progress);
                })
              );

              if (currentStep >= steps) {
                clearInterval(interval);
              }
            }, stepDuration);

            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const ownerBenefits = [
    {
      icon: "💰",
      title: "Maximize Revenue",
      description:
        "Increase occupancy rates and earn more from your spaces with dynamic pricing and automated management.",
    },
    {
      icon: "🔐",
      title: "Secure Access Control",
      description:
        "IOTA-powered access management eliminates physical keys and provides audit trails for all entries.",
    },
    {
      icon: "📊",
      title: "Analytics & Insights",
      description:
        "Real-time dashboards showing booking patterns, revenue metrics, and space utilization data.",
    },
    {
      icon: "⚡",
      title: "Automated Operations",
      description:
        "Reduce administrative overhead with automated booking confirmations, payments, and access management.",
    },
  ];

  const stats = [
    { number: "35%", label: "Average Revenue Increase" },
    { number: "90%", label: "Reduction in Admin Time" },
    { number: "100%", label: "Contactless Access" },
    { number: "24/7", label: "Automated Operations" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 to-blue-600 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <Badge variant="secondary" className="bg-white/20 text-white mb-6">
              For Space Owners & Property Managers
            </Badge>

            <h1 className="text-4xl lg:text-6xl font-bold mb-6">
              List Your Space on
              <span className="block">SharedSpace.my</span>
            </h1>

            <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Transform your space into a revenue-generating asset with
              blockchain-powered access management. Join Malaysia's leading
              platform for space sharing.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 px-8"
                onClick={() => navigate("/owner/list-space")}
              >
                List Your Space
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/20 px-8 bg-transparent"
                onClick={() => navigate("/owner/dashboard")}
              >
                Owner Dashboard
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" ref={statsRef}>
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  {typeof animatedStats[index] === "number"
                    ? `${animatedStats[index]}%`
                    : animatedStats[index]}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose SharedSpace.my?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Join hundreds of space owners who are maximizing their revenue
              with our IOTA-powered platform.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {ownerBenefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="text-3xl">{benefit.icon}</div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Setup Process
            </h2>
            <p className="text-lg text-gray-600">
              Get your space online in minutes, not days
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "List Your Space",
                description:
                  "Upload photos, set pricing, and add amenities. Our smart system helps optimize your listing.",
              },
              {
                step: "2",
                title: "Install Access Control",
                description:
                  "We provide IOTA-powered smart locks and access devices for seamless, secure entry management.",
              },
              {
                step: "3",
                title: "Start Earning",
                description:
                  "Receive bookings instantly, get paid automatically, and monitor your space remotely through our dashboard.",
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-purple-600 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            Join the future of space management with IOTA blockchain technology
          </p>
          <Button
            size="lg"
            className="bg-white text-purple-600 hover:bg-purple-50 px-8"
            onClick={() => navigate("/owner/list-space")}
          >
            Get Started Today
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer showUserCTA={false} />
    </div>
  );
};

export default OwnerLandingPage;
