const ProcessSection = () => {
  const steps = [
    {
      id: 1,
      title: "Discovery",
      description:
        "We start by understanding your business goals, target audience, and specific requirements through detailed consultation and research.",
      icon: "🔍",
    },
    {
      id: 2,
      title: "Strategy",
      description:
        "Our experts develop a customized strategy and roadmap that aligns with your objectives and maximizes conversion potential.",
      icon: "📋",
    },
    {
      id: 3,
      title: "Execute",
      description:
        "We implement the solution with precision, ensuring quality delivery while maintaining transparent communication throughout the process.",
      icon: "⚡",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Process Section
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Build confidence through transparency.
            <span className="block mt-2">
              Our streamlined process ensures clear communication and delivers
              results that exceed your expectations at every step.
            </span>
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={step.id} className="text-center relative">
              {/* Step Number */}
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-xl font-bold">
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
                  className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 z-0"
                  style={{ transform: "translateX(50%)" }}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Message */}
        <div className="text-center mt-16">
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Each step in our process is designed for maximum transparency and
            efficiency, ensuring you're always informed and confident in our
            approach.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
