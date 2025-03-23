
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import { Calendar, Trophy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CommentType } from "@/components/social/Comment";

// Sample data for recaps
const recapData = {
  weekly: [
    {
      id: "week-2023-28", // Week 28 of 2023
      title: "July 10-16, 2023",
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
          rank: 1
        },
        {
          id: "2",
          name: "Figma",
          tagline: "Collaborative interface design tool",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
          upvotes: 384,
          comments: 56,
          hasUpvoted: false,
          commentData: [],
          rank: 2
        },
        {
          id: "3",
          name: "Raycast",
          tagline: "Productivity tool to replace your macOS Spotlight",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
          upvotes: 321,
          comments: 42,
          hasUpvoted: false,
          commentData: [],
          rank: 3
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
          rank: 4
        },
        {
          id: "5",
          name: "VS Code",
          tagline: "Code editor redefined and optimized for building modern apps",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
          upvotes: 276,
          comments: 39,
          hasUpvoted: false,
          commentData: [],
          rank: 5
        },
      ]
    },
    {
      id: "week-2023-27", // Week 27 of 2023
      title: "July 3-9, 2023",
      products: [
        {
          id: "6",
          name: "Midjourney",
          tagline: "AI-powered image generation from text descriptions",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
          upvotes: 412,
          comments: 72,
          hasUpvoted: false,
          commentData: [],
          rank: 1
        },
        {
          id: "7",
          name: "Arc Browser",
          tagline: "The browser that blocks ads and respects privacy by default",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
          upvotes: 376,
          comments: 48,
          hasUpvoted: false,
          commentData: [],
          rank: 2
        },
      ]
    }
  ],
  monthly: [
    {
      id: "month-2023-07", // July 2023
      title: "July 2023",
      products: [
        {
          id: "8",
          name: "Supabase",
          tagline: "Open source Firebase alternative with PostgreSQL",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
          upvotes: 1236,
          comments: 128,
          hasUpvoted: false,
          commentData: [],
          rank: 1
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
          rank: 2
        },
        {
          id: "10",
          name: "Linear",
          tagline: "The issue tracking tool you'll enjoy using",
          image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
          upvotes: 1072,
          comments: 98,
          hasUpvoted: false,
          commentData: [],
          rank: 3
        },
      ]
    },
    {
      id: "month-2023-06", // June 2023
      title: "June 2023",
      products: [
        {
          id: "1",
          name: "Notion AI",
          tagline: "AI-powered writing assistant integrated with Notion",
          image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
          upvotes: 1452,
          comments: 187,
          hasUpvoted: false,
          commentData: [],
          rank: 1
        },
        {
          id: "2",
          name: "Figma",
          tagline: "Collaborative interface design tool",
          image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
          upvotes: 1384,
          comments: 156,
          hasUpvoted: false,
          commentData: [],
          rank: 2
        },
      ]
    }
  ]
};

const Recaps = () => {
  const [selectedTab, setSelectedTab] = useState<"weekly" | "monthly">("weekly");
  const [selectedRecap, setSelectedRecap] = useState<string | null>(
    selectedTab === "weekly" ? recapData.weekly[0].id : recapData.monthly[0].id
  );
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    const newTab = value as "weekly" | "monthly";
    setSelectedTab(newTab);
    
    // Set the first recap in the selected category
    if (recapData[newTab].length > 0) {
      setSelectedRecap(recapData[newTab][0].id);
    } else {
      setSelectedRecap(null);
    }
  };

  const handleRecapChange = (recapId: string) => {
    setSelectedRecap(recapId);
  };

  const handleUpvote = (id: string) => {
    // In a real app, handle the upvote
    if (selectedRecap) {
      const recapType = selectedTab;
      const recaps = recapData[recapType];
      
      for (const recap of recaps) {
        if (recap.id === selectedRecap) {
          for (let i = 0; i < recap.products.length; i++) {
            if (recap.products[i].id === id) {
              recap.products[i].upvotes += 1;
              recap.products[i].hasUpvoted = true;
              break;
            }
          }
          break;
        }
      }
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
    if (!selectedRecap || !selectedProduct) return null;
    
    const recap = recapData[selectedTab].find(r => r.id === selectedRecap);
    if (!recap) return null;
    
    return recap.products.find(p => p.id === selectedProduct) || null;
  };

  const getRelatedProducts = (currentId: string) => {
    if (!selectedRecap) return [];
    
    const recap = recapData[selectedTab].find(r => r.id === selectedRecap);
    if (!recap) return [];
    
    return recap.products
      .filter(p => p.id !== currentId)
      .slice(0, 3);
  };

  const renderRecaps = () => {
    const recaps = recapData[selectedTab];
    
    return (
      <div className="space-y-6">
        {recaps.map(recap => {
          const isSelected = selectedRecap === recap.id;
          
          return (
            <div key={recap.id} className="space-y-4">
              <h3 
                className={`text-xl font-medium cursor-pointer hover:text-brand-orange transition-colors ${isSelected ? 'text-brand-orange' : ''}`}
                onClick={() => handleRecapChange(recap.id)}
              >
                {recap.title}
              </h3>
              
              {isSelected && (
                <div className="space-y-6">
                  {/* Top 3 podium */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recap.products.slice(0, 3).map((product, index) => (
                      <div key={product.id} className="relative">
                        <div className={`absolute top-0 inset-x-0 h-1 rounded-t-md ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-300' : 
                          'bg-amber-600'
                        }`} />
                        
                        <div className="text-center pt-6 pb-4 px-2 bg-white border border-muted/20 rounded-md">
                          <div className="flex justify-center mb-2">
                            <div className={`rounded-full flex items-center justify-center w-10 h-10 text-white shadow-md ${
                              index === 0 ? 'bg-yellow-500' : 
                              index === 1 ? 'bg-gray-300' : 
                              'bg-amber-600'
                            }`}>
                              <Trophy className="h-5 w-5" />
                            </div>
                          </div>
                          
                          <div 
                            className="flex justify-center mb-3 cursor-pointer"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <div className="w-16 h-16 rounded-full overflow-hidden border border-muted">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          
                          <h4 
                            className="font-medium mb-1 hover:text-brand-orange transition-colors cursor-pointer"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            {product.name}
                          </h4>
                          
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {product.tagline}
                          </p>
                          
                          <div className="mt-3 text-sm">
                            {product.upvotes} upvotes
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Full rankings table */}
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-16 text-center">Rank</TableHead>
                          <TableHead>Product</TableHead>
                          <TableHead className="text-right">Upvotes</TableHead>
                          <TableHead className="text-right">Comments</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recap.products.map((product, index) => (
                          <TableRow 
                            key={product.id} 
                            className="cursor-pointer hover:bg-muted/30"
                            onClick={() => handleViewProduct(product.id)}
                          >
                            <TableCell className="text-center font-medium">
                              {index + 1}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-md overflow-hidden bg-muted">
                                  <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <div className="font-medium">{product.name}</div>
                                  <div className="text-sm text-muted-foreground line-clamp-1">
                                    {product.tagline}
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell className="text-right font-medium">
                              {product.upvotes}
                            </TableCell>
                            <TableCell className="text-right">
                              {product.comments}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <div className="max-w-5xl mx-auto">
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">Product Recaps</h1>
                <p className="text-muted-foreground">
                  View the best performing products across different time periods
                </p>
              </div>
              
              <Tabs 
                defaultValue="weekly" 
                className="mb-8"
                onValueChange={handleTabChange}
              >
                <TabsList>
                  <TabsTrigger value="weekly" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Weekly Recaps
                  </TabsTrigger>
                  <TabsTrigger value="monthly" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    Monthly Recaps
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="weekly">
                  <FadeIn>
                    {renderRecaps()}
                  </FadeIn>
                </TabsContent>
                
                <TabsContent value="monthly">
                  <FadeIn>
                    {renderRecaps()}
                  </FadeIn>
                </TabsContent>
              </Tabs>
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

export default Recaps;
