
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Collection } from "@/types/collection";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkPlus, Share2, Eye, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import FadeIn from "@/components/animations/FadeIn";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

interface CollectionCardProps {
  collection: Collection;
  index?: number;
  onToggleFollow?: (id: string) => void;
}

const CollectionCard = ({ 
  collection, 
  index = 0,
  onToggleFollow
}: CollectionCardProps) => {
  const { 
    id, 
    name, 
    description, 
    products, 
    createdBy, 
    isPublic, 
    createdAt, 
    followers,
    isFollowing = false
  } = collection;
  
  const [isFollowed, setIsFollowed] = useState(isFollowing);
  const [followerCount, setFollowerCount] = useState(followers);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleFollow = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to follow collections",
        variant: "destructive",
      });
      return;
    }
    
    setIsFollowed(prev => !prev);
    setFollowerCount(prev => isFollowed ? prev - 1 : prev + 1);
    onToggleFollow?.(id);
  };

  const handleClick = () => {
    navigate(`/collections/${id}`);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Copy to clipboard and show toast
    navigator.clipboard.writeText(`${window.location.origin}/collections/${id}`);
    toast({
      title: "Link copied",
      description: "Collection link copied to clipboard"
    });
  };

  // Get up to 3 product images for the preview
  const previewImages = products.slice(0, 3).map(product => product.image);
  
  return (
    <FadeIn delay={index * 100}>
      <Card 
        className="cursor-pointer hover:border-brand-orange/30 hover:shadow-md transition-all" 
        onClick={handleClick}
      >
        <CardHeader className={cn("pb-2", isMobile && "p-3")}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h3 className={cn(
                "font-medium line-clamp-1",
                isMobile ? "text-base" : "text-lg"
              )}>{name}</h3>
              {!isPublic && <Lock className="h-4 w-4 text-muted-foreground" />}
            </div>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className={cn("h-8 w-8", isMobile && "h-7 w-7")}
                onClick={handleShare}
              >
                <Share2 className={cn("h-4 w-4", isMobile && "h-3.5 w-3.5")} />
              </Button>
              <Button
                variant={isFollowed ? "secondary" : "outline"}
                size="icon"
                className={cn("h-8 w-8", isMobile && "h-7 w-7")}
                onClick={handleFollow}
              >
                {isFollowed ? (
                  <Bookmark className={cn("h-4 w-4", isMobile && "h-3.5 w-3.5")} />
                ) : (
                  <BookmarkPlus className={cn("h-4 w-4", isMobile && "h-3.5 w-3.5")} />
                )}
              </Button>
            </div>
          </div>
          <p className={cn(
            "text-muted-foreground line-clamp-2",
            isMobile ? "text-xs" : "text-sm"
          )}>{description}</p>
        </CardHeader>
        
        <CardContent className={cn("pb-0", isMobile && "p-3 pt-0")}>
          <div className={cn(
            "relative rounded-md overflow-hidden bg-muted",
            isMobile ? "h-20" : "h-24"
          )}>
            {previewImages.length > 0 ? (
              <div className="grid grid-cols-3 h-full gap-1">
                {previewImages.map((img, i) => (
                  <div key={i} className="h-full overflow-hidden">
                    <img 
                      src={img} 
                      alt={`Product in collection ${name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <p className="text-sm">No products yet</p>
              </div>
            )}
            
            <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </div>
          </div>
        </CardContent>
        
        <CardFooter className={cn(
          "pt-4 flex justify-between items-center",
          isMobile && "p-3 pt-4"
        )}>
          <div className="flex items-center gap-2">
            <Avatar className={cn(
              isMobile ? "h-5 w-5" : "h-6 w-6"
            )}>
              <AvatarImage src={createdBy.avatar} />
              <AvatarFallback>{createdBy.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <span className="text-xs text-muted-foreground">{createdBy.name}</span>
          </div>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>{followerCount} {followerCount === 1 ? 'follower' : 'followers'}</span>
            <span>•</span>
            <span>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
          </div>
        </CardFooter>
      </Card>
    </FadeIn>
  );
};

export default CollectionCard;
