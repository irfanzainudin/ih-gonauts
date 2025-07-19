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
      question: "How does the IOTA-powered access management work?",
      answer:
        "Our platform uses IOTA Identity and Wallet SDK to create secure, tamper-proof digital credentials. When you book a space, you receive a blockchain-verified access token that allows contactless entry. Your identity is verified through IOTA's distributed ledger, ensuring maximum security without compromising privacy.",
    },
    {
      id: "item-2",
      question: "What types of spaces can I book through SharedSpace.my?",
      answer:
        "You can book a wide variety of spaces including sport venues (badminton courts, futsal fields, basketball courts), meeting rooms, coworking spaces, private offices, event venues, and conference facilities. We're continuously expanding our network of partner spaces across Malaysia.",
    },
    {
      id: "item-3",
      question: "How does the IOTA Gas Station loyalty program work?",
      answer:
        "Every booking, referral, and platform engagement earns you IOTA tokens through our Gas Station integration. These tokens can be redeemed for future bookings, exclusive perks, premium space upgrades, or even transferred to your IOTA wallet. The more you use our platform, the more rewards you earn!",
    },
    {
      id: "item-4",
      question: "Is my personal data secure with blockchain technology?",
      answer:
        "Absolutely! IOTA's distributed ledger technology ensures your data is encrypted and decentralized. Unlike traditional systems, your personal information isn't stored in a single vulnerable location. Your digital identity credentials are tamper-proof and you maintain full control over your data privacy.",
    },
    {
      id: "item-5",
      question: "What if I can't access a space I've booked?",
      answer:
        "Our smart access system includes multiple backup verification methods. If you experience any technical issues, our 24/7 support team can remotely verify your booking and provide alternative access methods. We also offer instant refunds or rebooking options for any inconvenience.",
    },
    {
      id: "item-6",
      question:
        "Can space owners integrate their facilities with your platform?",
      answer:
        "Yes! We welcome space owners to join our network. Our IOTA-powered access management system integrates with existing security infrastructure while providing advanced analytics, automated payment processing, and reduced administrative overhead. Contact us to learn about partnership opportunities.",
    },
  ];

  return (
    <section id="faqs" className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about blockchain-powered space booking.
            <span className="block mt-2">
              Learn more about our IOTA integration, security features, and how
              to maximize your rewards through our platform.
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
                <AccordionTrigger className="px-6 py-4 text-left font-semibold text-gray-900 hover:text-blue-600 [&[data-state=open]>svg]:rotate-180">
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
            Need more information about IOTA integration or platform features?
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>📧 support@sharedspace.my</span>
            <span>•</span>
            <span>💬 Live chat available</span>
            <span>•</span>
            <span>📱 WhatsApp support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
