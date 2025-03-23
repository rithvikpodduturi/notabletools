
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "@/components/admin/AdminDashboard";

const Admin = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  
  // In a real app, check if user has admin role
  const isAdmin = isAuthenticated;

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-16 flex items-center justify-center">
          <Card className="w-full max-w-md">
            <CardContent className="pt-6 text-center py-10">
              <div className="flex justify-center mb-4">
                <Lock className="h-12 w-12 text-muted-foreground/60" />
              </div>
              <h3 className="text-xl font-medium mb-2">Access Restricted</h3>
              <p className="text-muted-foreground mb-6">
                You need administrator privileges to access this page.
              </p>
              <Button onClick={() => navigate("/login")}>
                {isAuthenticated ? "Return to Home" : "Sign In"}
              </Button>
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
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage platform content, users, and settings
            </p>
          </div>
        </div>

        <AdminDashboard userId={user?.id || ""} />
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
