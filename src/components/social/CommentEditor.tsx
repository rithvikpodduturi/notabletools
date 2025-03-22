
import React, { useState } from 'react';
import { Send, Link, Bold, Italic, List, ListOrdered, AtSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface CommentEditorProps {
  productId: string;
  parentId?: string;
  onSubmit: (comment: {
    content: string;
    parentId?: string;
    productId: string;
  }) => void;
  onCancel?: () => void;
  isReply?: boolean;
  existingContent?: string;
  isEditing?: boolean;
}

const CommentEditor: React.FC<CommentEditorProps> = ({
  productId,
  parentId,
  onSubmit,
  onCancel,
  isReply = false,
  existingContent = '',
  isEditing = false,
}) => {
  const [content, setContent] = useState(existingContent);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();

  const handleSubmit = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to comment",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        title: "Empty comment",
        description: "Please write something before submitting",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      onSubmit({
        content,
        parentId,
        productId,
      });
      
      if (!isEditing) {
        setContent('');
      }
      
      toast({
        title: isEditing ? "Comment updated" : "Comment posted",
        description: isEditing ? "Your comment has been updated successfully" : "Your comment has been posted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to post your comment",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const insertFormatting = (prefix: string, suffix: string = prefix) => {
    const textArea = document.getElementById('comment-textarea') as HTMLTextAreaElement;
    if (!textArea) return;

    const start = textArea.selectionStart;
    const end = textArea.selectionEnd;
    const selectedText = content.substring(start, end);
    const beforeText = content.substring(0, start);
    const afterText = content.substring(end);

    setContent(beforeText + prefix + selectedText + suffix + afterText);
    
    // Set focus back with proper cursor position
    setTimeout(() => {
      textArea.focus();
      textArea.setSelectionRange(
        start + prefix.length,
        end + prefix.length
      );
    }, 0);
  };

  return (
    <div className={`bg-card rounded-lg p-4 ${isReply ? 'ml-12' : ''}`}>
      <div className="flex gap-3">
        {user && (
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
        )}
        
        <div className="flex-1 space-y-3">
          <Textarea
            id="comment-textarea"
            placeholder={isReply ? "Write a reply..." : "Add a comment..."}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-y"
          />
          
          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('**', '**')}
                type="button"
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('*', '*')}
                type="button"
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('[', '](url)')}
                type="button"
              >
                <Link className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('\n- ')}
                type="button"
              >
                <List className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => insertFormatting('\n1. ')}
                type="button"
              >
                <ListOrdered className="h-4 w-4" />
              </Button>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" type="button">
                    <AtSign className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56 p-2">
                  <div className="text-sm font-medium mb-2">Mention a user</div>
                  <div className="space-y-1">
                    {['John Doe', 'Jane Smith', 'Alex Johnson'].map((name) => (
                      <Button
                        key={name}
                        variant="ghost"
                        className="w-full justify-start text-left"
                        onClick={() => insertFormatting(`@${name.replace(' ', '')}`)}
                      >
                        {name}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="flex gap-2">
              {(onCancel || isEditing) && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onCancel}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              )}
              <Button
                size="sm"
                onClick={handleSubmit}
                disabled={!content.trim() || isSubmitting}
              >
                <Send className="h-4 w-4 mr-1" />
                {isEditing ? 'Update' : 'Submit'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentEditor;
