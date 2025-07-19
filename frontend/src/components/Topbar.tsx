import { Button } from "@/components/ui/button";

const Topbar = () => {
  const navLinks = [
    { name: "Spaces", href: "#spaces" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Benefits", href: "#benefits" },
    { name: "FAQs", href: "#faqs" },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <a
                href="#home"
                className="flex items-center space-x-2"
                aria-label="SharedSpace.my Home"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  SharedSpace.my
                </span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                  tabIndex={0}
                  aria-label={link.name}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
              tabIndex={0}
              aria-label="Connect IOTA Wallet"
              onClick={() =>
                document
                  .getElementById("spaces")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
