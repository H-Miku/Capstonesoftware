import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createRevenueChart, createUserGrowthChart } from "@/lib/chart-config";

export default function Charts() {
  const revenueChartRef = useRef<HTMLCanvasElement>(null);
  const userChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartInstance = useRef<any>(null);
  const userChartInstance = useRef<any>(null);

  useEffect(() => {
    // Destroy existing charts before creating new ones
    if (revenueChartInstance.current) {
      revenueChartInstance.current.destroy();
    }
    if (userChartInstance.current) {
      userChartInstance.current.destroy();
    }

    if (revenueChartRef.current) {
      revenueChartInstance.current = createRevenueChart(revenueChartRef.current);
    }
    
    if (userChartRef.current) {
      userChartInstance.current = createUserGrowthChart(userChartRef.current);
    }

    return () => {
      if (revenueChartInstance.current) {
        revenueChartInstance.current.destroy();
      }
      if (userChartInstance.current) {
        userChartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Enhanced Line Graph */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-primary">Revenue Trends</h3>
            <div className="flex space-x-2">
              <Button 
                size="sm" 
                className="px-3 py-1 text-xs bg-primary text-primary-foreground"
                data-testid="button-revenue-7d"
              >
                7D
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="px-3 py-1 text-xs text-muted-foreground hover:text-primary"
                data-testid="button-revenue-30d"
              >
                30D
              </Button>
              <Button 
                size="sm" 
                variant="ghost" 
                className="px-3 py-1 text-xs text-muted-foreground hover:text-primary"
                data-testid="button-revenue-90d"
              >
                90D
              </Button>
            </div>
          </div>
          <div className="relative h-[300px] w-full">
            <canvas ref={revenueChartRef} data-testid="chart-revenue"></canvas>
          </div>
        </CardContent>
      </Card>

      {/* User Growth Chart */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-primary">User Growth</h3>
            <Select defaultValue="thismonth">
              <SelectTrigger className="w-40" data-testid="select-user-growth-period">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thismonth">This Month</SelectItem>
                <SelectItem value="lastmonth">Last Month</SelectItem>
                <SelectItem value="thisquarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="relative h-[300px] w-full">
            <canvas ref={userChartRef} data-testid="chart-user-growth"></canvas>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
