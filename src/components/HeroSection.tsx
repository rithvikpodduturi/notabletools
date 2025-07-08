
import { useState } from "react";
import { ArrowDown } from "lucide-react";
import Button from "./common/Button";
import FadeIn from "./animations/FadeIn";

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-tl from-primary/15 via-purple-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-indigo-500/10 to-primary/10 rounded-full blur-2xl"></div>
      </div>

      <div className="container-custom max-w-5xl relative z-10">
        <FadeIn className="text-center space-y-6 max-w-3xl mx-auto">
          <h1 className="font-bold text-balance bg-gradient-to-r from-primary via-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Discover remarkable tools that{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-primary bg-clip-text text-transparent">transform workflows</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join a curated community of innovators, builders, and creators discovering 
            cutting-edge tools that reshape how we work and create.
          </p>
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 text-white px-8 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              Explore Tools
            </Button>
            <Button variant="outline" size="lg" className="border-primary/30 text-primary hover:bg-primary/5 px-8 py-3 rounded-full">
              Share Your Creation
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
