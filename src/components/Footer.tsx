
import { Link } from "react-router-dom";
import { Github, Twitter, Linkedin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border bg-white/50 backdrop-blur-sm">
      <div className="container-custom py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 font-semibold text-xl mb-4">
              <div className="bg-brand-orange text-white h-8 w-8 rounded-md flex items-center justify-center">
                P
              </div>
              <span>Notabletools</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              A community of tool enthusiasts discovering and sharing the most innovative and notable tools.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-4">Products</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/popular" className="hover:text-foreground transition-colors">Popular</Link></li>
              <li><Link to="/newest" className="hover:text-foreground transition-colors">Newest</Link></li>
              <li><Link to="/rankings" className="hover:text-foreground transition-colors">Trending</Link></li>
              <li><Link to="/collections" className="hover:text-foreground transition-colors">Collections</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/submit" className="hover:text-foreground transition-colors">Submit Product</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Advertise</a></li>
              <li><Link to="/api-docs" className="hover:text-foreground transition-colors">Developer API</Link></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Maker Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Notabletools. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
