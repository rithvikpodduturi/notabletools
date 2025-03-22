
import { useState } from "react";
import { ArrowLeft, ChevronUp, ExternalLink, MessageSquare, Share2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface ProductGalleryImage {
  src: string;
  alt: string;
}

interface ProductDetailProps {
  id: string;
  name: string;
  tagline: string;
  description: string;
  images: ProductGalleryImage[];
  upvotes: number;
  comments: number;
  url: string;
  pricing?: string;
  platforms?: string[];
  categories?: string[];
  maker: {
    name: string;
    avatar: string;
  };
  relatedProducts?: Array<{
    id: string;
    name: string;
    image: string;
    tagline: string;
  }>;
  onClose: () => void;
  handleUpvote?: (id: string) => void;
}

const ProductDetail = ({
  id,
  name,
  tagline,
  description,
  images,
  upvotes,
  comments,
  url,
  pricing,
  platforms,
  categories,
  maker,
  relatedProducts = [],
  onClose,
  handleUpvote,
}: ProductDetailProps) => {
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const onUpvote = () => {
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setCurrentUpvotes(currentUpvotes + 1);
      handleUpvote?.(id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex justify-center overflow-y-auto p-4 sm:p-6">
      <div className="relative w-full max-w-3xl mx-auto">
        <Card className="border shadow-lg animate-fade-in">
          <div className="sticky top-0 z-10 bg-card flex items-center justify-between p-4 border-b">
            <Button variant="ghost" size="icon" onClick={onClose} className="mr-auto">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
            
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share</span>
              </Button>
              
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </div>
          
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col-reverse sm:flex-row sm:items-start gap-4 mb-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-1">{name}</h2>
                <p className="text-muted-foreground mb-4">{tagline}</p>
                
                <div className="flex items-center gap-3 mb-4">
                  <Button 
                    variant={hasUpvoted ? "default" : "outline"}
                    onClick={onUpvote}
                    className={cn(
                      "flex items-center gap-1.5",
                      hasUpvoted && "bg-brand-orange hover:bg-brand-orange/90"
                    )}
                  >
                    <ChevronUp className="h-4 w-4" />
                    <span>{currentUpvotes}</span>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="gap-1.5"
                    onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
                  >
                    <span>Visit Website</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="flex items-center mb-6">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={maker.avatar} alt={maker.name} />
                    <AvatarFallback>{maker.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">Made by <span className="font-medium">{maker.name}</span></span>
                </div>
                
                <Collapsible open={isDescriptionExpanded} onOpenChange={setIsDescriptionExpanded}>
                  <div className={cn(
                    "prose prose-sm max-w-none",
                    !isDescriptionExpanded && "line-clamp-3"
                  )}>
                    <p>{description}</p>
                  </div>
                  
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm" className="mt-2 h-auto p-0 font-normal underline">
                      {isDescriptionExpanded ? "Read less" : "Read more"}
                    </Button>
                  </CollapsibleTrigger>
                  
                  <CollapsibleContent>
                    {/* More content would be here */}
                  </CollapsibleContent>
                </Collapsible>
              </div>
              
              <div className="w-full sm:w-40 flex-shrink-0">
                <div className="rounded-lg overflow-hidden border">
                  <img 
                    src={images[0]?.src || ""} 
                    alt={images[0]?.alt || name}
                    className="w-full aspect-square object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="font-medium mb-3">Gallery</h3>
              <Carousel className="w-full">
                <CarouselContent>
                  {images.map((image, index) => (
                    <CarouselItem key={index} className="basis-full md:basis-1/2 lg:basis-1/3">
                      <div className="p-1">
                        <div className="rounded-lg overflow-hidden border aspect-[4/3]">
                          <img 
                            src={image.src} 
                            alt={image.alt} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="-left-4" />
                <CarouselNext className="-right-4" />
              </Carousel>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div>
                <h4 className="text-sm font-medium mb-2">Website</h4>
                <a 
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-orange hover:underline flex items-center gap-1"
                >
                  <span className="truncate">{new URL(url).hostname}</span>
                  <ExternalLink className="h-3 w-3 flex-shrink-0" />
                </a>
              </div>
              
              {pricing && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Pricing</h4>
                  <p className="text-sm">{pricing}</p>
                </div>
              )}
              
              {platforms && platforms.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Platforms</h4>
                  <div className="flex flex-wrap gap-1">
                    {platforms.map((platform, i) => (
                      <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                        {platform}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {categories && categories.length > 0 && (
              <div className="mb-8">
                <h4 className="text-sm font-medium mb-2">Categories</h4>
                <div className="flex flex-wrap gap-1">
                  {categories.map((category, i) => (
                    <span key={i} className="text-xs bg-muted px-2 py-1 rounded">
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            <Separator className="my-6" />
            
            <div className="mb-8">
              <h3 className="font-medium mb-3">Comments ({comments})</h3>
              <div className="bg-muted/50 rounded-lg p-4 text-center">
                <p className="text-sm text-muted-foreground">Comment functionality will be implemented in the next phase</p>
              </div>
            </div>
            
            {relatedProducts.length > 0 && (
              <div>
                <h3 className="font-medium mb-3">Related Products</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {relatedProducts.map((product) => (
                    <div key={product.id} className="border rounded-lg p-3 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-10 h-10 rounded overflow-hidden bg-muted flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <h4 className="font-medium text-sm line-clamp-1">{product.name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">{product.tagline}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;
