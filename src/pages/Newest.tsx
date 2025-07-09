import { useState, useEffect, useRef, useCallback } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Sidebar from "@/components/Sidebar";
import FadeIn from "@/components/animations/FadeIn";
import { Skeleton } from "@/components/ui/skeleton";
import { BottomNav } from "@/components/mobile/BottomNav";
import { cn } from "@/lib/utils";

// Sample product data sorted by newest first
const newestProductsData = [
  {
    id: "newest-1",
    name: "Claude AI",
    tagline: "Constitutional AI assistant for helpful, harmless, and honest conversations",
    description: "Claude is an AI assistant created by Anthropic to be helpful, harmless, and honest. It can assist with a wide variety of tasks including writing, analysis, math, coding, and creative projects.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&w=200&h=200&q=80",
    upvotes: 89,
    comments: 15,
    url: "https://claude.ai",
    pricing: "Free plan, Pro from $20/mo",
    platforms: ["Web"],
    categories: ["AI", "Productivity", "Writing"],
    maker: {
      name: "Anthropic",
      avatar: "https://ph-avatars.imgix.net/1661271/original?auto=format&fit=crop&crop=faces&w=80&h=80",
    },
    images: [
      { src: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&w=600&h=400&q=80", alt: "Claude AI interface" },
    ],
  },
  {
    id: "newest-2",
    name: "Cursor",
    tagline: "AI-powered code editor built for productivity",
    description: "Cursor is the AI-first code editor designed for maximum productivity. Built from the ground up to help developers write code faster with AI assistance.",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&w=200&h=200&q=80",
    upvotes: 156,
    comments: 23,
    url: "https://cursor.sh",
    pricing: "Free trial, Pro from $20/mo",
    platforms: ["Windows", "macOS", "Linux"],
    categories: ["Development", "AI", "Productivity"],
    maker: {
      name: "Anysphere",
      avatar: "https://ph-avatars.imgix.net/726329/original?auto=format&fit=crop&crop=faces&w=80&h=80",
    },
    images: [
      { src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&w=600&h=400&q=80", alt: "Cursor editor" },
    ],
  },
  {
    id: "newest-3",
    name: "Perplexity AI",
    tagline: "AI-powered search engine that provides direct answers",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&w=200&h=200&q=80",
    upvotes: 134,
    comments: 19,
  },
  {
    id: "newest-4",
    name: "Gamma",
    tagline: "AI-powered presentation and document creation tool",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&w=200&h=200&q=80",
    upvotes: 112,
    comments: 17,
  },
  {
    id: "newest-5",
    name: "Replit Agent",
    tagline: "AI coding assistant that builds applications from natural language",
    image: "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?auto=format&w=200&h=200&q=80",
    upvotes: 98,
    comments: 12,
  },
  {
    id: "newest-6",
    name: "Runway ML",
    tagline: "AI-powered creative tools for video, image, and audio generation",
    image: "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?auto=format&w=200&h=200&q=80",
    upvotes: 87,
    comments: 14,
  },
];

// Generate more products for infinite scroll
const generateMoreProducts = (page: number, perPage: number = 6) => {
  const newProducts = [];
  for (let i = 0; i < perPage; i++) {
    const sourceProduct = newestProductsData[Math.floor(Math.random() * newestProductsData.length)];
    newProducts.push({
      ...sourceProduct,
      id: `newest-generated-${page}-${i}`,
      name: `${sourceProduct.name} ${page}.${i}`,
      upvotes: Math.floor(Math.random() * 200) + 20,
      comments: Math.floor(Math.random() * 50),
    });
  }
  return newProducts;
};

const Newest = () => {
  const [products, setProducts] = useState(newestProductsData);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  
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
      
      // After loading 5 pages, stop infinite scroll
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
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow">        
        <section className="pt-24 pb-8 md:pt-28 md:pb-16 bg-muted/30">
          <div className="container-custom">
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                <FadeIn>
                  <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Newest Tools</h1>
                    <p className="text-sm text-muted-foreground mb-6">
                      Discover the latest tools just launched today
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
                                <Skeleton className={cn(
                                  "rounded-xl mr-4",
                                  isMobile ? "w-16 h-16" : "w-20 h-20"
                                )} />
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
                  </div>
                </FadeIn>
              </div>
              
              {/* Sidebar - hide on mobile */}
              {!isMobile && <Sidebar />}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Bottom Navigation - only on mobile */}
      <BottomNav />
      
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

export default Newest;