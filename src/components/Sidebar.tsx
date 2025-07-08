
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
      <FadeIn className="rounded-2xl border border-primary/10 p-6 bg-gradient-to-br from-white via-primary/5 to-purple-500/5">
        <h3 className="font-semibold text-lg mb-5 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Trending Topics</h3>
        <div className="space-y-1">
          {topics.map((topic, index) => (
            <a
              key={topic}
              href="#"
              className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-primary/10 transition-all duration-200 group border border-transparent hover:border-primary/20"
            >
              <span className="font-medium text-sm">{topic}</span>
              <ChevronRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
            </a>
          ))}
        </div>
      </FadeIn>

      {/* Newsletter Signup */}
      <FadeIn 
        delay={100} 
        className="rounded-2xl border border-primary/20 p-6 bg-gradient-to-br from-primary/5 via-white to-purple-500/5 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-50"></div>
        <div className="relative z-10">
          <div className="flex gap-3 mb-4">
            <div className="bg-gradient-to-r from-primary to-purple-600 text-white rounded-xl h-10 w-10 flex items-center justify-center shadow-lg">
              <BellRing className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-lg bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">Daily Insights</h3>
              <p className="text-xs text-muted-foreground">Curated for creators</p>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
            Discover hand-picked tools and innovations delivered to your inbox every morning.
          </p>
          <form onSubmit={handleSubscribe} className="space-y-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border border-primary/20 bg-white/80 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/40 transition-all"
              required
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="h-4 w-4" />}
              iconPosition="right"
              fullWidth
              className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 rounded-xl py-3"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </FadeIn>

      {/* Upcoming Products */}
      <FadeIn delay={200} className="rounded-2xl border border-border/50 p-6 bg-white/80 backdrop-blur-sm">
        <h3 className="font-semibold text-lg mb-5 text-foreground">Coming Soon</h3>
        <div className="space-y-4">
          {upcomingProducts.map((product, index) => (
            <div key={product.name} className="p-4 rounded-xl bg-gradient-to-r from-muted/30 to-primary/5 border border-primary/10 hover:border-primary/20 transition-all duration-200 group">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{product.name}</h4>
                <span className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full font-medium">
                  {product.launchDate}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
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
