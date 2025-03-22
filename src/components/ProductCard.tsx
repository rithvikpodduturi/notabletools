
import { useState } from "react";
import { ChevronUp, MessageSquare, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import FadeIn from "./animations/FadeIn";

interface ProductCardProps {
  id: string;
  name: string;
  tagline: string;
  image: string;
  upvotes: number;
  comments: number;
  className?: string;
  handleUpvote?: (id: string) => void;
  index?: number;
}

const ProductCard = ({
  id,
  name,
  tagline,
  image,
  upvotes,
  comments,
  className,
  handleUpvote,
  index = 0,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasUpvoted, setHasUpvoted] = useState(false);
  const [currentUpvotes, setCurrentUpvotes] = useState(upvotes);

  const onUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!hasUpvoted) {
      setHasUpvoted(true);
      setCurrentUpvotes(currentUpvotes + 1);
      handleUpvote?.(id);
    }
  };

  return (
    <FadeIn 
      delay={index * 100} 
      className={cn(
        "group relative rounded-xl overflow-hidden transition-all duration-300 bg-white border border-border hover:border-brand-orange/30 hover:shadow-card",
        className
      )}
    >
      <a
        href="#"
        className="block h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex p-4 md:p-5">
          <div className="flex-shrink-0 mr-4">
            <div className="w-16 h-16 rounded-xl overflow-hidden border border-muted bg-muted/20">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center mb-1">
              <h3 className="text-lg font-medium line-clamp-1 mr-2">
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
            <p className="text-muted-foreground text-sm line-clamp-2">
              {tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 pb-4 md:px-5 md:pb-5">
          <button
            onClick={onUpvote}
            className={cn(
              "flex items-center gap-1.5 rounded-md py-1 px-2.5 text-sm font-medium transition-all duration-200",
              hasUpvoted
                ? "bg-brand-orange/10 text-brand-orange"
                : "bg-muted hover:bg-brand-orange/10 hover:text-brand-orange"
            )}
          >
            <ChevronUp
              className={cn("h-4 w-4", hasUpvoted && "text-brand-orange")}
            />
            <span>{currentUpvotes}</span>
          </button>

          <div className="flex items-center text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4 mr-1.5" />
            <span>{comments}</span>
          </div>
        </div>
      </a>
    </FadeIn>
  );
};

export default ProductCard;
