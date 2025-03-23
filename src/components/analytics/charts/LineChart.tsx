
import { Line, LineChart as RechartsLineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartTooltipContent } from "@/components/ui/chart";

interface LineChartProps {
  type: "user" | "maker" | "admin";
  data: any[];
}

const LineChart = ({ type, data }: LineChartProps) => {
  if (!data || data.length === 0) {
    return <div className="flex items-center justify-center h-[200px]">No data available</div>;
  }

  return (
    <RechartsLineChart data={data}>
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
      <CartesianGrid strokeDasharray="3 3" vertical={false} />
      <Tooltip content={<ChartTooltipContent />} />
      <Line
        type="monotone"
        strokeWidth={2}
        dataKey="views"
        activeDot={{ r: 6, style: { fill: "var(--color-views)", opacity: 0.8 } }}
        isAnimationActive={true}
        animationDuration={1000}
      />
    </RechartsLineChart>
  );
};

export default LineChart;
