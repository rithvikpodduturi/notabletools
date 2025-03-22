
import React, { useState } from "react";
import { Bell, MessageSquare, ThumbsUp, Users, X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    type: "upvote",
    read: false,
    content: "Alex Johnson upvoted your product 'Notion AI'",
    timestamp: "2 minutes ago",
    user: {
      name: "Alex Johnson",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&q=80&w=80&h=80",
    },
    product: {
      id: "1",
      name: "Notion AI",
    },
  },
  {
    id: 2,
    type: "comment",
    read: false,
    content: "Emily Parker commented on your product 'Figma'",
    timestamp: "1 hour ago",
    user: {
      name: "Emily Parker",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&q=80&w=80&h=80",
    },
    product: {
      id: "2",
      name: "Figma",
    },
    comment: "This is an amazing tool, I use it every day for my design work!",
  },
  {
    id: 3,
    type: "mention",
    read: true,
    content: "David Wilson mentioned you in a comment",
    timestamp: "3 hours ago",
    user: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&q=80&w=80&h=80",
    },
    product: {
      id: "3",
      name: "Raycast",
    },
    comment: "I agree with @sarahj, this is a game-changer for productivity.",
  },
  {
    id: 4,
    type: "follow",
    read: true,
    content: "Michael Brown started following you",
    timestamp: "1 day ago",
    user: {
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&q=80&w=80&h=80",
    },
  },
  {
    id: 5,
    type: "upvote",
    read: true,
    content: "Sophia Miller upvoted your product 'Notion AI'",
    timestamp: "2 days ago",
    user: {
      name: "Sophia Miller",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&q=80&w=80&h=80",
    },
    product: {
      id: "1",
      name: "Notion AI",
    },
  },
];

type NotificationProps = {
  notification: typeof sampleNotifications[number];
  onMarkAsRead: (id: number) => void;
};

// Notification item component
const NotificationItem = ({ notification, onMarkAsRead }: NotificationProps) => {
  const getIcon = () => {
    switch (notification.type) {
      case "upvote":
        return <ThumbsUp className="h-4 w-4 text-amber-500" />;
      case "comment":
        return <MessageSquare className="h-4 w-4 text-green-500" />;
      case "mention":
        return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "follow":
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div 
      className={cn(
        "relative px-4 py-3 hover:bg-muted/60 transition-colors flex items-start gap-3 cursor-pointer",
        !notification.read && "bg-muted/40"
      )}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex-shrink-0 mt-1">
        <Avatar className="h-10 w-10">
          <AvatarImage src={notification.user.avatar} alt={notification.user.name} />
          <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
      
      <div className="flex-grow min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium">{notification.user.name}</span>
          {getIcon()}
        </div>
        <p className="text-sm text-foreground mb-1">{notification.content}</p>
        {notification.comment && (
          <div className="bg-muted/50 rounded-md p-2 my-2 text-sm">
            "{notification.comment}"
          </div>
        )}
        <p className="text-xs text-muted-foreground">{notification.timestamp}</p>
      </div>
      
      {!notification.read && (
        <div className="absolute top-3 right-3">
          <div className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
        </div>
      )}
    </div>
  );
};

// Bell icon button component that shows the notification count
export const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = sampleNotifications.filter(n => !n.read).length;
  
  return (
    <>
      <Button 
        variant="ghost" 
        size="icon" 
        className="relative"
        onClick={() => setIsOpen(true)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-brand-orange text-[11px] font-medium text-white">
            {unreadCount}
          </span>
        )}
      </Button>
      
      <NotificationCenter open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
};

// Main notification center component
type NotificationCenterProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const NotificationCenter = ({ open, onOpenChange }: NotificationCenterProps) => {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();
  
  const handleMarkAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true }))
    );
    toast({
      title: "All notifications marked as read",
      description: "You have no unread notifications",
    });
  };
  
  const getFilteredNotifications = () => {
    if (activeTab === "all") return notifications;
    return notifications.filter(notification => notification.type === activeTab);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Notifications</DialogTitle>
        </DialogHeader>
        
        <div className="flex items-center justify-between py-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-2">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="upvote">Upvotes</TabsTrigger>
              <TabsTrigger value="comment">Comments</TabsTrigger>
              <TabsTrigger value="follow">Follows</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex justify-between items-center px-2 pb-2">
          <Badge variant="outline" className="text-xs">
            {notifications.filter(n => !n.read).length} unread
          </Badge>
          <Button variant="ghost" size="sm" onClick={handleMarkAllAsRead}>
            Mark all as read
          </Button>
        </div>
        
        <Separator />
        
        <div className="overflow-y-auto max-h-[60vh]">
          <TabsContent value={activeTab} className="mt-0">
            {getFilteredNotifications().length > 0 ? (
              getFilteredNotifications().map(notification => (
                <React.Fragment key={notification.id}>
                  <NotificationItem
                    notification={notification}
                    onMarkAsRead={handleMarkAsRead}
                  />
                  <Separator />
                </React.Fragment>
              ))
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                No notifications to display
              </div>
            )}
          </TabsContent>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
