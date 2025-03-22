
import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle, XCircle, Clock, Calendar, ThumbsUp, AlertCircle } from "lucide-react";

// Example data - In a real application, this would come from an API
const pendingProducts = [
  {
    id: "prod1",
    name: "DesignMaster Pro",
    tagline: "AI-powered design tool for professionals",
    image: "https://placehold.co/400x400/png",
    submittedAt: new Date(2023, 6, 15),
    maker: {
      name: "Jane Smith",
      avatar: "https://placehold.co/100/png",
    },
    scheduled: false,
  },
  {
    id: "prod2",
    name: "TaskFlow",
    tagline: "Streamline your workflow with our intuitive task manager",
    image: "https://placehold.co/400x400/png",
    submittedAt: new Date(2023, 6, 14),
    maker: {
      name: "John Doe",
      avatar: "https://placehold.co/100/png",
    },
    scheduled: true,
    scheduledDate: new Date(2023, 7, 1),
  },
  {
    id: "prod3",
    name: "FinTrack",
    tagline: "Personal finance management on the go",
    image: "https://placehold.co/400x400/png",
    submittedAt: new Date(2023, 6, 13),
    maker: {
      name: "Sarah Johnson",
      avatar: "https://placehold.co/100/png",
    },
    scheduled: false,
  },
];

const approvedProducts = [
  {
    id: "prod4",
    name: "CodeBuddy",
    tagline: "Your AI programming assistant",
    image: "https://placehold.co/400x400/png",
    approvedAt: new Date(2023, 6, 10),
    scheduledDate: new Date(2023, 7, 10),
    maker: {
      name: "Mike Williams",
      avatar: "https://placehold.co/100/png",
    },
    upvotes: 124,
  },
  {
    id: "prod5",
    name: "HealthHub",
    tagline: "All your health metrics in one place",
    image: "https://placehold.co/400x400/png",
    approvedAt: new Date(2023, 6, 9),
    maker: {
      name: "Lisa Brown",
      avatar: "https://placehold.co/100/png",
    },
    upvotes: 89,
  },
];

const Admin = () => {
  const [pendingItems, setPendingItems] = useState(pendingProducts);
  const [approvedItems, setApprovedItems] = useState(approvedProducts);
  const { toast } = useToast();
  
  const handleApprove = (id: string) => {
    const product = pendingItems.find(item => item.id === id);
    if (product) {
      // Add to approved list
      setApprovedItems([
        {
          ...product,
          approvedAt: new Date(),
          upvotes: 0,
        },
        ...approvedItems,
      ]);
      
      // Remove from pending list
      setPendingItems(pendingItems.filter(item => item.id !== id));
      
      toast({
        title: "Product approved",
        description: product.scheduled
          ? `${product.name} will be published on the scheduled date`
          : `${product.name} has been published`,
      });
    }
  };
  
  const handleReject = (id: string) => {
    const product = pendingItems.find(item => item.id === id);
    if (product) {
      // Remove from pending list
      setPendingItems(pendingItems.filter(item => item.id !== id));
      
      toast({
        title: "Product rejected",
        description: `${product.name} has been rejected`,
        variant: "destructive",
      });
    }
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage product submissions and approvals
            </p>
          </div>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList>
            <TabsTrigger value="pending" className="relative">
              Pending
              {pendingItems.length > 0 && (
                <Badge className="ml-2 bg-brand-orange text-white">
                  {pendingItems.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            {pendingItems.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-10">
                  <div className="flex justify-center mb-4">
                    <CheckCircle className="h-12 w-12 text-muted-foreground/60" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">All caught up!</h3>
                  <p className="text-muted-foreground">
                    There are no pending submissions to review.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {pendingItems.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-0">
                      <div className="flex items-center p-4 gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{product.name}</h3>
                              <p className="text-muted-foreground">{product.tagline}</p>
                              
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={product.maker.avatar} alt={product.maker.name} />
                                    <AvatarFallback>{product.maker.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{product.maker.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <Clock className="h-3.5 w-3.5" />
                                  <span>Submitted {formatDate(product.submittedAt)}</span>
                                </div>
                                
                                {product.scheduled && product.scheduledDate && (
                                  <Badge variant="outline" className="gap-1 text-xs">
                                    <Calendar className="h-3 w-3" />
                                    <span>Scheduled for {formatDate(product.scheduledDate)}</span>
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleReject(product.id)}
                              >
                                <XCircle className="h-4 w-4 mr-1 text-destructive" />
                                Reject
                              </Button>
                              <Button 
                                size="sm"
                                onClick={() => handleApprove(product.id)}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="approved">
            {approvedItems.length === 0 ? (
              <Card>
                <CardContent className="pt-6 text-center py-10">
                  <div className="flex justify-center mb-4">
                    <AlertCircle className="h-12 w-12 text-muted-foreground/60" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No approved products</h3>
                  <p className="text-muted-foreground">
                    There are no approved products yet.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {approvedItems.map((product) => (
                  <Card key={product.id}>
                    <CardContent className="p-0">
                      <div className="flex items-center p-4 gap-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-md object-cover"
                        />
                        
                        <div className="flex-grow">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-lg">{product.name}</h3>
                              <p className="text-muted-foreground">{product.tagline}</p>
                              
                              <div className="flex items-center gap-4 mt-2 flex-wrap">
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <Avatar className="h-5 w-5">
                                    <AvatarImage src={product.maker.avatar} alt={product.maker.name} />
                                    <AvatarFallback>{product.maker.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{product.maker.name}</span>
                                </div>
                                
                                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                  <CheckCircle className="h-3.5 w-3.5" />
                                  <span>Approved {formatDate(product.approvedAt)}</span>
                                </div>
                                
                                {product.scheduledDate && new Date() < product.scheduledDate && (
                                  <Badge variant="outline" className="gap-1 text-xs">
                                    <Calendar className="h-3 w-3" />
                                    <span>Launches {formatDate(product.scheduledDate)}</span>
                                  </Badge>
                                )}
                                
                                <div className="flex items-center gap-1 text-sm">
                                  <ThumbsUp className="h-3.5 w-3.5" />
                                  <span>{product.upvotes}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
