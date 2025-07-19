import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shared/ui/card";

const ServicesSection = () => {
  const navigate = useNavigate();

  const services = [
    {
      id: 1,
      title: "Sport Venue Booking",
      description:
        "Book badminton courts, futsal fields, basketball courts, and fitness centers. Secure access with IOTA identity verification and contactless entry systems.",
      icon: "🏀",
    },
    {
      id: 2,
      title: "Meeting & Coworking Spaces",
      description:
        "Reserve meeting rooms, hot desks, and private offices in premium coworking spaces. Perfect for professionals and remote teams across Malaysia.",
      icon: "💼",
    },
    {
      id: 3,
      title: "Event Access Management",
      description:
        "Streamlined access control for conferences, workshops, and private events. Blockchain-verified tickets and seamless entry management systems.",
      icon: "🎟️",
    },
    {
      id: 4,
      title: "Loyalty Rewards Program",
      description:
        "Earn IOTA tokens through our Gas Station loyalty program. Get rewarded for frequent bookings, referrals, and community engagement activities.",
      icon: "🏆",
    },
  ];

  return (
    <section id="spaces" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Comprehensive Space Solutions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From sports to business, we've got your space booking needs covered.
            <span className="block mt-2">
              Secure access management powered by IOTA blockchain technology
              with integrated loyalty rewards for every booking.
            </span>
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service.id}
              className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <CardHeader className="pb-4">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="text-3xl">{service.icon}</div>
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {service.title}
                  </CardTitle>
                </div>
              </CardHeader>

              <CardContent className="pb-6">
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>

              <CardFooter>
                <Button
                  variant="outline"
                  className="w-full"
                  tabIndex={0}
                  aria-label={`Explore ${service.title} options`}
                  onClick={() => navigate("/booking")}
                >
                  Explore Options
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
