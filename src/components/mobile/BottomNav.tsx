
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  Search, 
  PlusSquare, 
  Bookmark, 
  User, 
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BottomNav() {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Hide bottom nav when scrolling down, show when scrolling up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/popular", label: "Trending", icon: TrendingUp },
    { path: "/submit", label: "Submit", icon: PlusSquare },
    { path: "/collections", label: "Collections", icon: Bookmark },
    { path: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav 
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 bg-background border-t border-border md:hidden",
        "transition-transform duration-300 ease-in-out",
        isVisible ? "translate-y-0" : "translate-y-full"
      )}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full text-xs",
                "transition-colors duration-200 ease-in-out",
                isActive 
                  ? "text-brand-orange" 
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
