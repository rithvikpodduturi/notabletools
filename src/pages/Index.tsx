import { useState, useEffect, useRef, useCallback } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Sidebar from "@/components/Sidebar";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

// Sample product data
const initialProductsData = [
  {
    id: "1",
    name: "Notion AI",
    tagline: "AI-powered writing assistant integrated with Notion",
    description: "Notion AI is a writing assistant that helps you write better, faster, and more creatively. It's built right into Notion, so you can use it anywhere you write — from meeting notes and status updates to blog posts and creative stories. Notion AI can summarize long documents, improve your writing, translate languages, and even generate new content based on your prompts.",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
    upvotes: 452,
    comments: 87,
    url: "https://notion.so/ai",
    pricing: "Free trial, then $10/mo",
    platforms: ["Web", "iOS", "Android", "macOS", "Windows"],
    categories: ["Productivity", "AI", "Writing"],
    maker: {
      name: "Notion Labs",
      avatar: "https://ph-avatars.imgix.net/726329/original?auto=format&fit=crop&crop=faces&w=80&h=80",
    },
    images: [
      { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=600&h=400&q=80", alt: "Notion AI interface" },
      { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=600&h=400&q=80", alt: "Notion AI in action" },
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=600&h=400&q=80", alt: "Notion AI features" },
    ],
  },
  {
    id: "2",
    name: "Figma",
    tagline: "Collaborative interface design tool",
    description: "Figma is a cloud-based design tool that brings together design, prototyping, and collaboration in one platform. It helps teams create, test, and ship better designs from start to finish. Unlike other design tools, Figma is built for collaboration, making it easy for teams to work together in real time.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
    upvotes: 384,
    comments: 56,
    url: "https://figma.com",
    pricing: "Free plan, Pro from $12/mo",
    platforms: ["Web", "macOS", "Windows"],
    categories: ["Design", "Collaboration", "Prototyping"],
    maker: {
      name: "Figma Inc",
      avatar: "https://ph-avatars.imgix.net/1661271/original?auto=format&fit=crop&crop=faces&w=80&h=80",
    },
    images: [
      { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=600&h=400&q=80", alt: "Figma interface" },
      { src: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=600&h=400&q=80", alt: "Figma collaboration" },
      { src: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=600&h=400&q=80", alt: "Figma prototyping" },
    ],
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

// Generate more products for infinite scroll demonstration
const generateMoreProducts = (page: number, perPage: number = 6) => {
  const newProducts = [];
  for (let i = 0; i < perPage; i++) {
    const sourceProduct = initialProductsData[Math.floor(Math.random() * initialProductsData.length)];
    newProducts.push({
      ...sourceProduct,
      id: `generated-${page}-${i}`,
      name: `${sourceProduct.name} ${page}.${i}`,
      upvotes: Math.floor(Math.random() * 400) + 50,
      comments: Math.floor(Math.random() * 100),
    });
  }
  return newProducts;
};

const Index = () => {
  const [products, setProducts] = useState(initialProductsData);
  const [selectedTab, setSelectedTab] = useState("today");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useCallback((node: HTMLDivElement | null) => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadMore();
      }
    });
    
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const handleUpvote = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1 }
          : product
      )
    );
  };

  const loadMore = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const newProducts = generateMoreProducts(page);
      setProducts(prev => [...prev, ...newProducts]);
      setPage(prev => prev + 1);
      setIsLoading(false);
      
      // After loading 5 pages, stop infinite scroll for this demo
      if (page >= 5) {
        setHasMore(false);
      }
    }, 1000);
  };

  const handleViewProduct = (id: string) => {
    setSelectedProduct(id);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
  };

  const getSelectedProductDetails = () => {
    return products.find(product => product.id === selectedProduct) || null;
  };

  const getRelatedProducts = (currentId: string) => {
    return products
      .filter(product => product.id !== currentId)
      .slice(0, 3);
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
                        {products.map((product, index) => (
                          <div 
                            key={product.id} 
                            ref={index === products.length - 1 ? lastProductRef : null}
                          >
                            <ProductCard
                              {...product}
                              handleUpvote={handleUpvote}
                              handleViewProduct={handleViewProduct}
                              index={index}
                            />
                          </div>
                        ))}
                        
                        {isLoading && (
                          <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="rounded-xl overflow-hidden bg-white border border-border p-4">
                                <div className="flex">
                                  <Skeleton className="w-20 h-20 rounded-xl mr-4" />
                                  <div className="flex-1">
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-full mb-1" />
                                    <Skeleton className="h-4 w-2/3" />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        {!hasMore && !isLoading && (
                          <div className="text-center py-8 text-muted-foreground">
                            You've reached the end of the list
                          </div>
                        )}
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
                            handleViewProduct={handleViewProduct}
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
                            handleViewProduct={handleViewProduct}
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
      
      {/* Product detail modal */}
      {selectedProduct && (
        <ProductDetail
          {...getSelectedProductDetails()}
          relatedProducts={getRelatedProducts(selectedProduct)}
          onClose={handleCloseProductDetail}
          handleUpvote={handleUpvote}
        />
      )}
    </div>
  );
};

export default Index;

