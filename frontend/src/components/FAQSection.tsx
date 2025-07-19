import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQSection = () => {
  const faqs = [
    {
      id: "item-1",
      question: "How quickly can you deliver results?",
      answer:
        "We typically deliver initial results within 2-4 weeks, depending on the scope of your project. Our streamlined process ensures rapid implementation while maintaining the highest quality standards. Most clients see significant improvements in their metrics within the first month of partnership.",
    },
    {
      id: "item-2",
      question: "What makes your approach different from competitors?",
      answer:
        "Our approach combines cutting-edge technology with personalized service. We don't believe in one-size-fits-all solutions. Every strategy is custom-built for your specific business needs, backed by data-driven insights and supported by our 24/7 dedicated team.",
    },
    {
      id: "item-3",
      question: "Do you provide ongoing support after project completion?",
      answer:
        "Absolutely! We believe in long-term partnerships. Our support doesn't end when the project launches. We provide comprehensive post-launch support, regular performance monitoring, optimization recommendations, and are always available to help you scale and grow.",
    },
    {
      id: "item-4",
      question: "What if I'm not satisfied with the results?",
      answer:
        "We stand behind our work with a 100% satisfaction guarantee. If you're not completely satisfied with our results within the first 30 days, we'll work with you to make it right or provide a full refund. Your success is our success, and we're committed to delivering exceptional value.",
    },
    {
      id: "item-5",
      question: "How transparent is your pricing structure?",
      answer:
        "Complete transparency is core to our business model. We provide detailed, upfront pricing with no hidden fees or surprise charges. You'll know exactly what you're paying for and why. We also provide regular reports showing the ROI and value you're receiving from our services.",
    },
    {
      id: "item-6",
      question: "Can you work with businesses of any size?",
      answer:
        "Yes! We've successfully worked with startups, small businesses, and large enterprises. Our scalable solutions and flexible approach allow us to adapt to any business size and industry. Whether you're just starting out or looking to optimize an established operation, we have the expertise to help.",
    },
  ];

  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            FAQ Section
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Overcome hesitations before they block conversions.
            <span className="block mt-2">
              Get instant answers to the most common questions about our
              services, process, and commitment to your success.
            </span>
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="bg-gray-50 rounded-lg p-8">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={faq.id}
                className="bg-white rounded-lg border shadow-sm"
              >
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-black [&[data-state=open]>svg]:rotate-180">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-gray-600 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Still have questions? We're here to help.
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>📧 support@company.com</span>
            <span>•</span>
            <span>📞 (555) 123-4567</span>
            <span>•</span>
            <span>💬 Live chat available</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
