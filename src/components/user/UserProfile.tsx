
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Calendar,
  Edit,
  Link as LinkIcon,
  MapPin,
  Twitter,
  Github,
  Globe,
  AtSign,
  Users,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Separator } from "@/components/ui/separator";
import FadeIn from "@/components/animations/FadeIn";

// Sample user data (in a real app, this would be fetched from your backend)
const sampleUser = {
  id: "user1",
  name: "Sarah Johnson",
  username: "sarahj",
  bio: "Product Manager at Acme Inc. | Tech enthusiast and early adopter | Building the future of work",
  avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&q=80&w=200&h=200",
  location: "San Francisco, CA",
  website: "https://sarahjohnson.dev",
  twitter: "sarahj",
  github: "sarahjohnson",
  joinDate: "January 2020",
  followerCount: 842,
  followingCount: 305,
  topics: ["AI", "Product Management", "SaaS", "Design Tools", "Remote Work"],
};

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "Notion AI",
    tagline: "AI-powered writing assistant integrated with Notion",
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
    upvotes: 452,
    comments: 87,
  },
  {
    id: "2",
    name: "Figma",
    tagline: "Collaborative interface design tool",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
    upvotes: 384,
    comments: 56,
  },
  {
    id: "3",
    name: "Raycast",
    tagline: "Productivity tool to replace your macOS Spotlight",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
    upvotes: 321,
    comments: 42,
  },
];

type UserProfileProps = {
  userId?: string; // In a real app, you'd fetch user data based on this ID
};

const UserProfile = ({ userId }: UserProfileProps) => {
  const [following, setFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState("hunted");
  
  const handleFollowToggle = () => {
    setFollowing(!following);
  };

  return (
    <div className="max-w-full container-custom py-8">
      <FadeIn>
        {/* User Header */}
        <div className="flex flex-col lg:flex-row items-start gap-6 mb-8">
          {/* Avatar and main info */}
          <div className="flex-shrink-0">
            <Avatar className="h-24 w-24 border-2 border-white shadow-md">
              <AvatarImage src={sampleUser.avatar} alt={sampleUser.name} />
              <AvatarFallback>{sampleUser.name.charAt(0)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-grow space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">{sampleUser.name}</h1>
                <p className="text-muted-foreground flex items-center gap-1">
                  <AtSign className="h-4 w-4" />
                  {sampleUser.username}
                </p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant={following ? "outline" : "default"}
                  onClick={handleFollowToggle}
                >
                  {following ? "Following" : "Follow"}
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-foreground">{sampleUser.bio}</p>
            
            <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-muted-foreground">
              {sampleUser.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {sampleUser.location}
                </span>
              )}
              {sampleUser.website && (
                <a 
                  href={sampleUser.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-brand-orange transition-colors"
                >
                  <Globe className="h-4 w-4" />
                  Website
                </a>
              )}
              {sampleUser.twitter && (
                <a 
                  href={`https://twitter.com/${sampleUser.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-brand-orange transition-colors"
                >
                  <Twitter className="h-4 w-4" />
                  @{sampleUser.twitter}
                </a>
              )}
              {sampleUser.github && (
                <a 
                  href={`https://github.com/${sampleUser.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-brand-orange transition-colors"
                >
                  <Github className="h-4 w-4" />
                  {sampleUser.github}
                </a>
              )}
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                Joined {sampleUser.joinDate}
              </span>
            </div>
            
            <div className="flex items-center gap-4 pt-1">
              <a href="#followers" className="flex items-center gap-1 hover:text-brand-orange">
                <span className="font-medium">{sampleUser.followerCount}</span> 
                <span className="text-muted-foreground">Followers</span>
              </a>
              <a href="#following" className="flex items-center gap-1 hover:text-brand-orange">
                <span className="font-medium">{sampleUser.followingCount}</span> 
                <span className="text-muted-foreground">Following</span>
              </a>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2">
              {sampleUser.topics.map((topic) => (
                <Badge key={topic} variant="outline" className="hover:bg-muted cursor-pointer">
                  {topic}
                </Badge>
              ))}
            </div>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        {/* Tabs and Content */}
        <Tabs defaultValue="hunted" onValueChange={setActiveTab} className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="hunted">Hunted</TabsTrigger>
            <TabsTrigger value="upvoted">Upvoted</TabsTrigger>
            <TabsTrigger value="made">Made</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="followers">Followers</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hunted" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Products Hunted</h2>
            <div className="grid grid-cols-1 gap-4">
              {sampleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  handleUpvote={() => {}}
                  handleViewProduct={() => {}}
                  index={0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="upvoted" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Products Upvoted</h2>
            <div className="grid grid-cols-1 gap-4">
              {sampleProducts.slice(1).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  handleUpvote={() => {}}
                  handleViewProduct={() => {}}
                  index={0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="made" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Products Made</h2>
            <div className="grid grid-cols-1 gap-4">
              {sampleProducts.slice(2).map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  handleUpvote={() => {}}
                  handleViewProduct={() => {}}
                  index={0}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="topics" className="mt-0">
            <h2 className="text-xl font-semibold mb-4">Topics Following</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {sampleUser.topics.map((topic) => (
                <Card key={topic} className="p-4 text-center hover:border-brand-orange transition-colors cursor-pointer">
                  <h3 className="font-medium">{topic}</h3>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="followers" className="mt-0">
            <h2 className="text-xl font-semibold mb-4" id="followers">Followers</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <UserCard key={i} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="following" className="mt-0">
            <h2 className="text-xl font-semibold mb-4" id="following">Following</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3].map((i) => (
                <UserCard key={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </FadeIn>
    </div>
  );
};

// User Card Component for Followers/Following lists
const UserCard = () => {
  const [following, setFollowing] = useState(false);
  
  return (
    <div className="flex items-center justify-between p-4 border rounded-lg">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&q=80&w=100&h=100" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">Jane Doe</h3>
          <p className="text-sm text-muted-foreground">Product Designer</p>
        </div>
      </div>
      <Button 
        variant={following ? "outline" : "default"} 
        size="sm"
        onClick={() => setFollowing(!following)}
      >
        {following ? "Following" : "Follow"}
      </Button>
    </div>
  );
};

export default UserProfile;
