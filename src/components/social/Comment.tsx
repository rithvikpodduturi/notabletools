
import React, { useState } from 'react';
import { format } from 'date-fns';
import { MoreHorizontal, Flag, Edit, Trash, Reply, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import UpvoteButton from './UpvoteButton';
import CommentEditor from './CommentEditor';

export interface CommentType {
  id: string;
  productId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  upvotes: number;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  parentId?: string;
  replies?: CommentType[];
  hasUpvoted?: boolean;
}

interface CommentProps {
  comment: CommentType;
  onReply: (comment: { content: string; parentId: string; productId: string; }) => void;
  onEdit: (id: string, content: string) => void;
  onDelete: (id: string) => void;
  onUpvote: (id: string) => void;
  onFlag: (id: string, reason: string) => void;
  level?: number;
}

const Comment: React.FC<CommentProps> = ({
  comment,
  onReply,
  onEdit,
  onDelete,
  onUpvote,
  onFlag,
  level = 0,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFlagDialog, setShowFlagDialog] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();
  
  const isAuthor = user?.id === comment.author.id;
  const maxLevel = 3; // Maximum nesting level

  const handleReplySubmit = (newComment: { content: string; parentId?: string; productId: string; }) => {
    onReply({
      ...newComment,
      parentId: comment.id,
    });
    setIsReplying(false);
  };

  const handleEditSubmit = (editedComment: { content: string; parentId?: string; productId: string; }) => {
    onEdit(comment.id, editedComment.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(comment.id);
    setShowDeleteDialog(false);
  };

  const handleFlag = () => {
    onFlag(comment.id, 'inappropriate content');
    setShowFlagDialog(false);
    toast({
      title: "Comment flagged",
      description: "Thank you for helping keep the community safe",
    });
  };

  // Process Markdown content to handle links and mentions
  const processedContent = comment.content
    // Make @mentions into links
    .replace(/@(\w+)/g, '<a href="/profile/$1" class="text-brand-orange hover:underline">@$1</a>');

  return (
    <div className={cn("comment-container", level > 0 && "ml-6")}>
      <div className="flex gap-3 mb-3">
        <Avatar className="h-8 w-8 mt-1">
          <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
          <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
        </Avatar>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <span className="font-medium">{comment.author.name}</span>
              <span className="text-xs text-muted-foreground">
                {format(new Date(comment.createdAt), 'MMM d, yyyy')}
                {comment.updatedAt && ' (edited)'}
              </span>
            </div>
            
            <div className="flex items-center">
              <UpvoteButton
                productId={comment.id}
                initialCount={comment.upvotes}
                hasUpvoted={comment.hasUpvoted}
                onUpvote={() => onUpvote(comment.id)}
                variant="comment"
              />
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-7 w-7 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsReplying(true)}>
                    <Reply className="h-4 w-4 mr-2" />
                    Reply
                  </DropdownMenuItem>
                  
                  {isAuthor && (
                    <>
                      <DropdownMenuItem onClick={() => setIsEditing(true)}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => setShowDeleteDialog(true)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                    </>
                  )}
                  
                  <DropdownMenuItem onClick={() => setShowFlagDialog(true)}>
                    <Flag className="h-4 w-4 mr-2" />
                    Flag
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          {isEditing ? (
            <CommentEditor
              productId={comment.productId}
              parentId={comment.parentId}
              onSubmit={handleEditSubmit}
              onCancel={() => setIsEditing(false)}
              existingContent={comment.content}
              isEditing={true}
            />
          ) : (
            <div className="prose prose-sm max-w-none dark:prose-invert prose-a:text-brand-orange">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: processedContent
                }}
              />
            </div>
          )}
          
          <div className="flex mt-2 space-x-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-7 text-xs"
              onClick={() => setIsReplying(true)}
            >
              <Reply className="h-3.5 w-3.5 mr-1" />
              Reply
            </Button>
          </div>
          
          {isReplying && (
            <div className="mt-3">
              <CommentEditor
                productId={comment.productId}
                parentId={comment.id}
                onSubmit={handleReplySubmit}
                onCancel={() => setIsReplying(false)}
                isReply={true}
              />
            </div>
          )}
          
          {/* Render replies if they exist */}
          {comment.replies && comment.replies.length > 0 && level < maxLevel && (
            <div className="mt-4 space-y-4 border-l-2 border-muted pl-4">
              {comment.replies.map((reply) => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onUpvote={onUpvote}
                  onFlag={onFlag}
                  level={level + 1}
                />
              ))}
            </div>
          )}
          
          {/* For deeply nested comments, show a "Show More" button */}
          {comment.replies && comment.replies.length > 0 && level >= maxLevel && (
            <Button 
              variant="link" 
              size="sm" 
              className="mt-2 text-xs text-muted-foreground"
              onClick={() => {
                // Handle expanding deeply nested comments
                toast({
                  title: "View in context",
                  description: "Redirecting to full thread view"
                });
              }}
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View more replies in thread
            </Button>
          )}
        </div>
      </div>
      
      {/* Delete confirmation dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Comment</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this comment? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      {/* Flag confirmation dialog */}
      <AlertDialog open={showFlagDialog} onOpenChange={setShowFlagDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Flag Inappropriate Content</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to flag this comment as inappropriate? Our moderators will review it.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleFlag}>
              Flag Comment
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Comment;
