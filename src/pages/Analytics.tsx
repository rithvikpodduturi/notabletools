
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnalyticsDashboard from "@/components/analytics/AnalyticsDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ShieldAlert, User, Lock } from "lucide-react";

const Analytics = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("user");
  
  // In a real app, we would check if user is a maker (has products)
  const isMaker = true;
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-medium mb-2">Authentication Required</h3>
              <p className="text-muted-foreground mb-6">
                Please log in to view your analytics dashboard.
              </p>
              <Button onClick={() => navigate("/login")}>Sign In</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
            <p className="text-muted-foreground">
              Track your platform engagement and performance
            </p>
          </div>
        </div>

        <Tabs 
          defaultValue={activeTab} 
          className="space-y-4"
          onValueChange={setActiveTab}
        >
          <TabsList>
            <TabsTrigger value="user" className="flex items-center gap-1.5">
              <User className="h-4 w-4" />
              User Analytics
            </TabsTrigger>
            {isMaker && (
              <TabsTrigger value="maker" className="flex items-center gap-1.5">
                <ShieldAlert className="h-4 w-4" />
                Maker Analytics
              </TabsTrigger>
            )}
          </TabsList>
          
          <TabsContent value="user">
            <AnalyticsDashboard type="user" userId={user?.id} />
          </TabsContent>
          
          {isMaker && (
            <TabsContent value="maker">
              <AnalyticsDashboard type="maker" userId={user?.id} />
            </TabsContent>
          )}
        </Tabs>
      </main>
      <Footer />
    </div>
  );
};

export default Analytics;
