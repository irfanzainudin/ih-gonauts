import { Card, CardContent, CardHeader, CardTitle } from "../shared/ui/card";

const WhyChooseUsSection = () => {
  const benefits = [
    {
      title: "Instant Booking",
      description:
        "Book spaces in real-time with instant confirmation. No waiting, no hassle.",
      icon: "⚡",
      highlight: "Book in seconds",
    },
    {
      title: "Secure Access",
      description:
        "Advanced digital access control means no physical keys or complicated check-ins.",
      icon: "🔐",
      highlight: "Contactless entry",
    },
    {
      title: "Earn Rewards",
      description:
        "Get loyalty points for every booking that you can use for discounts and perks.",
      icon: "🎁",
      highlight: "Every booking rewarded",
    },
    {
      title: "24/7 Support",
      description:
        "Round-the-clock customer support and automated assistance for any issues.",
      icon: "💬",
      highlight: "Always here to help",
    },
    {
      title: "Best Prices",
      description:
        "Competitive pricing with transparent fees. No hidden costs or surprise charges.",
      icon: "💰",
      highlight: "Fair & transparent",
    },
    {
      title: "Wide Selection",
      description:
        "From sports courts to meeting rooms - find exactly what you need across Malaysia.",
      icon: "🏢",
      highlight: "Every space type",
    },
  ];

  return (
    <section id="benefits" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose SharedSpace.my?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We make space booking simple, secure, and rewarding. Here's why
            thousands of users trust us with their space needs.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="bg-white border-0 shadow-sm hover:shadow-md transition-shadow duration-300 text-center"
            >
              <CardHeader className="pb-4">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {benefit.title}
                </CardTitle>
                <div className="text-sm text-blue-600 font-medium">
                  {benefit.highlight}
                </div>
              </CardHeader>

              <CardContent>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="bg-blue-50 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Powered by Advanced Technology
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Behind the scenes, we use cutting-edge blockchain technology
              (IOTA) to ensure your bookings are secure, your access is
              seamless, and your rewards are transparent. But you don't need to
              worry about the technical details - we handle all of that for you.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
