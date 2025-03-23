
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Search, Shield, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";

const ContentModerationPanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();
  
  // Simulated content data
  const contentItems = [
    {
      id: "content1",
      type: "Product",
      name: "AI Writer Pro",
      description: "AI tool for writing blog posts and articles",
      status: "Pending",
      reportCount: 0,
      submittedBy: "mark.johnson",
      submittedAt: new Date(2023, 5, 15),
    },
    {
      id: "content2",
      type: "Comment",
      name: "Comment on DesignMaster",
      description: "This tool completely transformed my workflow!",
      status: "Flagged",
      reportCount: 2,
      submittedBy: "user123",
      submittedAt: new Date(2023, 5, 16),
    },
    {
      id: "content3",
      type: "Product",
      name: "DataViz Dashboard",
      description: "Interactive data visualization dashboard",
      status: "Pending",
      reportCount: 0,
      submittedBy: "dataExpert",
      submittedAt: new Date(2023, 5, 17),
    },
  ];
  
  const handleApprove = (id: string) => {
    toast({
      title: "Content approved",
      description: "The content has been approved and is now visible to users.",
    });
  };
  
  const handleReject = (id: string) => {
    toast({
      title: "Content rejected",
      description: "The content has been rejected and is not visible to users.",
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
          <Shield className="h-5 w-5 text-primary" />
          Content Moderation
        </CardTitle>
        <CardDescription>
          Review and moderate user-submitted content
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search content..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Content</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Submitted by</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contentItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{item.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback>{item.submittedBy.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm">{item.submittedBy}</span>
                    </div>
                  </TableCell>
                  <TableCell>{formatDate(item.submittedAt)}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        item.status === "Approved" ? "outline" :
                        item.status === "Rejected" ? "destructive" :
                        item.status === "Flagged" ? "destructive" : "outline"
                      }
                      className={
                        item.status === "Pending" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100" :
                        item.status === "Flagged" ? "bg-red-100" : ""
                      }
                    >
                      {item.status === "Flagged" && (
                        <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                      )}
                      {item.status}
                      {item.reportCount > 0 && ` (${item.reportCount})`}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(item.id)}
                        className="h-8 gap-1"
                      >
                        <XCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Reject</span>
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(item.id)}
                        className="h-8 gap-1"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span className="hidden sm:inline">Approve</span>
                      </Button>
                    </div>
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

export default ContentModerationPanel;
