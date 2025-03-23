
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, ChevronsUp, Users, Eye, MessageSquare, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  type: "user" | "maker" | "admin";
  data: any[];
}

const StatsCards = ({ type, data }: StatsCardsProps) => {
  // In a real app, these would be calculated from actual data
  const stats = [
    {
      title: type === "user" ? "Upvotes Given" : type === "maker" ? "Total Upvotes" : "Total Users",
      value: "1,246",
      change: 12.5,
      icon: ChevronsUp,
    },
    {
      title: type === "user" ? "Profile Views" : type === "maker" ? "Product Views" : "Daily Active Users",
      value: "3,782",
      change: 8.2,
      icon: Eye,
    },
    {
      title: type === "user" ? "Comments" : type === "maker" ? "Conversion Rate" : "New Products",
      value: type === "maker" ? "3.8%" : "342",
      change: type === "maker" ? 2.1 : 24.3,
      icon: MessageSquare,
    },
    {
      title: type === "user" ? "Following" : type === "maker" ? "Click Rate" : "Total Interactions",
      value: type === "maker" ? "5.2%" : "168",
      change: type === "maker" ? -1.5 : 18.7,
      icon: type === "user" ? Users : Share2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground mb-1">{stat.title}</p>
                <h4 className="text-2xl font-bold">{stat.value}</h4>
              </div>
              <div className={cn(
                "p-2 rounded-full",
                "bg-primary/10"
              )}>
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              {stat.change > 0 ? (
                <div className="flex items-center text-emerald-500 text-sm font-medium">
                  <ArrowUpRight className="h-4 w-4 mr-1" />
                  <span>{stat.change}%</span>
                </div>
              ) : (
                <div className="flex items-center text-rose-500 text-sm font-medium">
                  <ArrowDownRight className="h-4 w-4 mr-1" />
                  <span>{Math.abs(stat.change)}%</span>
                </div>
              )}
              <span className="text-xs text-muted-foreground ml-2">vs previous period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StatsCards;
