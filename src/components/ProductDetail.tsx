
import React, { useState } from "react";
import { X, Link as LinkIcon, ThumbsUp, MessageSquare, Share } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProductCard from "./ProductCard";

export interface ProductDetailProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  image: string;
  upvotes: number;
  comments: number;
  url?: string;
  pricing?: string;
  platforms?: string[];
  categories?: string[];
  maker?: {
    name: string;
    avatar: string;
  };
  images?: { src: string; alt: string }[];
  relatedProducts?: any[];
  onClose: () => void;
  handleUpvote: (id: string) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  id,
  name,
  tagline,
  description,
  image,
  upvotes,
  comments,
  url,
  pricing,
  platforms,
  categories,
  maker,
  images,
  relatedProducts,
  onClose,
  handleUpvote,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isUpvoted, setIsUpvoted] = useState(false);
  
  const handleUpvoteClick = () => {
    setIsUpvoted(!isUpvoted);
    handleUpvote(id);
  };
  
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  
  return (
    <div 
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div 
        className="bg-background rounded-lg max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-background shadow-md hover:bg-muted z-10"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Product main info */}
              <div className="md:w-2/3 space-y-6">
                <div className="flex items-start gap-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <h1 className="text-2xl font-bold">{name}</h1>
                    <p className="text-muted-foreground mb-2">{tagline}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {categories?.map((category) => (
                        <Badge key={category} variant="outline">
                          {category}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <Button
                        variant={isUpvoted ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        onClick={handleUpvoteClick}
                      >
                        <ThumbsUp className="h-4 w-4" />
                        <span>{upvotes + (isUpvoted ? 1 : 0)}</span>
                      </Button>
                      
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <MessageSquare className="h-4 w-4" />
                        <span>{comments}</span>
                      </div>
                      
                      <Button variant="outline" size="sm" className="gap-1">
                        <Share className="h-4 w-4" />
                        <span>Share</span>
                      </Button>
                    </div>
                  </div>
                </div>
                
                {/* Gallery */}
                {images && images.length > 0 && (
                  <div className="space-y-3">
                    <div className="rounded-lg overflow-hidden bg-muted/50 aspect-video">
                      <img
                        src={images[activeImageIndex].src}
                        alt={images[activeImageIndex].alt}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {images.map((img, index) => (
                        <button
                          key={index}
                          className={`rounded-md overflow-hidden h-16 w-24 flex-shrink-0 border-2 transition-all ${
                            activeImageIndex === index
                              ? "border-brand-orange"
                              : "border-transparent"
                          }`}
                          onClick={() => setActiveImageIndex(index)}
                        >
                          <img
                            src={img.src}
                            alt={img.alt}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Description */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">About {name}</h2>
                  <div className="prose prose-sm max-w-none">
                    <p>{description}</p>
                  </div>
                </div>
                
                {/* Comments - Placeholder */}
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">Comments ({comments})</h2>
                  <div className="bg-muted/50 rounded-lg p-6 text-center">
                    <p className="text-muted-foreground">Comments coming soon</p>
                  </div>
                </div>
              </div>
              
              {/* Sidebar info */}
              <div className="md:w-1/3 space-y-6">
                <div className="bg-muted/30 rounded-lg p-4 space-y-4">
                  <Button variant="default" className="w-full gap-2">
                    <LinkIcon className="h-4 w-4" />
                    <span>Get it</span>
                  </Button>
                  
                  {maker && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Maker</h3>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={maker.avatar} alt={maker.name} />
                          <AvatarFallback>{maker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm">{maker.name}</span>
                      </div>
                    </div>
                  )}
                  
                  {url && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Website</h3>
                      <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:underline break-all"
                      >
                        {url.replace(/(^\w+:|^)\/\//, "")}
                      </a>
                    </div>
                  )}
                  
                  {pricing && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Pricing</h3>
                      <p className="text-sm">{pricing}</p>
                    </div>
                  )}
                  
                  {platforms && platforms.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium mb-2">Platforms</h3>
                      <div className="flex flex-wrap gap-1">
                        {platforms.map((platform) => (
                          <Badge key={platform} variant="secondary" className="text-xs">
                            {platform}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Related products */}
                {relatedProducts && relatedProducts.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Related Products</h3>
                    <div className="space-y-3">
                      {relatedProducts.map((product) => (
                        <div key={product.id} className="bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-md object-cover flex-shrink-0"
                            />
                            <div>
                              <h4 className="font-medium text-sm">{product.name}</h4>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {product.tagline}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
