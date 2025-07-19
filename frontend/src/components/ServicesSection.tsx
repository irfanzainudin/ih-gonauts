import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "Service 1",
      description:
        "Comprehensive solution designed to streamline your workflow and enhance productivity with cutting-edge technology.",
      icon: "📊",
    },
    {
      id: 2,
      title: "Service 2",
      description:
        "Advanced analytics and reporting tools that provide deep insights into your business performance and growth opportunities.",
      icon: "🚀",
    },
    {
      id: 3,
      title: "Service 3",
      description:
        "Expert consultation services with personalized strategies tailored to meet your specific business needs and objectives.",
      icon: "💡",
    },
    {
      id: 4,
      title: "Service 4",
      description:
        "24/7 support and maintenance services ensuring your systems run smoothly with minimal downtime and maximum efficiency.",
      icon: "🛠️",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Services Section
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Present what you offer - simply and directly.
            <span className="block mt-2">
              We are here with clarity and transparency that helps customers
              understand our offerings with more ease.
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
                  aria-label={`Learn more about ${service.title}`}
                >
                  Learn More
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
