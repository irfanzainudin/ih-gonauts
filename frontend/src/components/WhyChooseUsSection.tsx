import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WhyChooseUsSection = () => {
  const comparisons = [
    {
      others: "Generic one-size-fits-all solutions",
      us: "Customized strategies tailored to your specific business needs",
    },
    {
      others: "Limited communication and unclear timelines",
      us: "Transparent communication with regular updates and clear milestones",
    },
    {
      others: "Basic support during business hours only",
      us: "24/7 dedicated support team available whenever you need assistance",
    },
    {
      others: "Focus solely on project completion",
      us: "Long-term partnership focused on your continued success and growth",
    },
    {
      others: "Hidden fees and unclear pricing structure",
      us: "Transparent pricing with no hidden costs or surprise charges",
    },
  ];

  return (
    <section id="benefits" className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Us Section
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stand out from the competition.
            <span className="block mt-2">
              See the clear difference in our approach and understand why
              leading businesses choose us over the alternatives.
            </span>
          </p>
        </div>

        {/* Comparison Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* What Others Provide */}
          <Card className="border-red-200 bg-red-50">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-red-800 flex items-center justify-center space-x-2">
                <span>❌</span>
                <span>What Others Provide</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-red-200"
                >
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item.others}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* What We Provide */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-semibold text-green-800 flex items-center justify-center space-x-2">
                <span>✅</span>
                <span>What We Provide</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {comparisons.map((item, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-3 p-4 bg-white rounded-lg border border-green-200"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700 leading-relaxed">{item.us}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Bottom Message */}
        <div className="text-center">
          <div className="bg-white p-8 rounded-lg border shadow-sm max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              The Choice is Clear
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Don't settle for mediocre results when you can partner with a team
              that truly cares about your success. We go above and beyond to
              ensure every project delivers exceptional value and long-term
              growth for your business.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUsSection;
