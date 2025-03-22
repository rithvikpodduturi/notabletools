
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import Button from "./common/Button";
import FadeIn from "./animations/FadeIn";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -right-1/4 top-1/4 w-1/2 h-1/2 bg-gradient-to-l from-brand-orange/5 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute -left-1/4 top-3/4 w-1/2 h-1/2 bg-gradient-to-r from-brand-orange/5 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom max-w-5xl relative z-10">
        <FadeIn className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-bold text-balance">
            Discover the best new products,{" "}
            <span className="text-brand-orange">every day</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            A community-curated platform where you can discover, share, and
            upvote the most innovative and exciting tech products.
          </p>
          <div className="pt-4 flex items-center justify-center space-x-4">
            <Button size="lg">Discover Products</Button>
            <Button variant="outline" size="lg">
              Submit Your Product
            </Button>
          </div>
        </FadeIn>

        <FadeIn 
          delay={300} 
          className="pt-16 text-center"
        >
          <a
            href="#products"
            className="inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="mr-2">Scroll to discover</span>
            <div className="animate-bounce">
              <ArrowDown className="h-4 w-4" />
            </div>
          </a>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
