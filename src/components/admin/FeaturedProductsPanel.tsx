
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Search, Calendar, Star, ChevronUp, MessageSquare, Clock, PlusCircle, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";

const FeaturedProductsPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Simulated product data
  const featuredProducts = [
    {
      id: "prod1",
      name: "DesignMaster Pro",
      image: "https://placehold.co/400x400/png",
      category: "Design Tools",
      upvotes: 245,
      comments: 32,
      featuredUntil: new Date(2023, 6, 25),
      maker: {
        name: "Jane Smith",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
      },
      active: true,
    },
    {
      id: "prod2",
      name: "TaskFlow",
      image: "https://placehold.co/400x400/png",
      category: "Productivity",
      upvotes: 187,
      comments: 24,
      featuredUntil: new Date(2023, 7, 5),
      maker: {
        name: "John Doe",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
      },
      active: true,
    },
    {
      id: "prod3",
      name: "FinTrack",
      image: "https://placehold.co/400x400/png",
      category: "Finance",
      upvotes: 132,
      comments: 18,
      featuredUntil: new Date(2023, 6, 30),
      maker: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
      },
      active: false,
    },
  ];
  
  const handleToggleFeatured = (id: string) => {
    const product = featuredProducts.find(p => p.id === id);
    
    toast({
      title: product?.active ? "Product unfeatured" : "Product featured",
      description: product?.active 
        ? `${product.name} has been removed from featured products.`
        : `${product.name} has been added to featured products.`,
    });
  };
  
  const handleRemove = (id: string) => {
    const product = featuredProducts.find(p => p.id === id);
    
    toast({
      title: "Product removed",
      description: `${product?.name} has been removed from the featured products list.`,
      variant: "destructive",
    });
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Featured Products
        </CardTitle>
        <CardDescription>
          Manage which products are featured on the platform
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="gap-1.5">
            <PlusCircle className="h-4 w-4" />
            Add Product
          </Button>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Stats</TableHead>
                <TableHead>Featured Until</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {featuredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-10 w-10 rounded-md object-cover"
                      />
                      <div>
                        <div className="font-medium">{product.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Avatar className="h-4 w-4">
                            <AvatarImage src={product.maker.avatar} alt={product.maker.name} />
                            <AvatarFallback>{product.maker.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {product.maker.name}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1 text-sm">
                        <ChevronUp className="h-4 w-4 text-brand-orange" />
                        <span>{product.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <MessageSquare className="h-4 w-4 text-muted-foreground" />
                        <span>{product.comments}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{formatDate(product.featuredUntil)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Switch 
                        checked={product.active} 
                        onCheckedChange={() => handleToggleFeatured(product.id)}
                        id={`featured-switch-${product.id}`}
                      />
                      <span className={product.active ? "text-sm" : "text-sm text-muted-foreground"}>
                        {product.active ? "Active" : "Inactive"}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleRemove(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedProductsPanel;
