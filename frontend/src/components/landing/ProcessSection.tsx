const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Browse & Book",
      description:
        "Discover available spaces near you, compare prices and amenities, then book instantly through our intuitive platform. Filter by location, time, and specific requirements.",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Secure Access",
      description:
        "Get seamless, contactless access using IOTA Identity verification. Your digital identity is securely managed through our blockchain-powered access control system.",
      icon: "🔐",
    },
    {
      id: 3,
      title: "Earn Rewards",
      description:
        "Automatically earn IOTA tokens through our Gas Station loyalty program. Redeem rewards for future bookings, exclusive perks, and premium space upgrades.",
      icon: "💰",
    },
  ];

  return (
    <section id="how-it-works" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            How SharedSpace.my Works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience the future of space booking and access management.
            <span className="block mt-2">
              Our streamlined process combines cutting-edge IOTA technology with
              user-friendly design for a seamless booking experience.
            </span>
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center relative">
              {/* Step Number */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                  {step.id}
                </div>
              </div>

              {/* Icon */}
              <div className="text-4xl mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>

              {/* Connector Line (except for last item) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-blue-200 z-0"
                  style={{ transform: "translateX(50%)" }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Built on IOTA's distributed ledger technology, ensuring secure,
            decentralized access management while rewarding your continued
            engagement with our platform.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
