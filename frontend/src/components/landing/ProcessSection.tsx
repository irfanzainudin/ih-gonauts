import { Search, Calendar, DoorOpen } from "lucide-react";

const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Find Your Space",
      description:
        "Search by location, type, and date to discover available spaces. Use filters to find exactly what you need - from badminton courts to conference rooms.",
      icon: <Search className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 2,
      title: "Book Instantly",
      description:
        "Select your preferred time slot and complete booking in seconds. Get instant confirmation with all the details you need for your visit.",
      icon: <Calendar className="w-8 h-8 text-blue-600" />,
    },
    {
      id: 3,
      title: "Access & Enjoy",
      description:
        "Arrive at your booked time and access your space using our secure digital system. No keys, no complications - just walk in and enjoy your space.",
      icon: <DoorOpen className="w-8 h-8 text-blue-600" />,
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Booking a space has never been easier. Here's how you can find and
            access your perfect space in just a few simple steps.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connector Line - spans across all steps */}
          <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-blue-200 z-0"></div>

          {steps.map((step) => (
            <div key={step.id} className="text-center relative">
              {/* Step Number */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold relative z-10">
                  {step.id}
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-sm text-gray-600">
              Your booking comes with automatic loyalty rewards, secure access
              technology, and 24/7 support - all designed to make your space
              experience seamless and rewarding.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
