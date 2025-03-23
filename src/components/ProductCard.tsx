
import { useState } from "react";
import { ArrowUpRight, ExternalLink, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import UpvoteButton from "./social/UpvoteButton";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  image: string;
  upvotes: number;
  comments: number;
  url?: string;
  maker?: {
    name: string;
    avatar: string;
  };
  className?: string;
  handleUpvote?: (id: string) => void;
  handleViewProduct?: (id: string) => void;
  index?: number;
  hasUpvoted?: boolean;
}

const ProductCard = ({
  id,
  name,
  tagline,
  image,
  upvotes,
  comments,
  url = "#",
  maker,
  className,
  handleUpvote,
  handleViewProduct,
  index = 0,
  hasUpvoted = false,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  const onUpvote = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upvote products",
        variant: "destructive",
      });
      return;
    }
    
    handleUpvote?.(id);
  };

  const onCardClick = () => {
    handleViewProduct?.(id);
  };

  const onExternalLinkClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <FadeIn 
      delay={index * 100} 
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-300 bg-white border border-border hover:border-brand-orange/30 hover:shadow-card",
        className
      )}
    >
      <div
        className="block h-full cursor-pointer"
        onClick={onCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex p-4">
          <div className="flex-shrink-0 mr-4">
            <div className={cn(
              "rounded-xl overflow-hidden border border-muted bg-muted/20",
              isMobile ? "w-16 h-16" : "w-20 h-20"
            )}>
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                width={isMobile ? "64" : "80"}
                height={isMobile ? "64" : "80"}
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1">
              <h3 className={cn(
                "font-medium line-clamp-1 mr-2",
                isMobile ? "text-base" : "text-lg"
              )}>
                {name}
              </h3>
              <span
                className={cn(
                  "transform-gpu transition-all duration-300 opacity-0 group-hover:opacity-100",
                  isHovered ? "translate-x-0" : "-translate-x-2"
                )}
              >
                <ArrowUpRight className="h-4 w-4 text-brand-orange" />
              </span>
            </div>
            <p className={cn(
              "text-muted-foreground line-clamp-2 mb-3",
              isMobile ? "text-xs" : "text-sm"
            )}>
              {tagline}
            </p>
            
            {maker && (
              <div className="flex items-center mt-auto">
                <Avatar className={cn(
                  "mr-2",
                  isMobile ? "h-5 w-5" : "h-6 w-6"
                )}>
                  <AvatarImage src={maker.avatar} alt={maker.name} />
                  <AvatarFallback>{maker.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">{maker.name}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-2">
            <UpvoteButton
              productId={id}
              initialCount={upvotes}
              hasUpvoted={hasUpvoted}
              onUpvote={onUpvote}
            />

            <div className="flex items-center text-sm text-muted-foreground">
              <MessageSquare className="h-4 w-4 mr-1.5" />
              <span>{comments}</span>
            </div>
          </div>

          <Button
            size={isMobile ? "sm" : "sm"}
            variant="outline"
            className="flex items-center gap-1.5 text-sm hover:text-brand-orange hover:border-brand-orange"
            onClick={onExternalLinkClick}
          >
            <span>Get it</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
    </FadeIn>
  );
};

export default ProductCard;
