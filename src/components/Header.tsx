
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown, Settings, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";
import Button from "./common/Button";
import { NotificationBell } from "./user/NotificationCenter";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SearchCommand } from "./search/SearchCommand";

// Simulated auth state - replace with real auth state management
const simulatedUser = {
  isLoggedIn: false, // Change to true to test logged in state
  name: "Sarah Johnson",
  username: "sarahj",
  avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&q=80&w=200&h=200",
};

// Simulated products data for search
const sampleProducts = [
  {
    id: "1",
    name: "Notion AI",
    tagline: "AI-powered writing assistant integrated with Notion",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
    categories: ["AI Tools", "Productivity", "Writing"],
    platforms: ["Web", "iOS", "Android", "macOS", "Windows"],
  },
  {
    id: "2",
    name: "Figma",
    tagline: "Collaborative interface design tool",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
    categories: ["Design Tools", "Collaboration", "Prototyping"],
    platforms: ["Web", "macOS", "Windows"],
  },
  // More products would be here in a real app
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isLoggedIn } = simulatedUser;

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
            <span className="hidden sm:inline">Notabletools</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" label="Home" />
            <NavLink to="/popular" label="Popular" />
            <NavLink to="/newest" label="Newest" />
            <NavLink to="/topics" label="Topics" hasDropdown />
          </nav>

          {/* Desktop Right Section */}
          <div className="hidden md:flex items-center space-x-2">
            <SearchCommand products={sampleProducts} />
            
            {isLoggedIn ? (
              <>
                <NotificationBell />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center rounded-full overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-orange">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={simulatedUser.avatar} alt={simulatedUser.name} />
                        <AvatarFallback>{simulatedUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>
                      <div className="flex flex-col">
                        <span>{simulatedUser.name}</span>
                        <span className="text-muted-foreground text-xs">@{simulatedUser.username}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/profile" className="flex items-center gap-2 cursor-pointer">
                        <User className="h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/settings" className="flex items-center gap-2 cursor-pointer">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Sign In</Link>
                </Button>
                <Button variant="primary" size="sm" asChild>
                  <Link to="/login?signup=true">Sign Up</Link>
                </Button>
              </>
            )}
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
          <div className="mb-4">
            <SearchCommand products={sampleProducts} />
          </div>
          
          <nav className="flex flex-col space-y-4 mb-8">
            <MobileNavLink to="/" label="Home" onClick={toggleMenu} />
            <MobileNavLink to="/popular" label="Popular" onClick={toggleMenu} />
            <MobileNavLink to="/newest" label="Newest" onClick={toggleMenu} />
            <MobileNavLink to="/topics" label="Topics" onClick={toggleMenu} />
          </nav>
          <div className="flex flex-col space-y-3 mt-auto">
            {isLoggedIn ? (
              <>
                <div className="flex items-center gap-3 py-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={simulatedUser.avatar} alt={simulatedUser.name} />
                    <AvatarFallback>{simulatedUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium">{simulatedUser.name}</div>
                    <div className="text-sm text-muted-foreground">@{simulatedUser.username}</div>
                  </div>
                </div>
                <Button variant="outline" fullWidth asChild>
                  <Link to="/profile" onClick={toggleMenu}>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </Link>
                </Button>
                <Button variant="outline" fullWidth asChild>
                  <Link to="/settings" onClick={toggleMenu}>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </Link>
                </Button>
                <Button variant="destructive" fullWidth>
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" fullWidth asChild>
                  <Link to="/login" onClick={toggleMenu}>
                    Sign In
                  </Link>
                </Button>
                <Button variant="primary" fullWidth asChild>
                  <Link to="/login?signup=true" onClick={toggleMenu}>
                    Sign Up
                  </Link>
                </Button>
              </>
            )}
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
