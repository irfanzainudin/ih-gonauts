import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";

const Topbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLandingPage = location.pathname === "/";
  const isBookingPage = location.pathname.startsWith("/booking");
  const isOwnerPage = location.pathname.startsWith("/owner");

  const navLinks = [
    { name: "Spaces", href: "#spaces" },
    { name: "How it Works", href: "#how-it-works" },
    { name: "About", href: "#about" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Benefits", href: "#benefits" },
    { name: "FAQs", href: "#faqs" },
  ];

  const ownerNavLinks = [
    { name: "List Space", href: "/owner/list-space" },
    { name: "Dashboard", href: "/owner/dashboard" },
    { name: "Analytics", href: "/owner/analytics" },
    { name: "Support", href: "/owner/support" },
  ];

  const handleNavClick = (href: string) => {
    if (href.startsWith("/")) {
      // It's a route
      navigate(href);
    } else if (!isLandingPage) {
      // If not on landing page, navigate to landing first, then scroll
      navigate("/");
      setTimeout(() => {
        document
          .getElementById(href.substring(1))
          ?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      // If on landing page, just scroll
      document
        .getElementById(href.substring(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleConnectWallet = () => {
    // Always handle IOTA wallet connection regardless of page
    console.log("Connecting IOTA wallet...");
    alert("IOTA wallet connection will be implemented here!");
  };

  const handleUserTypeSwitch = () => {
    if (isOwnerPage) {
      navigate("/"); // Go to user landing page
    } else {
      navigate("/owner"); // Go to owner landing page
    }
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <button
                onClick={() => navigate(isOwnerPage ? "/owner" : "/")}
                className="flex items-center space-x-2"
                aria-label="SharedSpace.my Home"
              >
                <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-white text-sm font-bold">S</span>
                </div>
                <span className="text-xl font-bold text-gray-900">
                  SharedSpace.my
                  {isOwnerPage && (
                    <span className="text-sm text-purple-600 ml-1">
                      for Owners
                    </span>
                  )}
                </span>
              </button>
            </div>
          </div>

          {/* Navigation Links - Landing page only */}
          {isLandingPage && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200"
                    tabIndex={0}
                    aria-label={link.name}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Owner Navigation Links */}
          {isOwnerPage && (
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {ownerNavLinks.map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors duration-200"
                    tabIndex={0}
                    aria-label={link.name}
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Back to Main Site - Only show on booking pages */}
          {isBookingPage && (
            <div className="hidden md:block">
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="mr-4"
              >
                ← Back to Home
              </Button>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="flex items-center space-x-4">
            {/* User Type Switch */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleUserTypeSwitch}
              className="hidden sm:flex"
            >
              {isOwnerPage ? "Book Spaces" : "List Your Space"}
            </Button>

            {/* Connect Wallet */}
            <Button
              size="sm"
              className="bg-blue-600 text-white hover:bg-blue-700"
              tabIndex={0}
              aria-label="Connect IOTA Wallet"
              onClick={handleConnectWallet}
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
