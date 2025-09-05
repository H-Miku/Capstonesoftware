import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, BarChart3, UserPlus } from "lucide-react";

const activities = [
  {
    id: 1,
    type: "user_registration",
    title: "New user registration",
    description: "sarah.johnson@email.com joined",
    time: "2 min ago",
    icon: UserPlus,
    iconColor: "text-primary bg-primary/10"
  },
  {
    id: 2,
    type: "purchase",
    title: "Purchase completed",
    description: "Order #12847 - $299.99",
    time: "5 min ago",
    icon: ShoppingCart,
    iconColor: "text-green-600 bg-green-100"
  },
  {
    id: 3,
    type: "report",
    title: "Report generated",
    description: "Monthly analytics report",
    time: "15 min ago",
    icon: BarChart3,
    iconColor: "text-blue-600 bg-blue-100"
  }
];

export default function ActivityFeed() {
  return (
    <Card className="lg:col-span-2">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = activity.icon;
            return (
              <div 
                key={activity.id}
                className="flex items-center space-x-4 p-3 hover:bg-muted/50 rounded-lg transition-colors"
                data-testid={`activity-${activity.type}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.iconColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">{activity.description}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
