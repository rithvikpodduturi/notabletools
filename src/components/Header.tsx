
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./common/Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-lg",
        scrolled
          ? "py-3 bg-white/80 shadow-sm"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-semibold text-xl"
          >
            <div className="bg-brand-orange text-white h-8 w-8 rounded-md flex items-center justify-center">
              P
            </div>
            <span className="hidden sm:inline">ProductHunt-like</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/popular" label="Popular" />
            <NavLink to="/newest" label="Newest" />
            <NavLink to="/topics" label="Topics" hasDropdown />
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-muted rounded-full transition-colors">
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
            <Button variant="ghost" size="sm">
              Sign In
            </Button>
            <Button variant="primary" size="sm">
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="p-2 md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 top-[60px] z-40 bg-white/95 backdrop-blur-sm md:hidden transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full p-6 pt-8">
          <nav className="flex flex-col space-y-4 mb-8">
            <MobileNavLink to="/" label="Home" onClick={toggleMenu} />
            <MobileNavLink to="/popular" label="Popular" onClick={toggleMenu} />
            <MobileNavLink to="/newest" label="Newest" onClick={toggleMenu} />
            <MobileNavLink to="/topics" label="Topics" onClick={toggleMenu} />
          </nav>
          <div className="flex flex-col space-y-3 mt-auto">
            <Button variant="outline" fullWidth>
              Sign In
            </Button>
            <Button variant="primary" fullWidth>
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

// Desktop Nav Link Component
const NavLink = ({
  to,
  label,
  hasDropdown = false,
}: {
  to: string;
  label: string;
  hasDropdown?: boolean;
}) => (
  <Link
    to={to}
    className="px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors flex items-center"
  >
    {label}
    {hasDropdown && <ChevronDown className="ml-1 h-4 w-4" />}
  </Link>
);

// Mobile Nav Link Component
const MobileNavLink = ({
  to,
  label,
  onClick,
}: {
  to: string;
  label: string;
  onClick: () => void;
}) => (
  <Link
    to={to}
    className="py-3 text-lg text-foreground hover:text-brand-orange transition-colors"
    onClick={onClick}
  >
    {label}
  </Link>
);

export default Header;
