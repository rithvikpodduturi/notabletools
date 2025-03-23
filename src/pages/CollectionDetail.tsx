
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Bookmark, 
  BookmarkCheck,
  Share2, 
  MoreHorizontal, 
  Edit, 
  Lock, 
  Trash, 
  Globe
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Collection } from "@/types/collection";
import FadeIn from "@/components/animations/FadeIn";
import ProductDetail from "@/components/ProductDetail";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Sample data with more details
const sampleCollections: Collection[] = [
  {
    id: "1",
    name: "Design Tools",
    description: "A comprehensive collection of the best design tools to enhance your workflow and productivity. Perfect for UI/UX designers, graphic designers, and creative professionals.",
    isPublic: true,
    products: [
      {
        id: "p1",
        productId: "2",
        name: "Figma",
        tagline: "Collaborative interface design tool",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-10T12:00:00Z"
      },
      {
        id: "p2",
        productId: "3",
        name: "Raycast",
        tagline: "Productivity tool to replace your macOS Spotlight",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-11T12:00:00Z"
      }
    ],
    createdBy: {
      id: "u1",
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    },
    createdAt: "2023-05-10T10:00:00Z",
    updatedAt: "2023-05-11T14:30:00Z",
    followers: 128,
    isFollowing: false
  },
  {
    id: "2",
    name: "AI Productivity Tools",
    description: "Tools that use artificial intelligence to enhance your productivity and creativity. This collection includes writing assistants, image generators, and conversational AI tools that can help you work smarter.",
    isPublic: true,
    products: [
      {
        id: "p3",
        productId: "1",
        name: "Notion AI",
        tagline: "AI-powered writing assistant integrated with Notion",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-12T09:00:00Z"
      },
      {
        id: "p4",
        productId: "4",
        name: "ChatGPT",
        tagline: "Conversational AI that can chat about anything",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-12T09:30:00Z"
      },
      {
        id: "p5",
        productId: "6",
        name: "Midjourney",
        tagline: "AI-powered image generation from text descriptions",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-12T10:00:00Z"
      }
    ],
    createdBy: {
      id: "u2",
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    createdAt: "2023-05-12T08:00:00Z",
    updatedAt: "2023-05-12T11:00:00Z",
    followers: 245,
    isFollowing: true
  },
];

// Sample product details for the collection products
const productDetails: { [key: string]: any } = {
  "1": {
    id: "1",
    name: "Notion AI",
    tagline: "AI-powered writing assistant integrated with Notion",
    description: "Notion AI is a writing assistant that helps you write better, faster, and more creatively. It's built right into Notion, so you can use it anywhere you write — from meeting notes and status updates to blog posts and creative stories.",
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
  "2": {
    id: "2",
    name: "Figma",
    tagline: "Collaborative interface design tool",
    description: "Figma is a cloud-based design tool that brings together design, prototyping, and collaboration in one platform.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
    upvotes: 384,
    comments: 56,
    hasUpvoted: false,
    commentData: [],
  },
  "3": {
    id: "3",
    name: "Raycast",
    tagline: "Productivity tool to replace your macOS Spotlight",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
    upvotes: 321,
    comments: 42,
    hasUpvoted: false,
    commentData: [],
  },
  "4": {
    id: "4",
    name: "ChatGPT",
    tagline: "Conversational AI that can chat about anything",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
    upvotes: 298,
    comments: 63,
    hasUpvoted: false,
    commentData: [],
  },
  "6": {
    id: "6",
    name: "Midjourney",
    tagline: "AI-powered image generation from text descriptions",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
    upvotes: 265,
    comments: 51,
    hasUpvoted: false,
    commentData: [],
  },
};

const CollectionDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [collection, setCollection] = useState<Collection | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    // In a real app, fetch the collection data
    const foundCollection = sampleCollections.find(c => c.id === id);
    if (foundCollection) {
      setCollection(foundCollection);
      setIsFollowing(foundCollection.isFollowing || false);
      setFollowerCount(foundCollection.followers);
    }
  }, [id]);

  if (!collection) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-16 flex items-center justify-center">
          <p>Collection not found</p>
        </main>
        <Footer />
      </div>
    );
  }

  const isOwner = isAuthenticated && user?.id === collection.createdBy.id;

  const handleToggleFollow = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to follow collections",
        variant: "destructive",
      });
      return;
    }
    
    setIsFollowing(prev => !prev);
    setFollowerCount(prev => isFollowing ? prev - 1 : prev + 1);
    
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: isFollowing 
        ? `You've unfollowed ${collection.name}` 
        : `You're now following ${collection.name}`
    });
  };

  const handleShare = () => {
    // Copy to clipboard and show toast
    navigator.clipboard.writeText(`${window.location.origin}/collections/${id}`);
    toast({
      title: "Link copied",
      description: "Collection link copied to clipboard"
    });
  };

  const handleEdit = () => {
    navigate(`/collections/${id}/edit`);
  };

  const handleDelete = () => {
    setDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    toast({
      title: "Collection deleted",
      description: "Your collection has been deleted successfully"
    });
    navigate("/collections");
  };

  const handleViewProduct = (productId: string) => {
    setSelectedProduct(productId);
    document.body.style.overflow = "hidden";
  };

  const handleCloseProductDetail = () => {
    setSelectedProduct(null);
    document.body.style.overflow = "";
  };

  const handleUpvote = (productId: string) => {
    // In a real app, send the upvote to the server
    if (productDetails[productId]) {
      productDetails[productId].upvotes += 1;
      productDetails[productId].hasUpvoted = true;
    }
  };

  const getSelectedProductDetails = () => {
    return selectedProduct ? productDetails[selectedProduct] || null : null;
  };

  const getRelatedProducts = (currentId: string) => {
    // In a real app, fetch related products
    return Object.values(productDetails)
      .filter((product: any) => product.id !== currentId)
      .slice(0, 3);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <FadeIn>
          <section className="py-8 bg-muted/30">
            <div className="container-custom">
              <div className="max-w-4xl mx-auto">
                {/* Collection header */}
                <div className="mb-8">
                  <div className="flex items-center justify-between flex-wrap gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <h1 className="text-3xl font-bold">{collection.name}</h1>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {collection.isPublic ? (
                          <>
                            <Globe className="h-3 w-3" />
                            <span>Public</span>
                          </>
                        ) : (
                          <>
                            <Lock className="h-3 w-3" />
                            <span>Private</span>
                          </>
                        )}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={handleShare}
                        className="gap-2"
                      >
                        <Share2 className="h-4 w-4" />
                        Share
                      </Button>
                      
                      <Button
                        variant={isFollowing ? "secondary" : "default"}
                        onClick={handleToggleFollow}
                        className="gap-2"
                      >
                        {isFollowing ? (
                          <>
                            <BookmarkCheck className="h-4 w-4" />
                            Following
                          </>
                        ) : (
                          <>
                            <Bookmark className="h-4 w-4" />
                            Follow
                          </>
                        )}
                      </Button>
                      
                      {isOwner && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={handleEdit} className="cursor-pointer">
                              <Edit className="h-4 w-4 mr-2" />
                              Edit collection
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              onClick={handleDelete} 
                              className="cursor-pointer text-destructive"
                            >
                              <Trash className="h-4 w-4 mr-2" />
                              Delete collection
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {collection.description}
                  </p>
                  
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={collection.createdBy.avatar} />
                        <AvatarFallback>{collection.createdBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span>{collection.createdBy.name}</span>
                    </div>
                    
                    <div>
                      {followerCount} {followerCount === 1 ? 'follower' : 'followers'}
                    </div>
                    
                    <div>
                      {collection.products.length} {collection.products.length === 1 ? 'product' : 'products'}
                    </div>
                    
                    <div>
                      Updated {formatDistanceToNow(new Date(collection.updatedAt), { addSuffix: true })}
                    </div>
                  </div>
                </div>
                
                {/* Products list */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Products in this collection</h2>
                  
                  {collection.products.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4">
                      {collection.products.map((product, index) => {
                        const productDetail = productDetails[product.productId];
                        if (!productDetail) return null;
                        
                        return (
                          <ProductCard
                            key={product.id}
                            id={productDetail.id}
                            name={productDetail.name}
                            tagline={productDetail.tagline}
                            image={productDetail.image}
                            upvotes={productDetail.upvotes}
                            comments={productDetail.comments}
                            url={productDetail.url}
                            maker={productDetail.maker}
                            handleUpvote={handleUpvote}
                            handleViewProduct={() => handleViewProduct(product.productId)}
                            index={index}
                            hasUpvoted={productDetail.hasUpvoted}
                          />
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-10 bg-muted/20 rounded-lg">
                      <p className="text-muted-foreground mb-4">This collection doesn't have any products yet.</p>
                      {isOwner && (
                        <Button variant="outline">
                          Add products
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </FadeIn>
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
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete collection</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{collection.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CollectionDetail;
