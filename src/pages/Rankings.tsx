
import { useState, useEffect } from "react";
import { format, isToday, addDays, subDays } from "date-fns";
import { useNavigate, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Sidebar from "@/components/Sidebar";
import FadeIn from "@/components/animations/FadeIn";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CommentType } from "@/components/social/Comment";

// Sample data for past days
const rankingsData: {
  [key: string]: {
    date: string;
    products: Array<any>;
  };
} = {
  "2023-07-15": {
    date: "2023-07-15",
    products: [
      {
        id: "1",
        name: "Notion AI",
        tagline: "AI-powered writing assistant integrated with Notion",
        description: "Notion AI is a writing assistant that helps you write better, faster, and more creatively.",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
        upvotes: 452,
        comments: 87,
        url: "https://notion.so/ai",
        maker: {
          name: "Notion Labs",
          avatar: "https://ph-avatars.imgix.net/726329/original?auto=format&fit=crop&crop=faces&w=80&h=80",
        },
        hasUpvoted: false,
        commentData: [],
      },
      {
        id: "2",
        name: "Figma",
        tagline: "Collaborative interface design tool",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
        upvotes: 384,
        comments: 56,
        maker: {
          name: "Figma Inc",
          avatar: "https://ph-avatars.imgix.net/1661271/original?auto=format&fit=crop&crop=faces&w=80&h=80",
        },
        hasUpvoted: false,
        commentData: [],
      },
    ]
  },
  "2023-07-16": {
    date: "2023-07-16",
    products: [
      {
        id: "3",
        name: "Raycast",
        tagline: "Productivity tool to replace your macOS Spotlight",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
        upvotes: 321,
        comments: 42,
        hasUpvoted: false,
        commentData: [],
      },
      {
        id: "4",
        name: "ChatGPT",
        tagline: "Conversational AI that can chat about anything",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
        upvotes: 298,
        comments: 63,
        hasUpvoted: false,
        commentData: [],
      },
    ]
  },
  // Today's data (using current date)
  [format(new Date(), "yyyy-MM-dd")]: {
    date: format(new Date(), "yyyy-MM-dd"),
    products: [
      {
        id: "5",
        name: "VS Code",
        tagline: "Code editor redefined and optimized for building modern apps",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
        upvotes: 276,
        comments: 39,
        hasUpvoted: false,
        commentData: [],
      },
      {
        id: "6",
        name: "Midjourney",
        tagline: "AI-powered image generation from text descriptions",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
        upvotes: 265,
        comments: 51,
        hasUpvoted: false,
        commentData: [],
      },
      {
        id: "7",
        name: "Arc Browser",
        tagline: "The browser that blocks ads and respects privacy by default",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
        upvotes: 248,
        comments: 34,
        hasUpvoted: false,
        commentData: [],
      },
    ]
  }
};

// Sample data for weekly/monthly recaps
const recapData = {
  weekly: [
    {
      id: "8",
      name: "Supabase",
      tagline: "Open source Firebase alternative with PostgreSQL",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
      upvotes: 1236,
      comments: 128,
      hasUpvoted: false,
      commentData: [],
    },
    {
      id: "9",
      name: "Vercel",
      tagline: "Platform for frontend frameworks and static sites",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
      upvotes: 1119,
      comments: 132,
      hasUpvoted: false,
      commentData: [],
    },
  ],
  monthly: [
    {
      id: "10",
      name: "Linear",
      tagline: "The issue tracking tool you'll enjoy using",
      image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
      upvotes: 3207,
      comments: 225,
      hasUpvoted: false,
      commentData: [],
    },
    {
      id: "1",
      name: "Notion AI",
      tagline: "AI-powered writing assistant integrated with Notion",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
      upvotes: 2952,
      comments: 187,
      hasUpvoted: false,
      commentData: [],
    },
  ]
};

const Rankings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedDate, setSelectedDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [selectedView, setSelectedView] = useState<"daily" | "weekly" | "monthly">("daily");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  // Get date from URL or use today
  useEffect(() => {
    const dateParam = searchParams.get("date");
    if (dateParam && rankingsData[dateParam]) {
      setSelectedDate(dateParam);
    }
  }, [searchParams]);

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
    setSearchParams({ date: newDate });
  };

  const handlePreviousDay = () => {
    const prevDate = format(subDays(new Date(selectedDate), 1), "yyyy-MM-dd");
    handleDateChange(prevDate);
  };

  const handleNextDay = () => {
    const nextDate = format(addDays(new Date(selectedDate), 1), "yyyy-MM-dd");
    const today = format(new Date(), "yyyy-MM-dd");
    
    // Don't allow navigation to future dates
    if (nextDate <= today) {
      handleDateChange(nextDate);
    }
  };

  const handleUpvote = (id: string) => {
    // Handle upvote based on selected view
    if (selectedView === "daily" && rankingsData[selectedDate]) {
      const updatedProducts = rankingsData[selectedDate].products.map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1, hasUpvoted: true }
          : product
      ).sort((a, b) => b.upvotes - a.upvotes);
      
      rankingsData[selectedDate].products = updatedProducts;
    } else if (selectedView === "weekly") {
      const updatedProducts = [...recapData.weekly].map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1, hasUpvoted: true }
          : product
      );
      recapData.weekly = updatedProducts;
    } else if (selectedView === "monthly") {
      const updatedProducts = [...recapData.monthly].map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1, hasUpvoted: true }
          : product
      );
      recapData.monthly = updatedProducts;
    }
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
    if (selectedView === "daily" && rankingsData[selectedDate]) {
      return rankingsData[selectedDate].products.find(product => product.id === selectedProduct) || null;
    } else if (selectedView === "weekly") {
      return recapData.weekly.find(product => product.id === selectedProduct) || null;
    } else if (selectedView === "monthly") {
      return recapData.monthly.find(product => product.id === selectedProduct) || null;
    }
    return null;
  };

  const getRelatedProducts = (currentId: string) => {
    let products: any[] = [];
    
    if (selectedView === "daily" && rankingsData[selectedDate]) {
      products = rankingsData[selectedDate].products;
    } else if (selectedView === "weekly") {
      products = recapData.weekly;
    } else if (selectedView === "monthly") {
      products = recapData.monthly;
    }
    
    return products
      .filter(product => product.id !== currentId)
      .slice(0, 3);
  };

  const renderTopThreeBadge = (index: number) => {
    if (index > 2) return null;
    
    const badgeColors = [
      "bg-yellow-500", // Gold for #1
      "bg-gray-300",   // Silver for #2
      "bg-amber-600",  // Bronze for #3
    ];
    
    return (
      <div className={`absolute top-4 right-4 ${badgeColors[index]} rounded-full w-8 h-8 flex items-center justify-center text-white shadow-md`}>
        <Trophy className="h-4 w-4" />
      </div>
    );
  };

  const renderProductList = () => {
    let products: any[] = [];
    
    if (selectedView === "daily" && rankingsData[selectedDate]) {
      products = rankingsData[selectedDate].products;
    } else if (selectedView === "weekly") {
      products = recapData.weekly;
    } else if (selectedView === "monthly") {
      products = recapData.monthly;
    }
    
    if (products.length === 0) {
      return (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No products for this date.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-4">
        {products.map((product, index) => (
          <div key={product.id} className="relative">
            <ProductCard
              {...product}
              handleUpvote={handleUpvote}
              handleViewProduct={handleViewProduct}
              index={index}
              hasUpvoted={product.hasUpvoted}
            />
            {selectedView === "daily" && renderTopThreeBadge(index)}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Product Rankings</h1>
              <p className="text-muted-foreground">
                Discover the best products ranked by the community
              </p>
            </div>
            
            <div className="mb-8 flex flex-wrap gap-4">
              <Button
                variant={selectedView === "daily" ? "default" : "outline"}
                onClick={() => setSelectedView("daily")}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Daily
              </Button>
              <Button
                variant={selectedView === "weekly" ? "default" : "outline"}
                onClick={() => setSelectedView("weekly")}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Weekly Recap
              </Button>
              <Button
                variant={selectedView === "monthly" ? "default" : "outline"}
                onClick={() => setSelectedView("monthly")}
                className="gap-2"
              >
                <Calendar className="h-4 w-4" />
                Monthly Recap
              </Button>
            </div>
            
            {selectedView === "daily" && (
              <div className="mb-8 flex items-center justify-between">
                <Button
                  variant="outline"
                  onClick={handlePreviousDay}
                  className="gap-2"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous Day
                </Button>
                
                <h2 className="text-xl font-semibold">
                  {isToday(new Date(selectedDate)) 
                    ? "Today"
                    : format(new Date(selectedDate), "MMMM d, yyyy")}
                </h2>
                
                <Button
                  variant="outline"
                  onClick={handleNextDay}
                  disabled={selectedDate === format(new Date(), "yyyy-MM-dd")}
                  className="gap-2"
                >
                  Next Day
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
            
            {selectedView !== "daily" && (
              <div className="mb-8">
                <h2 className="text-xl font-semibold">
                  {selectedView === "weekly" ? "Weekly Recap" : "Monthly Recap"}
                </h2>
                <p className="text-muted-foreground">
                  {selectedView === "weekly" 
                    ? "Top products from the past week"
                    : "Top products from the past month"}
                </p>
              </div>
            )}
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                <FadeIn>
                  {renderProductList()}
                  
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
          hasUpvoted={getSelectedProductDetails()?.hasUpvoted}
          commentData={getSelectedProductDetails()?.commentData}
        />
      )}
    </div>
  );
};

export default Rankings;
