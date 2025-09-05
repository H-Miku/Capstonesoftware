import { BarChart3, DollarSign, Percent, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const statsData = [
  {
    title: "Total Users",
    value: "12,847",
    change: "+12.5% from last month",
    trend: "up",
    icon: Users,
    testId: "stat-total-users"
  },
  {
    title: "Revenue",
    value: "$84,623",
    change: "+8.2% from last month",
    trend: "up", 
    icon: DollarSign,
    testId: "stat-revenue"
  },
  {
    title: "Conversion Rate",
    value: "3.24%",
    change: "-2.1% from last month",
    trend: "down",
    icon: Percent,
    testId: "stat-conversion-rate"
  },
  {
    title: "Active Sessions",
    value: "1,432",
    change: "+18.7% from last hour",
    trend: "up",
    icon: BarChart3,
    testId: "stat-active-sessions"
  }
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat) => {
        const Icon = stat.icon;
        return (
          <Card 
            key={stat.title} 
            className="hover:shadow-md transition-shadow"
            data-testid={stat.testId}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                  <p className={`text-xs mt-1 ${
                    stat.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {stat.trend === "up" ? "↗" : "↘"} {stat.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon className="text-primary text-xl" />
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
