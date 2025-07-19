import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../shared/ui/button";
import { Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../shared/ui/dropdown-menu";
import WalletConnectButton from "../wallet/WalletConnectButton";

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

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden xl:flex items-center space-x-8">
            {/* Navigation Links - Landing page */}
            {isLandingPage && (
              <>
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
              </>
            )}

            {/* Owner Navigation Links */}
            {isOwnerPage && (
              <>
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
              </>
            )}

            {/* Back to Main Site */}
            {isBookingPage && (
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="mr-4"
              >
                ← Back to Home
              </Button>
            )}
          </div>

          {/* CTA Buttons and Mobile Menu */}
          <div className="flex items-center">
            {/* User Type Switch - Desktop Only */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleUserTypeSwitch}
              className="hidden xl:flex mr-4"
            >
              {isOwnerPage ? "Book Spaces" : "List Your Space"}
            </Button>

            {/* Connect Wallet */}
            <WalletConnectButton />

            {/* Mobile Menu */}
            <div className="xl:hidden ml-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  {/* Landing Page Mobile Menu */}
                  {isLandingPage && (
                    <>
                      {navLinks.map((link) => (
                        <DropdownMenuItem
                          key={link.name}
                          onClick={() => handleNavClick(link.href)}
                          className="cursor-pointer"
                        >
                          {link.name}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={handleUserTypeSwitch}
                        className="cursor-pointer"
                      >
                        List Your Space
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* Owner Page Mobile Menu */}
                  {isOwnerPage && (
                    <>
                      {ownerNavLinks.map((link) => (
                        <DropdownMenuItem
                          key={link.name}
                          onClick={() => handleNavClick(link.href)}
                          className="cursor-pointer"
                        >
                          {link.name}
                        </DropdownMenuItem>
                      ))}
                      <DropdownMenuItem
                        onClick={handleUserTypeSwitch}
                        className="cursor-pointer"
                      >
                        Book Spaces
                      </DropdownMenuItem>
                    </>
                  )}

                  {/* Booking Page Mobile Menu */}
                  {isBookingPage && (
                    <>
                      <DropdownMenuItem
                        onClick={() => navigate("/")}
                        className="cursor-pointer"
                      >
                        ← Back to Home
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={handleUserTypeSwitch}
                        className="cursor-pointer"
                      >
                        List Your Space
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
