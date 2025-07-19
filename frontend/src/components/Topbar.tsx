import { Button } from "@/components/ui/button";

const Topbar = () => {
  const navLinks = [
    { name: "About", href: "#" },
    { name: "How it Works", href: "#" },
    { name: "Why it's Great", href: "#" },
    { name: "Pricing", href: "#" },
    { name: "FAQs", href: "#" },
  ];

  return (
    <nav className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-black"></div>
                <span className="text-xl font-bold text-gray-900">Nav Bar</span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200"
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
              className="bg-black text-white hover:bg-gray-800"
              tabIndex={0}
              aria-label="Get Started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
