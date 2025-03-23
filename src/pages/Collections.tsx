
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FadeIn from "@/components/animations/FadeIn";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, BookmarkPlus } from "lucide-react";
import { Collection } from "@/types/collection";
import CollectionCard from "@/components/collections/CollectionCard";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

// Sample collection data
const sampleCollections: Collection[] = [
  {
    id: "1",
    name: "Design Tools",
    description: "A collection of the best design tools to enhance your workflow",
    isPublic: true,
    products: [
      {
        id: "p1",
        productId: "2",
        name: "Figma",
        tagline: "Collaborative interface design tool",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-10T12:00:00Z"
      },
      {
        id: "p2",
        productId: "3",
        name: "Raycast",
        tagline: "Productivity tool to replace your macOS Spotlight",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-11T12:00:00Z"
      }
    ],
    createdBy: {
      id: "u1",
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    },
    createdAt: "2023-05-10T10:00:00Z",
    updatedAt: "2023-05-11T14:30:00Z",
    followers: 128,
    isFollowing: false
  },
  {
    id: "2",
    name: "AI Productivity Tools",
    description: "Tools that use AI to enhance your productivity and creativity",
    isPublic: true,
    products: [
      {
        id: "p3",
        productId: "1",
        name: "Notion AI",
        tagline: "AI-powered writing assistant integrated with Notion",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-12T09:00:00Z"
      },
      {
        id: "p4",
        productId: "4",
        name: "ChatGPT",
        tagline: "Conversational AI that can chat about anything",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-12T09:30:00Z"
      },
      {
        id: "p5",
        productId: "6",
        name: "Midjourney",
        tagline: "AI-powered image generation from text descriptions",
        image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-12T10:00:00Z"
      }
    ],
    createdBy: {
      id: "u2",
      name: "John Doe",
      avatar: "https://ui-avatars.com/api/?name=John+Doe&background=random"
    },
    createdAt: "2023-05-12T08:00:00Z",
    updatedAt: "2023-05-12T11:00:00Z",
    followers: 245,
    isFollowing: true
  },
  {
    id: "3",
    name: "Developer Tools",
    description: "Essential tools for software developers",
    isPublic: true,
    products: [
      {
        id: "p6",
        productId: "5",
        name: "VS Code",
        tagline: "Code editor redefined and optimized for building modern apps",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-13T15:00:00Z"
      },
      {
        id: "p7",
        productId: "8",
        name: "Supabase",
        tagline: "Open source Firebase alternative with PostgreSQL",
        image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-13T15:30:00Z"
      },
      {
        id: "p8",
        productId: "9",
        name: "Vercel",
        tagline: "Platform for frontend frameworks and static sites",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-13T16:00:00Z"
      }
    ],
    createdBy: {
      id: "u3",
      name: "Alex Johnson",
      avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=random"
    },
    createdAt: "2023-05-13T14:00:00Z",
    updatedAt: "2023-05-13T16:30:00Z",
    followers: 87,
    isFollowing: false
  },
  {
    id: "4",
    name: "My Private Collection",
    description: "A private collection of products I'm interested in",
    isPublic: false,
    products: [
      {
        id: "p9",
        productId: "10",
        name: "Linear",
        tagline: "The issue tracking tool you'll enjoy using",
        image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&w=200&h=200&q=80",
        addedAt: "2023-05-14T10:00:00Z"
      }
    ],
    createdBy: {
      id: "u1",
      name: "Jane Smith",
      avatar: "https://ui-avatars.com/api/?name=Jane+Smith&background=random"
    },
    createdAt: "2023-05-14T09:00:00Z",
    updatedAt: "2023-05-14T10:30:00Z",
    followers: 0,
    isFollowing: false
  }
];

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>(sampleCollections);
  const [activeTab, setActiveTab] = useState<string>("discover");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const { toast } = useToast();

  const handleToggleFollow = (id: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to follow collections",
        variant: "destructive",
      });
      return;
    }
    
    setCollections(prev => 
      prev.map(collection => 
        collection.id === id 
          ? { 
              ...collection, 
              isFollowing: !collection.isFollowing,
              followers: collection.isFollowing 
                ? collection.followers - 1 
                : collection.followers + 1 
            } 
          : collection
      )
    );
  };

  const handleCreateCollection = () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create collections",
        variant: "destructive",
      });
      return;
    }
    
    navigate("/collections/create");
  };

  // Filter collections based on active tab
  const filteredCollections = collections.filter(collection => {
    if (activeTab === "discover") {
      return collection.isPublic;
    } else if (activeTab === "following" && isAuthenticated) {
      return collection.isFollowing;
    } else if (activeTab === "my" && isAuthenticated) {
      return collection.createdBy.id === user?.id;
    }
    return false;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow pt-24 pb-16">
        <section className="py-8 bg-muted/30">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
              <div>
                <h1 className="text-3xl font-bold mb-2">Collections</h1>
                <p className="text-muted-foreground">
                  Discover curated lists of the best products
                </p>
              </div>
              
              <Button
                onClick={handleCreateCollection}
                className="gap-2"
              >
                <PlusCircle className="h-4 w-4" />
                Create Collection
              </Button>
            </div>
            
            <Tabs defaultValue="discover" className="mb-8" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="discover">Discover</TabsTrigger>
                <TabsTrigger value="following" disabled={!isAuthenticated}>Following</TabsTrigger>
                <TabsTrigger value="my" disabled={!isAuthenticated}>My Collections</TabsTrigger>
              </TabsList>
              
              <TabsContent value="discover" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredCollections.map((collection, index) => (
                    <CollectionCard
                      key={collection.id}
                      collection={collection}
                      index={index}
                      onToggleFollow={handleToggleFollow}
                    />
                  ))}
                </div>
                
                {filteredCollections.length === 0 && (
                  <div className="text-center py-10">
                    <p className="text-muted-foreground">No collections found.</p>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="following" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isAuthenticated ? (
                    <>
                      {filteredCollections.map((collection, index) => (
                        <CollectionCard
                          key={collection.id}
                          collection={collection}
                          index={index}
                          onToggleFollow={handleToggleFollow}
                        />
                      ))}
                      
                      {filteredCollections.length === 0 && (
                        <div className="col-span-full text-center py-10">
                          <p className="text-muted-foreground mb-4">You aren't following any collections yet.</p>
                          <Button 
                            variant="outline" 
                            onClick={() => setActiveTab("discover")}
                            className="gap-2"
                          >
                            <BookmarkPlus className="h-4 w-4" />
                            Discover collections
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-muted-foreground">Please sign in to see followed collections.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="my" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {isAuthenticated ? (
                    <>
                      {filteredCollections.map((collection, index) => (
                        <CollectionCard
                          key={collection.id}
                          collection={collection}
                          index={index}
                          onToggleFollow={handleToggleFollow}
                        />
                      ))}
                      
                      {filteredCollections.length === 0 && (
                        <div className="col-span-full text-center py-10">
                          <p className="text-muted-foreground mb-4">You haven't created any collections yet.</p>
                          <Button 
                            onClick={handleCreateCollection}
                            className="gap-2"
                          >
                            <PlusCircle className="h-4 w-4" />
                            Create Collection
                          </Button>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="col-span-full text-center py-10">
                      <p className="text-muted-foreground">Please sign in to see your collections.</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
