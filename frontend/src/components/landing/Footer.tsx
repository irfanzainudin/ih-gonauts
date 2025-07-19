import { useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { Separator } from "../shared/ui/separator";

interface FooterProps {
  showUserCTA?: boolean;
}

const Footer = ({ showUserCTA = true }: FooterProps) => {
  const navigate = useNavigate();

  const footerLinks = {
    platform: [
      { name: "Browse Spaces", href: "/booking", isRoute: true },
      { name: "List Your Space", href: "#", isRoute: false },
      { name: "Rewards Program", href: "#how-it-works", isRoute: false },
      { name: "IOTA Integration", href: "#how-it-works", isRoute: false },
    ],
    spaces: [
      { name: "Sport Venues", href: "/booking?type=sport", isRoute: true },
      {
        name: "Coworking Spaces",
        href: "/booking?type=coworking",
        isRoute: true,
      },
      { name: "Meeting Rooms", href: "/booking?type=meeting", isRoute: true },
      { name: "Event Venues", href: "/booking?type=event", isRoute: true },
    ],
    support: [
      { name: "Help Center", href: "#", isRoute: false },
      { name: "Contact Us", href: "#", isRoute: false },
      { name: "Access Issues", href: "#", isRoute: false },
      { name: "Terms & Conditions", href: "#", isRoute: false },
    ],
  };

  const handleLinkClick = (link: { href: string; isRoute: boolean }) => {
    if (link.isRoute) {
      navigate(link.href);
    } else if (link.href.startsWith("#")) {
      document
        .getElementById(link.href.substring(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      {/* Final CTA Section - Only show for users */}
      {showUserCTA && (
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-16 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Access Your Space?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of users who trust SharedSpace.my for secure,
              blockchain-powered space access. Start booking and earning IOTA
              rewards today!
            </p>
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8"
              tabIndex={0}
              aria-label="Start Booking Spaces"
              onClick={() => navigate("/booking")}
            >
              Start Booking
            </Button>
          </div>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-4 gap-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center space-x-2 mb-6">
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <span className="text-xl font-bold">SharedSpace.my</span>
              </div>
              <p className="text-gray-400 leading-relaxed mb-6">
                Revolutionizing shared space access through IOTA blockchain
                technology. Secure, decentralized, and rewarding space booking
                for the digital age.
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
                  aria-label="Telegram"
                >
                  <span className="text-xl">📱</span>
                </a>
              </div>
            </div>

            {/* Footer Links */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-3 gap-8">
                {/* Platform Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Platform</h3>
                  <ul className="space-y-3">
                    {footerLinks.platform.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => handleLinkClick(link)}
                          className="text-gray-400 hover:text-white transition-colors text-left"
                          tabIndex={0}
                          aria-label={link.name}
                        >
                          {link.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Spaces Links */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Spaces</h3>
                  <ul className="space-y-3">
                    {footerLinks.spaces.map((link) => (
                      <li key={link.name}>
                        <button
                          onClick={() => handleLinkClick(link)}
                          className="text-gray-400 hover:text-white transition-colors text-left"
                          tabIndex={0}
                          aria-label={link.name}
                        >
                          {link.name}
                        </button>
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
                        <button
                          onClick={() => handleLinkClick(link)}
                          className="text-gray-400 hover:text-white transition-colors text-left"
                          tabIndex={0}
                          aria-label={link.name}
                        >
                          {link.name}
                        </button>
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
              © 2024 SharedSpace.my. Built with IOTA technology. All rights
              reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors">
                IOTA Security
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
