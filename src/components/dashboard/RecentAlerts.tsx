import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const severityDot: Record<string, string> = {
  critical: "bg-red-500",
  warning:  "bg-[#FCC63A]",
  info:     "bg-[#003DA5]",
};

const severityText: Record<string, string> = {
  critical: "text-red-600",
  warning:  "text-amber-600",
  info:     "text-[#003DA5]",
};

export function RecentAlerts() {
  const recent = alerts.filter((a) => !a.resolved).slice(0, 5);

  return (
    <div className="bg-card h-full flex flex-col gap-5 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between bg-gradient-to-r from-[#FCC63A]/8 to-transparent dark:from-[#FCC63A]/12 px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#FCC63A]" />
          <p className="text-sm font-semibold text-foreground">Live Alerts</p>
        </div>
        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[11px] font-medium text-red-600 shadow-sm shadow-red-500/20">
          {recent.length} active
        </span>
      </div>

      {/* Feed */}
      <div className="flex flex-col divide-y divide-border flex-1 px-6 pb-6">
        {recent.map((alert) => (
          <div key={alert.id} className="flex gap-3 py-3.5 first:pt-0">
            <div className="mt-1.5 flex flex-col items-center gap-1">
              <span className={cn("h-2 w-2 rounded-full shrink-0", severityDot[alert.severity])} />
              <span className="w-px flex-1 bg-border" />
            </div>
            <div className="min-w-0 pb-1">
              <p className={cn("text-xs font-semibold leading-snug", severityText[alert.severity])}>
                {alert.title}
              </p>
              <p className="mt-0.5 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                {alert.description}
              </p>
              <div className="mt-1.5 flex items-center gap-2 text-[10px] text-muted-foreground/70">
                {alert.robot && <span>{alert.robot}</span>}
                {alert.robot && alert.zone && <span>·</span>}
                {alert.zone && <span>Zone {alert.zone}</span>}
                <span>·</span>
                <span>{alert.timestamp.split(" ")[1]}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
