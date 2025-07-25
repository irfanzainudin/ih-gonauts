const AboutSection = () => {
  const stats = [
    {
      percentage: "100%",
      label: "Secure Access",
      description:
        "of all space access managed through IOTA Identity verification, ensuring tamper-proof digital credentials and seamless entry.",
    },
    {
      percentage: "15%",
      label: "Average Savings",
      description:
        "cost reduction for space owners through automated access management and reduced administrative overhead with blockchain technology.",
    },
    {
      percentage: "24/7",
      label: "IOTA Network",
      description:
        "round-the-clock access to spaces powered by IOTA's feeless, scalable distributed ledger technology for instant transactions.",
    },
  ];

  return (
    <section id="about" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                About SharedSpace.my
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Revolutionizing shared space access through blockchain
                innovation.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are pioneering the future of digital access management for
                shared spaces in Malaysia. By leveraging IOTA's distributed
                ledger technology, we provide secure, decentralized access
                control that eliminates traditional barriers while creating new
                opportunities for space owners and users alike.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                🚀 Why It's Built on IOTA
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Zero transaction fees — bookings are feeless on-chain
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Secure identity with IOTA Identity</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Earn loyalty tokens effortlessly with every booking
                  </span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Green tech — energy-efficient, no mining needed</span>
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
                  <div className="text-4xl lg:text-5xl font-bold text-blue-600 w-32 flex-shrink-0 flex items-center justify-start">
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
