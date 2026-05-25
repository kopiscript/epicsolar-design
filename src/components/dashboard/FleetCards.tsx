import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { robots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusStyle: Record<string, string> = {
  cleaning: "bg-[#003DA5] text-white",
  charging: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  idle: "bg-muted text-muted-foreground border border-border",
  fault: "bg-red-100 text-red-700 border border-red-300",
};

const batteryColor = (b: number) =>
  b > 60 ? "bg-emerald-500" : b > 30 ? "bg-[#FCC63A]" : "bg-red-500";

export function FleetCards() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold">Robot Fleet Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {robots.map((robot) => (
            <div
              key={robot.id}
              className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/40 transition-colors"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#003DA5]/10 text-xs font-bold text-[#003DA5]">
                {robot.id}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-foreground">
                    {robot.name}
                  </p>
                  <Badge className={cn("text-[10px] shrink-0", statusStyle[robot.status])}>
                    {robot.status.charAt(0).toUpperCase() + robot.status.slice(1)}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Zone: {robot.zone}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div
                    className={cn(
                      "h-1.5 flex-1 rounded-full overflow-hidden bg-muted"
                    )}
                  >
                    <div
                      className={cn("h-full rounded-full", batteryColor(robot.battery))}
                      style={{ width: `${robot.battery}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-muted-foreground w-8 text-right">
                    {robot.battery}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
