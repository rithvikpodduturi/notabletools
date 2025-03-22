import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ProductDetail from "@/components/ProductDetail";
import Sidebar from "@/components/Sidebar";
import FadeIn from "@/components/animations/FadeIn";
import { Skeleton } from "@/components/ui/skeleton";
import { Toaster } from "@/components/ui/toaster";
import { CommentType } from "@/components/social/Comment";

// We're reusing the sample data from Index.tsx
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
    hasUpvoted: false,
    commentData: [],
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
    hasUpvoted: false,
    commentData: [],
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
  {
    id: "8",
    name: "Supabase",
    tagline: "Open source Firebase alternative with PostgreSQL",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
    upvotes: 236,
    comments: 28,
    hasUpvoted: false,
    commentData: [],
  },
  {
    id: "9",
    name: "Vercel",
    tagline: "Platform for frontend frameworks and static sites",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
    upvotes: 219,
    comments: 32,
    hasUpvoted: false,
    commentData: [],
  },
  {
    id: "10",
    name: "Linear",
    tagline: "The issue tracking tool you'll enjoy using",
    image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
    upvotes: 207,
    comments: 25,
    hasUpvoted: false,
    commentData: [],
  },
];

// Sample comment data
const sampleComments: CommentType[] = [
  {
    id: "comment-1",
    productId: "1",
    content: "This is a really great product! I've been using it for weeks and it has significantly improved my workflow.",
    createdAt: "2023-05-15T08:30:00Z",
    upvotes: 24,
    author: {
      id: "user-1",
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random",
    },
    hasUpvoted: false,
    replies: [
      {
        id: "comment-2",
        productId: "1",
        parentId: "comment-1",
        content: "I agree! The AI features are particularly impressive.",
        createdAt: "2023-05-15T09:45:00Z",
        upvotes: 12,
        author: {
          id: "user-2",
          name: "John Doe",
          avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random",
        },
        hasUpvoted: false,
      }
    ]
  },
  {
    id: "comment-3",
    productId: "1",
    content: "Does anyone know if this works well with other tools like Slack?",
    createdAt: "2023-05-16T10:20:00Z",
    upvotes: 8,
    author: {
      id: "user-3",
      name: "Alex Johnson",
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random",
    },
    hasUpvoted: false,
  }
];

// Add comments to the first product for demonstration
initialProductsData[0].commentData = sampleComments;

const Popular = () => {
  const [products, setProducts] = useState(initialProductsData.sort((a, b) => b.upvotes - a.upvotes));
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleUpvote = (id: string) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, upvotes: product.upvotes + 1, hasUpvoted: true }
          : product
      ).sort((a, b) => b.upvotes - a.upvotes) // Re-sort after upvoting
    );
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
      <main className="flex-grow pt-24 pb-16">
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-2">Popular Products</h1>
              <p className="text-muted-foreground">
                Discover the highest upvoted products across all categories
              </p>
            </div>
            
            <div className="flex flex-col lg:flex-row gap-8">
              <div className="flex-grow">
                <FadeIn>
                  <div className="grid grid-cols-1 gap-4">
                    {products.map((product, index) => (
                      <ProductCard
                        key={product.id}
                        {...product}
                        handleUpvote={handleUpvote}
                        handleViewProduct={handleViewProduct}
                        index={index}
                        hasUpvoted={product.hasUpvoted}
                      />
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
                  </div>
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
      <Toaster />
    </div>
  );
};

export default Popular;
