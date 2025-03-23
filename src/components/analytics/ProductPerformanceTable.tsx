
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, ExternalLink } from "lucide-react";

interface ProductPerformanceTableProps {
  data: any[];
  period: string;
}

const ProductPerformanceTable = ({ data, period }: ProductPerformanceTableProps) => {
  // Simulated product performance data
  const products = [
    {
      id: "1",
      name: "DesignMaster Pro",
      upvotes: 245,
      upvoteChange: 12.5,
      views: 1982,
      viewsChange: 8.7,
      clicks: 645,
      clickRate: "32.5%",
      conversionRate: "4.2%",
    },
    {
      id: "2",
      name: "TaskFlow",
      upvotes: 187,
      upvoteChange: -3.2,
      views: 1546,
      viewsChange: 5.1,
      clicks: 412,
      clickRate: "26.7%",
      conversionRate: "3.8%",
    },
    {
      id: "3",
      name: "FinTrack",
      upvotes: 132,
      upvoteChange: 22.8,
      views: 876,
      viewsChange: 18.3,
      clicks: 287,
      clickRate: "32.8%",
      conversionRate: "5.1%",
    }
  ];

  return (
    <div className="rounded-md border">
      <div className="px-4 py-3 border-b">
        <h3 className="font-medium">Product Performance</h3>
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="text-right">Upvotes</TableHead>
              <TableHead className="text-right">Views</TableHead>
              <TableHead className="text-right">Clicks</TableHead>
              <TableHead className="text-right">Click Rate</TableHead>
              <TableHead className="text-right">Conversion</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span>{product.upvotes}</span>
                    <div className={`flex items-center text-xs ${
                      product.upvoteChange >= 0 ? "text-emerald-500" : "text-rose-500"
                    }`}>
                      {product.upvoteChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowUpRight className="h-3 w-3 mr-0.5 rotate-180" />}
                      <span>{Math.abs(product.upvoteChange)}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex flex-col items-end">
                    <span>{product.views.toLocaleString()}</span>
                    <div className={`flex items-center text-xs ${
                      product.viewsChange >= 0 ? "text-emerald-500" : "text-rose-500"
                    }`}>
                      {product.viewsChange >= 0 ? <ArrowUpRight className="h-3 w-3 mr-0.5" /> : <ArrowUpRight className="h-3 w-3 mr-0.5 rotate-180" />}
                      <span>{Math.abs(product.viewsChange)}%</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right">{product.clicks.toLocaleString()}</TableCell>
                <TableCell className="text-right">{product.clickRate}</TableCell>
                <TableCell className="text-right">{product.conversionRate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ProductPerformanceTable;
