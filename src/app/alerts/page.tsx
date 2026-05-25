"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { alerts } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { AlertTriangle, Info, XCircle, CheckCircle } from "lucide-react";

const severityConfig = {
  critical: { icon: XCircle, color: "text-red-500", bg: "bg-red-500/10 border-red-500/20", badge: "bg-red-500/15 text-red-500 border border-red-500/30", label: "Critical" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10 border-amber-500/20", badge: "bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30", label: "Warning" },
  info: { icon: Info, color: "text-[#003DA5] dark:text-blue-400", bg: "bg-[#003DA5]/10 border-[#003DA5]/20", badge: "bg-[#003DA5]/10 text-[#003DA5] dark:text-blue-400 border border-[#003DA5]/20", label: "Info" },
};

export default function AlertsPage() {
  const [severity, setSeverity] = useState("all");
  const [showResolved, setShowResolved] = useState(false);

  const filtered = alerts.filter((a) => {
    const matchSeverity = severity === "all" || a.severity === severity;
    const matchResolved = showResolved ? true : !a.resolved;
    return matchSeverity && matchResolved;
  });

  const counts = {
    critical: alerts.filter((a) => a.severity === "critical" && !a.resolved).length,
    warning: alerts.filter((a) => a.severity === "warning" && !a.resolved).length,
    info: alerts.filter((a) => a.severity === "info" && !a.resolved).length,
  };

  return (
    <AppShell title="Alerts & Notifications">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: "Critical", count: counts.critical },
            { label: "Warnings", count: counts.warning },
            { label: "Info", count: counts.info },
          ].map(({ label, count }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground">{label} active</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold">All Alerts</CardTitle>
              <div className="flex flex-wrap gap-2">
                <Select value={severity} onValueChange={(v) => setSeverity(v ?? "all")}>
                  <SelectTrigger className="h-8 text-xs w-32">
                    <SelectValue placeholder="Severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Severity</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="warning">Warning</SelectItem>
                    <SelectItem value="info">Info</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  variant={showResolved ? "default" : "outline"}
                  className={cn("h-8 text-xs", showResolved && "bg-[#003DA5] text-white")}
                  onClick={() => setShowResolved((v) => !v)}
                >
                  {showResolved ? "Showing All" : "Show Resolved"}
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {filtered.map((alert) => {
                const { icon: Icon, color, bg, badge, label } = severityConfig[alert.severity];
                return (
                  <div
                    key={alert.id}
                    className={cn(
                      "flex gap-4 rounded-lg border p-4 transition-opacity",
                      bg,
                      alert.resolved && "opacity-50"
                    )}
                  >
                    <Icon className={cn("h-5 w-5 shrink-0 mt-0.5", color)} />
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                          <Badge className={cn("text-[10px]", badge)}>{label}</Badge>
                          {alert.resolved && (
                            <Badge className="text-[10px] bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 gap-1">
                              <CheckCircle className="h-2.5 w-2.5" />
                              Resolved
                            </Badge>
                          )}
                        </div>
                        <span className="text-[10px] text-muted-foreground shrink-0">{alert.timestamp}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{alert.description}</p>
                      <div className="mt-2 flex flex-wrap gap-3 text-[10px] text-muted-foreground">
                        {alert.robot && <span>Robot: <span className="font-medium text-foreground">{alert.robot}</span></span>}
                        {alert.zone && <span>Zone: <span className="font-medium text-foreground">{alert.zone}</span></span>}
                      </div>
                    </div>
                    {!alert.resolved && (
                      <div className="shrink-0">
                        <Button size="sm" variant="outline" className="h-7 text-[10px] border-current text-[#003DA5]">
                          Resolve
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  No alerts match the current filter.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
