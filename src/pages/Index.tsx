
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample product data
const productsData = [
  {
    id: "1",
    name: "Notion AI",
    tagline: "AI-powered writing assistant integrated with Notion",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
    upvotes: 452,
    comments: 87,
  },
  {
    id: "2",
    name: "Figma",
    tagline: "Collaborative interface design tool",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
    upvotes: 384,
    comments: 56,
  },
  {
    id: "3",
    name: "Raycast",
    tagline: "Productivity tool to replace your macOS Spotlight",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
    upvotes: 321,
    comments: 42,
  },
  {
    id: "4",
    name: "ChatGPT",
    tagline: "Conversational AI that can chat about anything",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
    upvotes: 298,
    comments: 63,
  },
  {
    id: "5",
    name: "VS Code",
    tagline: "Code editor redefined and optimized for building modern apps",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
    upvotes: 276,
    comments: 39,
  },
  {
    id: "6",
    name: "Midjourney",
    tagline: "AI-powered image generation from text descriptions",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
    upvotes: 265,
    comments: 51,
  },
  {
    id: "7",
    name: "Arc Browser",
    tagline: "The browser that blocks ads and respects privacy by default",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
    upvotes: 248,
    comments: 34,
  },
  {
    id: "8",
    name: "Supabase",
    tagline: "Open source Firebase alternative with PostgreSQL",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
    upvotes: 236,
    comments: 28,
  },
  {
    id: "9",
    name: "Vercel",
    tagline: "Platform for frontend frameworks and static sites",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
    upvotes: 219,
    comments: 32,
  },
  {
    id: "10",
    name: "Linear",
    tagline: "The issue tracking tool you'll enjoy using",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
    upvotes: 207,
    comments: 25,
  },
];

const Index = () => {
  const [products, setProducts] = useState(productsData);
  const [selectedTab, setSelectedTab] = useState("today");

  const handleUpvote = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1 }
          : product
      )
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        
        <section id="products" className="py-16 bg-muted/30">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                <FadeIn>
                  <Tabs defaultValue="today" className="mb-8">
                    <TabsList className="mb-2">
                      <TabsTrigger value="today" onClick={() => setSelectedTab("today")}>Today</TabsTrigger>
                      <TabsTrigger value="week" onClick={() => setSelectedTab("week")}>This Week</TabsTrigger>
                      <TabsTrigger value="month" onClick={() => setSelectedTab("month")}>This Month</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="today" className="mt-0">
                      <p className="text-sm text-muted-foreground mb-6">
                        Discover the best products launched today
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {products.slice(0, 6).map((product, index) => (
                          <ProductCard
                            key={product.id}
                            {...product}
                            handleUpvote={handleUpvote}
                            index={index}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="week" className="mt-0">
                      <p className="text-sm text-muted-foreground mb-6">
                        Top-rated products from this week
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {products.slice(2, 8).map((product, index) => (
                          <ProductCard
                            key={product.id}
                            {...product}
                            handleUpvote={handleUpvote}
                            index={index}
                          />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="month" className="mt-0">
                      <p className="text-sm text-muted-foreground mb-6">
                        Best products launched in the past month
                      </p>
                      <div className="grid grid-cols-1 gap-4">
                        {products.slice(4, 10).map((product, index) => (
                          <ProductCard
                            key={product.id}
                            {...product}
                            handleUpvote={handleUpvote}
                            index={index}
                          />
                        ))}
                      </div>
                    </TabsContent>
                  </Tabs>
                </FadeIn>
              </div>
              
              {/* Sidebar */}
              <Sidebar />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
