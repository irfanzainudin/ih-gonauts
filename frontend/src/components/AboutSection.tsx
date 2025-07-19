const AboutSection = () => {
  const stats = [
    {
      percentage: "95%",
      label: "Client Satisfaction",
      description:
        "of our clients report exceptional results and continued partnership with our services.",
    },
    {
      percentage: "300%",
      label: "Average ROI",
      description:
        "return on investment achieved by our clients within the first 6 months of implementation.",
    },
    {
      percentage: "24/7",
      label: "Support Available",
      description:
        "round-the-clock support ensuring your business never experiences downtime or delays.",
    },
  ];

  return (
    <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                About Company
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Show who you are and why it matters.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are a team of dedicated professionals with over a decade of
                experience in delivering cutting-edge solutions that drive real
                business growth. Our commitment to excellence and transparent
                communication has earned us the trust of hundreds of satisfied
                clients worldwide.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Why Choose Our Expertise?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Industry-leading expertise with proven track record
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>Transparent processes and clear communication</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-black rounded-full mt-2 flex-shrink-0"></div>
                  <span>Dedicated support team available around the clock</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column - Statistics */}
          <div className="grid gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg border shadow-sm"
              >
                <div className="flex items-center space-x-6">
                  <div className="text-4xl lg:text-5xl font-bold text-black">
                    {stat.percentage}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {stat.label}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {stat.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
