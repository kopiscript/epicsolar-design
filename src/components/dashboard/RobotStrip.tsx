import { robots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const statusDot: Record<string, string> = {
  cleaning:  "bg-[#003DA5]",
  charging:  "bg-emerald-500",
  idle:      "bg-muted-foreground/40",
  fault:     "bg-red-500",
};

const statusLabel: Record<string, string> = {
  cleaning: "Cleaning",
  charging: "Charging",
  idle:     "Idle",
  fault:    "Fault",
};

export function RobotStrip() {
  return (
    <div className="bg-card border border-border rounded-lg px-5 py-3 flex items-center gap-2 flex-wrap">
      <p className="text-[11px] font-medium text-muted-foreground mr-2 shrink-0">Fleet</p>
      {robots.map((robot) => (
        <div
          key={robot.id}
          className="flex items-center gap-2 rounded-full border border-border bg-muted/40 px-3 py-1.5"
        >
          <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", statusDot[robot.status])} />
          <span className="text-xs font-medium text-foreground">{robot.id}</span>
          <span className="text-[10px] text-muted-foreground">{statusLabel[robot.status]}</span>
          <span className="text-[10px] text-muted-foreground">·</span>
          <span className={cn(
            "text-[10px] font-medium",
            robot.battery > 60 ? "text-emerald-600" : robot.battery > 30 ? "text-amber-500" : "text-red-500"
          )}>
            {robot.battery}%
          </span>
        </div>
      ))}
    </div>
  );
}
