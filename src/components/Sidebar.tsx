
import { useState } from "react";
import { ChevronRight, ArrowRight, BellRing } from "lucide-react";
import Button from "./common/Button";
import FadeIn from "./animations/FadeIn";

const topics = [
  "AI Tools",
  "SaaS",
  "Developer Tools",
  "Marketing",
  "Productivity",
  "Design Tools",
  "ChatGPT",
];

const upcomingProducts = [
  {
    name: "DevMatrix",
    description: "All-in-one developer productivity suite",
    launchDate: "Tomorrow",
  },
  {
    name: "Quantum Analytics",
    description: "AI-powered data insights platform",
    launchDate: "In 3 days",
  },
  {
    name: "Designr",
    description: "Collaborative design workspace",
    launchDate: "Next week",
  },
];

const Sidebar = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Subscribed with: ${email}`); // Would be replaced with actual API call
    setEmail("");
  };

  return (
    <aside className="space-y-8 w-full lg:w-80 xl:w-96">
      {/* Trending Topics */}
      <FadeIn className="rounded-xl border border-border p-5 bg-white">
        <h3 className="font-medium text-lg mb-4">Trending Topics</h3>
        <div className="space-y-2">
          {topics.map((topic, index) => (
            <a
              key={topic}
              href="#"
              className="flex items-center justify-between py-2 px-3 rounded-md hover:bg-muted transition-colors group"
            >
              <span>{topic}</span>
              <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Newsletter Signup */}
      <FadeIn 
        delay={100} 
        className="rounded-xl border border-brand-orange/20 p-5 bg-gradient-to-b from-brand-light to-white"
      >
        <div className="flex gap-3 mb-3">
          <div className="bg-brand-orange/10 text-brand-orange rounded-md h-8 w-8 flex items-center justify-center">
            <BellRing className="h-4 w-4" />
          </div>
          <h3 className="font-medium text-lg">Daily Product Digest</h3>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Get the most exciting new products in your inbox every day.
        </p>
        <form onSubmit={handleSubscribe} className="space-y-2">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="w-full px-3 py-2 rounded-md border border-input bg-white/50 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            required
          />
          <Button
            type="submit"
            variant="primary"
            size="sm"
            icon={<ArrowRight className="h-4 w-4" />}
            iconPosition="right"
            fullWidth
          >
            Subscribe
          </Button>
        </form>
      </FadeIn>

      {/* Upcoming Products */}
      <FadeIn delay={200} className="rounded-xl border border-border p-5 bg-white">
        <h3 className="font-medium text-lg mb-4">Coming Soon</h3>
        <div className="space-y-4">
          {upcomingProducts.map((product, index) => (
            <div key={product.name} className="space-y-1">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{product.name}</h4>
                <span className="text-xs px-2 py-0.5 bg-muted rounded-full text-muted-foreground">
                  {product.launchDate}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                {product.description}
              </p>
            </div>
          ))}
        </div>
      </FadeIn>
    </aside>
  );
};

export default Sidebar;
