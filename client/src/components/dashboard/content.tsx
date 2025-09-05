import { Card, CardContent } from "@/components/ui/card";

const topContent = [
  {
    id: 1,
    title: "Data Visualization Guide",
    views: "8,247 views",
    change: "+24%",
    trend: "up"
  },
  {
    id: 2,
    title: "API Documentation",
    views: "5,832 views", 
    change: "+18%",
    trend: "up"
  },
  {
    id: 3,
    title: "Dashboard Tutorial",
    views: "4,291 views",
    change: "-3%",
    trend: "down"
  }
];

export default function TopContent() {
  return (
    <Card>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold text-primary mb-4">Top Content</h3>
        <div className="space-y-4">
          {topContent.map((content) => (
            <div 
              key={content.id}
              className="flex items-center justify-between"
              data-testid={`content-${content.id}`}
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{content.title}</p>
                <p className="text-xs text-muted-foreground">{content.views}</p>
              </div>
              <span className={`text-xs font-medium ${
                content.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {content.change}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
