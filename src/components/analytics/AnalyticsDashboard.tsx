
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart, PieChart } from "./charts";
import { ChartContainer } from "@/components/ui/chart";
import StatsCards from "./StatsCards";
import ProductPerformanceTable from "./ProductPerformanceTable";
import { getRandomData } from "@/utils/analytics";

interface AnalyticsDashboardProps {
  type: "user" | "maker" | "admin";
  userId?: string;
}

const AnalyticsDashboard = ({ type, userId }: AnalyticsDashboardProps) => {
  const [period, setPeriod] = useState("7d");
  const [chartData, setChartData] = useState<any[]>([]);
  
  // Simulate fetching data based on period
  useEffect(() => {
    // In a real app, we would fetch data from an API based on type, userId, and period
    setChartData(getRandomData(type, period));
  }, [type, period, userId]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {type === "user" && "User Engagement"}
          {type === "maker" && "Product Performance"}
          {type === "admin" && "Platform Overview"}
        </h2>
        <Select defaultValue={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
            <SelectItem value="1y">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <StatsCards type={type} data={chartData} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>
              {type === "user" && "Profile Views"}
              {type === "maker" && "Product Views"}
              {type === "admin" && "Active Users"}
            </CardTitle>
            <CardDescription>
              {type === "user" && "How many times your profile was viewed"}
              {type === "maker" && "Daily views across all your products"}
              {type === "admin" && "Daily active users on the platform"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{ 
                views: { theme: { light: "#8B5CF6", dark: "#8B5CF6" } } 
              }}
              className="aspect-[4/3]"
            >
              <LineChart type={type} data={chartData} />
            </ChartContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>
              {type === "user" && "Engagement Breakdown"}
              {type === "maker" && "Traffic Sources"}
              {type === "admin" && "Content Distribution"}
            </CardTitle>
            <CardDescription>
              {type === "user" && "Distribution of your platform interactions"}
              {type === "maker" && "Where your product views are coming from"}
              {type === "admin" && "Types of content on the platform"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer 
              config={{ 
                direct: { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
                social: { theme: { light: "#D946EF", dark: "#D946EF" } },
                search: { theme: { light: "#F97316", dark: "#F97316" } },
                referral: { theme: { light: "#0EA5E9", dark: "#0EA5E9" } },
                other: { theme: { light: "#8E9196", dark: "#8E9196" } }
              }}
              className="aspect-[4/3]"
            >
              <PieChart type={type} data={chartData} />
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      
      {type === "maker" && (
        <ProductPerformanceTable data={chartData} period={period} />
      )}
      
      <Card>
        <CardHeader>
          <CardTitle>
            {type === "user" && "Upvote Activity"}
            {type === "maker" && "Upvote Velocity"}
            {type === "admin" && "Platform Engagement"}
          </CardTitle>
          <CardDescription>
            {type === "user" && "Products you've upvoted over time"}
            {type === "maker" && "Rate of new upvotes across your products"}
            {type === "admin" && "Daily engagement metrics"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer 
            config={{ 
              upvotes: { theme: { light: "#8B5CF6", dark: "#8B5CF6" } },
              comments: { theme: { light: "#F97316", dark: "#F97316" } },
              views: { theme: { light: "#0EA5E9", dark: "#0EA5E9" } }
            }}
            className="aspect-[16/9]"
          >
            <BarChart type={type} data={chartData} />
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
