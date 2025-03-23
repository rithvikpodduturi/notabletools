
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { BottomNav } from "@/components/mobile/BottomNav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { SearchCommand } from "@/components/search/SearchCommand";
import FadeIn from "@/components/animations/FadeIn";
import { getTrendingProducts } from "@/utils/search";
import { cn } from "@/lib/utils";

// Sample topics data
const allTopics = [
  { slug: "ai-tools", name: "AI Tools", icon: "🤖", color: "bg-blue-50 text-blue-600 border-blue-200" },
  { slug: "productivity", name: "Productivity", icon: "⚡", color: "bg-amber-50 text-amber-600 border-amber-200" },
  { slug: "design-tools", name: "Design Tools", icon: "🎨", color: "bg-purple-50 text-purple-600 border-purple-200" },
  { slug: "marketing", name: "Marketing", icon: "📈", color: "bg-green-50 text-green-600 border-green-200" },
  { slug: "developer-tools", name: "Developer Tools", icon: "💻", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
];

// Sample product data that needs to be replaced with real data
const initialProducts = [
  // Reusing the sample products from index but with categories added
  // would be fetched from an API in a real app
];

const TopicPage = () => {
  const { topicSlug } = useParams<{ topicSlug: string }>();
  const [topic, setTopic] = useState<typeof allTopics[0] | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("popular");
  
  useEffect(() => {
    // Find the current topic based on slug
    const foundTopic = allTopics.find(t => t.slug === topicSlug);
    setTopic(foundTopic || null);
    
    // Simulate fetching products for this topic
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      // Filter products by current topic
      const topicName = foundTopic?.name || "";
      // Simulated products - would come from API
      const filteredProducts = Array(8).fill(null).map((_, i) => ({
        id: `topic-${topicSlug}-${i}`,
        name: `${topicName} Product ${i+1}`,
        tagline: `A great ${topicName.toLowerCase()} tool for your workflow`,
        image: `https://images.unsplash.com/photo-${1500000000000 + i * 10000}?auto=format&w=200&h=200&q=80`,
        upvotes: Math.floor(Math.random() * 300) + 50,
        comments: Math.floor(Math.random() * 50),
        categories: [topicName],
      }));
      
      setProducts(filteredProducts);
      setLoading(false);
    }, 1000);
  }, [topicSlug]);
  
  const handleUpvote = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1 }
          : product
      )
    );
  };
  
  const handleViewProduct = (id: string) => {
    // Navigate to product detail
    console.log("View product", id);
  };
  
  const trendingProducts = getTrendingProducts(products);
  
  return (
    <div className="min-h-screen flex flex-col pb-16 md:pb-0">
      <Header />
      <main className="flex-grow pt-20 md:pt-24">
        {/* Topic header */}
        <section className="py-6 md:py-8 border-b">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
                    Home
                  </Link>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <Link to="/topics" className="text-sm text-muted-foreground hover:text-foreground">
                    Topics
                  </Link>
                  <ChevronRight className="h-3 w-3 text-muted-foreground" />
                  <span className="text-sm font-medium">{topic?.name}</span>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                  <span className="mr-2 text-xl md:text-2xl">{topic?.icon}</span>
                  {topic?.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  Discover the best {topic?.name} products
                </p>
              </div>
              
              <div>
                <SearchCommand products={products} />
              </div>
            </div>
          </div>
        </section>
        
        {/* Content */}
        <section className="py-8">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="space-y-6">
                  <div className="rounded-xl border p-4">
                    <h3 className="font-medium mb-3">Browse Topics</h3>
                    <div className="space-y-1">
                      {allTopics.map(t => (
                        <Link
                          key={t.slug}
                          to={`/topics/${t.slug}`}
                          className={cn(
                            "flex items-center px-3 py-2 rounded-md text-sm",
                            t.slug === topicSlug
                              ? `${t.color} border`
                              : "hover:bg-muted transition-colors"
                          )}
                        >
                          <span className="mr-2">{t.icon}</span>
                          <span>{t.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                  
                  <div className="rounded-xl border p-4">
                    <h3 className="font-medium mb-3">Trending in {topic?.name}</h3>
                    <div className="space-y-3">
                      {trendingProducts.slice(0, 3).map((product, index) => (
                        <div key={product.id} className="flex items-start gap-2">
                          <div className="bg-muted rounded-md h-10 w-10 flex-shrink-0 overflow-hidden">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                                {index + 1}
                              </div>
                            )}
                          </div>
                          <div>
                            <h4 className="text-sm font-medium leading-tight">
                              {product.name}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                              {product.tagline}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Main content */}
              <div className="lg:col-span-3">
                <Tabs defaultValue="popular" className="mb-8">
                  <TabsList className="mb-2">
                    <TabsTrigger 
                      value="popular" 
                      onClick={() => setSelectedTab("popular")}
                    >
                      Popular
                    </TabsTrigger>
                    <TabsTrigger 
                      value="newest" 
                      onClick={() => setSelectedTab("newest")}
                    >
                      Newest
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="popular" className="mt-0">
                    <p className="text-sm text-muted-foreground mb-6">
                      Most popular {topic?.name} products, sorted by upvotes
                    </p>
                    
                    {loading ? (
                      <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="rounded-xl overflow-hidden bg-white border p-4">
                            <div className="flex">
                              <Skeleton className="rounded-xl mr-4 w-20 h-20" />
                              <div className="flex-1">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-2/3" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        <FadeIn>
                          {products
                            .sort((a, b) => b.upvotes - a.upvotes)
                            .map((product, index) => (
                              <ProductCard
                                key={product.id}
                                {...product}
                                handleUpvote={handleUpvote}
                                handleViewProduct={handleViewProduct}
                                index={index}
                              />
                            ))}
                        </FadeIn>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="newest" className="mt-0">
                    <p className="text-sm text-muted-foreground mb-6">
                      Latest {topic?.name} products, sorted by launch date
                    </p>
                    
                    {loading ? (
                      <div className="space-y-4">
                        {[...Array(4)].map((_, i) => (
                          <div key={i} className="rounded-xl overflow-hidden bg-white border p-4">
                            <div className="flex">
                              <Skeleton className="rounded-xl mr-4 w-20 h-20" />
                              <div className="flex-1">
                                <Skeleton className="h-6 w-3/4 mb-2" />
                                <Skeleton className="h-4 w-full mb-1" />
                                <Skeleton className="h-4 w-2/3" />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-4">
                        <FadeIn>
                          {products
                            .slice() // Create a copy to avoid mutating original array
                            .reverse() // Simple way to simulate sorting by newest
                            .map((product, index) => (
                              <ProductCard
                                key={product.id}
                                {...product}
                                handleUpvote={handleUpvote}
                                handleViewProduct={handleViewProduct}
                                index={index}
                              />
                            ))}
                        </FadeIn>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default TopicPage;
