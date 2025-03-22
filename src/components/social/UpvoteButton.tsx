
import React, { useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface UpvoteButtonProps {
  productId: string;
  initialCount: number;
  hasUpvoted?: boolean;
  onUpvote?: (id: string) => void;
  variant?: 'default' | 'comment';
  className?: string;
}

const UpvoteButton = ({
  productId,
  initialCount,
  hasUpvoted: initialHasUpvoted = false,
  onUpvote,
  variant = 'default',
  className,
}: UpvoteButtonProps) => {
  const [hasUpvoted, setHasUpvoted] = useState(initialHasUpvoted);
  const [count, setCount] = useState(initialCount);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleUpvote = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upvote products",
        variant: "destructive",
      });
      return;
    }
    
    if (hasUpvoted) {
      return; // User has already upvoted
    }
    
    setHasUpvoted(true);
    setCount(prevCount => prevCount + 1);
    onUpvote?.(productId);
  };

  if (variant === 'comment') {
    return (
      <button
        onClick={handleUpvote}
        className={cn(
          "flex items-center gap-1 text-xs text-muted-foreground hover:text-brand-orange transition-colors",
          hasUpvoted && "text-brand-orange",
          className
        )}
      >
        <ChevronUp className="h-3.5 w-3.5" />
        <span>{count}</span>
      </button>
    );
  }

  return (
    <Badge
      variant={hasUpvoted ? "interactiveActive" : "interactive"}
      onClick={handleUpvote}
      className={cn("flex items-center gap-1.5 py-1 px-2.5 text-sm", className)}
    >
      <ChevronUp className={cn("h-4 w-4", hasUpvoted && "text-brand-orange")} />
      <span>{count}</span>
    </Badge>
  );
};

export default UpvoteButton;
