import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const Footer = () => {
  const footerLinks = {
    company: [
      { name: "About", href: "#" },
      { name: "Careers", href: "#" },
      { name: "Press", href: "#" },
      { name: "Blog", href: "#" },
    ],
    product: [
      { name: "Features", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "API", href: "#" },
      { name: "Documentation", href: "#" },
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact", href: "#" },
      { name: "Status", href: "#" },
      { name: "Terms & Conditions", href: "#" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Final CTA Section */}
      <div className="bg-black py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">CTA Heading</h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Close with confidence. Ready to transform your business with our
            proven solutions? Join hundreds of satisfied customers who trust us
            with their growth.
          </p>
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 px-8"
            tabIndex={0}
            aria-label="Get Started Now"
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-white"></div>
                <span className="text-xl font-bold">Company</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Building exceptional solutions that drive real business growth.
                Your success is our mission, and we're committed to delivering
                results that exceed expectations.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Facebook"
                >
                  <span className="text-xl">📘</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <span className="text-xl">🐦</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <span className="text-xl">💼</span>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <span className="text-xl">📷</span>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Company Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Company</h3>
                  <ul className="space-y-3">
                    {footerLinks.company.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                          tabIndex={0}
                          aria-label={link.name}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Product Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product</h3>
                  <ul className="space-y-3">
                    {footerLinks.product.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                          tabIndex={0}
                          aria-label={link.name}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Support Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Support</h3>
                  <ul className="space-y-3">
                    {footerLinks.support.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-gray-400 hover:text-white transition-colors"
                          tabIndex={0}
                          aria-label={link.name}
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-gray-700" />

      {/* Bottom Footer */}
      <div className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2024 Company Name. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
