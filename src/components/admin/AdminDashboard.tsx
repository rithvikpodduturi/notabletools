
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import ContentModerationPanel from "./ContentModerationPanel";
import UserManagementPanel from "./UserManagementPanel";
import FeaturedProductsPanel from "./FeaturedProductsPanel";
import { AlertTriangle, Settings, Users, Award, Activity, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  userId: string;
}

const AdminDashboard = ({ userId }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  const handleReportResolution = () => {
    toast({
      title: "Report processed",
      description: "The reported content has been reviewed and appropriate action taken.",
    });
  };
  
  // Simulated abuse reports data
  const abuseReports = [
    {
      id: "report1",
      type: "Comment",
      content: "Inappropriate language in comment on TaskFlow",
      reporter: "jane.doe",
      reportedAt: new Date(2023, 5, 15),
      status: "pending",
    },
    {
      id: "report2",
      type: "Product",
      content: "Misleading description for FinTrack product",
      reporter: "john.smith",
      reportedAt: new Date(2023, 5, 14),
      status: "pending",
    },
    {
      id: "report3",
      type: "User",
      content: "Spam activity from user marketingbot123",
      reporter: "admin.user",
      reportedAt: new Date(2023, 5, 13),
      status: "resolved",
    },
  ];
  
  const pendingReports = abuseReports.filter(report => report.status === "pending");
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeTab} className="space-y-4" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
          <TabsTrigger value="overview" className="flex items-center gap-1.5">
            <Activity className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-1.5">
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">Moderation</span>
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Users</span>
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-1.5">
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Featured</span>
          </TabsTrigger>
          <TabsTrigger value="reports" className="relative flex items-center gap-1.5">
            <Flag className="h-4 w-4" />
            <span className="hidden sm:inline">Reports</span>
            {pendingReports.length > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-[10px]">
                {pendingReports.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <AnalyticsDashboard type="admin" />
        </TabsContent>
        
        <TabsContent value="content">
          <ContentModerationPanel />
        </TabsContent>
        
        <TabsContent value="users">
          <UserManagementPanel />
        </TabsContent>
        
        <TabsContent value="featured">
          <FeaturedProductsPanel />
        </TabsContent>
        
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Abuse Reports
              </CardTitle>
              <CardDescription>
                Review and take action on reported content
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReports.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No pending reports to review</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingReports.map((report) => (
                    <Card key={report.id}>
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Badge variant="outline">{report.type}</Badge>
                              <span className="text-sm text-muted-foreground">
                                Reported by {report.reporter} on {formatDate(report.reportedAt)}
                              </span>
                            </div>
                            <p className="text-sm">{report.content}</p>
                          </div>
                          <div className="flex gap-2 self-end md:self-auto">
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={handleReportResolution}
                            >
                              Dismiss
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={handleReportResolution}
                            >
                              Take Action
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
