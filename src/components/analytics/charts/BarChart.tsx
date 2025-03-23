
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";

interface BarChartProps {
  type: "user" | "maker" | "admin";
  data: any[];
}

const BarChart = ({ type, data }: BarChartProps) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-[200px]">No data available</div>;
  }

  const customizeKeys = () => {
    if (type === "user") {
      return ["upvotes"];
    }
    if (type === "maker") {
      return ["upvotes", "views", "clicks"];
    }
    return ["upvotes", "comments", "views"];
  };

  const keys = customizeKeys();

  return (
    <RechartsBarChart data={data}>
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <XAxis 
        dataKey="date"
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        minTickGap={8}
        tickFormatter={(value) => new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
      />
      <YAxis 
        tickLine={false}
        axisLine={false}
        tickMargin={8}
        tickFormatter={(value) => value.toLocaleString()}
      />
      <Tooltip content={<ChartTooltipContent />} />
      <Legend content={<ChartLegendContent />} />
      {keys.map((key, index) => (
        <Bar 
          key={key}
          type="monotone"
          dataKey={key}
          stackId={type === "admin" ? "stack" : undefined}
          isAnimationActive={true}
          animationDuration={1000}
          animationEasing="ease-in-out"
          barSize={type === "admin" ? 20 : 30}
        />
      ))}
    </RechartsBarChart>
  );
};

export default BarChart;
