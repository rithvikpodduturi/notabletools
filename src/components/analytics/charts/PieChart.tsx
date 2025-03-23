
import { Pie, PieChart as RechartsPieChart, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartTooltipContent, ChartLegendContent } from "@/components/ui/chart";

interface PieChartProps {
  type: "user" | "maker" | "admin";
  data: any[];
}

const PieChart = ({ type, data }: PieChartProps) => {
  // For pie chart, we need to transform the data
  const pieData = [
    { name: 'Direct', value: 35, key: 'direct' },
    { name: 'Social', value: 25, key: 'social' },
    { name: 'Search', value: 18, key: 'search' },
    { name: 'Referral', value: 15, key: 'referral' },
    { name: 'Other', value: 7, key: 'other' },
  ];

  // Customized pie data based on type
  if (type === "user") {
    pieData[0].name = "Upvotes";
    pieData[1].name = "Comments";
    pieData[2].name = "Profile Views";
    pieData[3].name = "Shares";
    pieData[4].name = "Other";
  } else if (type === "admin") {
    pieData[0].name = "Products";
    pieData[1].name = "Collections";
    pieData[2].name = "Topics";
    pieData[3].name = "Comments";
    pieData[4].name = "Other";
  }

  return (
    <RechartsPieChart>
      <Pie
        data={pieData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={80}
        innerRadius={40}
        paddingAngle={2}
        isAnimationActive={true}
        animationDuration={1000}
        animationEasing="ease-in-out"
      />
      <Legend content={<ChartLegendContent />} />
      <Tooltip content={<ChartTooltipContent />} />
    </RechartsPieChart>
  );
};

export default PieChart;
