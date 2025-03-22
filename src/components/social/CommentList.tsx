
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';
import CommentEditor from './CommentEditor';
import Comment, { CommentType } from './Comment';

interface CommentListProps {
  productId: string;
  initialComments?: CommentType[];
  isLoading?: boolean;
}

// Helper function to organize comments into a tree structure
const organizeComments = (comments: CommentType[]) => {
  const commentMap = new Map();
  const rootComments: CommentType[] = [];

  // First pass: create a map of all comments
  comments.forEach(comment => {
    commentMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: organize into a tree structure
  comments.forEach(comment => {
    const processedComment = commentMap.get(comment.id);
    
    if (comment.parentId && commentMap.has(comment.parentId)) {
      // This is a reply, add it to the parent's replies
      const parent = commentMap.get(comment.parentId);
      parent.replies.push(processedComment);
    } else {
      // This is a root comment
      rootComments.push(processedComment);
    }
  });

  return rootComments;
};

const CommentList: React.FC<CommentListProps> = ({
  productId,
  initialComments = [],
  isLoading = false,
}) => {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [sortOption, setSortOption] = useState<'newest' | 'popular'>('popular');
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const addComment = (newComment: { content: string; parentId?: string; productId: string }) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }

    const createdComment: CommentType = {
      id: `comment-${Date.now()}`,
      productId: newComment.productId,
      content: newComment.content,
      createdAt: new Date().toISOString(),
      upvotes: 0,
      author: {
        id: user.id,
        name: user.name,
        avatar: user.avatar,
      },
      parentId: newComment.parentId,
      hasUpvoted: false,
      replies: [],
    };

    setComments(prevComments => [...prevComments, createdComment]);
  };

  const editComment = (id: string, newContent: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id
          ? {
              ...comment,
              content: newContent,
              updatedAt: new Date().toISOString(),
            }
          : comment
      )
    );
  };

  const deleteComment = (id: string) => {
    // In a real app, we would track deleted comments' replies
    setComments(prevComments => prevComments.filter(comment => comment.id !== id));
    
    toast({
      title: "Comment deleted",
      description: "Your comment has been removed",
    });
  };

  const upvoteComment = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to upvote",
        variant: "destructive",
      });
      return;
    }

    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === id
          ? {
              ...comment,
              upvotes: comment.upvotes + 1,
              hasUpvoted: true,
            }
          : comment
      )
    );
  };

  const flagComment = (id: string, reason: string) => {
    console.log(`Comment ${id} flagged for: ${reason}`);
    // In a real app, this would send a flag report to the backend
  };

  // Sort and organize comments
  const sortedComments = [...comments].sort((a, b) => {
    if (sortOption === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return b.upvotes - a.upvotes;
    }
  });

  const organizedComments = organizeComments(sortedComments);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Comments ({comments.length})</h3>
        
        <Tabs value={sortOption} onValueChange={(value) => setSortOption(value as 'newest' | 'popular')}>
          <TabsList>
            <TabsTrigger value="popular">Most Popular</TabsTrigger>
            <TabsTrigger value="newest">Newest First</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      
      <Separator />
      
      {isAuthenticated ? (
        <CommentEditor
          productId={productId}
          onSubmit={addComment}
        />
      ) : (
        <div className="bg-muted/30 rounded-lg p-6 text-center">
          <p className="text-muted-foreground mb-2">Sign in to join the discussion</p>
          <Button variant="outline" asChild>
            <a href="/login">Sign In</a>
          </Button>
        </div>
      )}
      
      <div className="space-y-6 mt-8">
        {isLoading ? (
          // Loading skeleton
          <div className="space-y-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex gap-3">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-4/5" />
                </div>
              </div>
            ))}
          </div>
        ) : organizedComments.length > 0 ? (
          // Comment list
          <div className="space-y-6">
            {organizedComments.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment}
                onReply={addComment}
                onEdit={editComment}
                onDelete={deleteComment}
                onUpvote={upvoteComment}
                onFlag={flagComment}
              />
            ))}
          </div>
        ) : (
          // No comments
          <div className="text-center py-8 text-muted-foreground">
            <p>Be the first to comment!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentList;
