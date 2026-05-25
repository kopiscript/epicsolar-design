"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { robots } from "@/lib/mock-data";
import type { Robot } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Search, Bot, Battery, MapPin, Wrench, AlertTriangle } from "lucide-react";

const statusStyle: Record<string, string> = {
  cleaning: "bg-[#003DA5] text-white",
  charging: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30",
  idle: "bg-muted text-muted-foreground border border-border",
  fault: "bg-red-500/15 text-red-500 border border-red-500/30",
};

const batteryColor = (b: number) =>
  b > 60 ? "bg-emerald-500" : b > 30 ? "bg-[#FCC63A]" : "bg-red-500";

function RobotDetail({ robot, onClose }: { robot: Robot; onClose: () => void }) {
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-[#003DA5]" />
            {robot.name}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Badge className={cn("text-xs", statusStyle[robot.status])}>
              {robot.status.charAt(0).toUpperCase() + robot.status.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground">ID: {robot.id}</span>
          </div>

          {robot.errorCode && (
            <div className="flex gap-2 rounded-lg bg-red-500/10 p-3 text-red-500">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <p className="text-xs">{robot.errorCode}</p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Current Zone", value: robot.zone, icon: MapPin },
              { label: "Firmware", value: robot.firmwareVersion, icon: Bot },
              { label: "Last Maintenance", value: robot.lastMaintenance, icon: Wrench },
              { label: "Total Cleaned", value: `${robot.totalCleaned.toLocaleString()} panels`, icon: Bot },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="rounded-lg bg-muted/50 p-3">
                <div className="flex items-center gap-1.5 text-muted-foreground mb-1">
                  <Icon className="h-3 w-3" />
                  <p className="text-[10px]">{label}</p>
                </div>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Battery className="h-3 w-3" />
                <span className="text-xs">Battery Level</span>
              </div>
              <span className="text-sm font-semibold">{robot.battery}%</span>
            </div>
            <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={cn("h-full rounded-full transition-all", batteryColor(robot.battery))}
                style={{ width: `${robot.battery}%` }}
              />
            </div>
          </div>

          <div className="rounded-lg bg-[#003DA5]/5 p-3">
            <p className="text-xs text-muted-foreground">Panels cleaned today</p>
            <p className="text-2xl font-bold text-[#003DA5]">{robot.cleanedToday}</p>
          </div>

          <div className="flex gap-2">
            <Button size="sm" variant="outline" className="flex-1">
              Schedule Maintenance
            </Button>
            <Button size="sm" className="flex-1 bg-[#003DA5] hover:bg-[#002d7a] text-white">
              Assign to Zone
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function DMSPage() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Robot | null>(null);

  const filtered = robots.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.zone.toLowerCase().includes(search.toLowerCase())
  );

  const counts = {
    all: robots.length,
    cleaning: robots.filter((r) => r.status === "cleaning").length,
    charging: robots.filter((r) => r.status === "charging").length,
    idle: robots.filter((r) => r.status === "idle").length,
    fault: robots.filter((r) => r.status === "fault").length,
  };

  return (
    <AppShell title="Device Management System (DMS)">
      <div className="space-y-6">
        {/* Summary row */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Cleaning", count: counts.cleaning },
            { label: "Charging", count: counts.charging },
            { label: "Idle", count: counts.idle },
            { label: "Fault", count: counts.fault },
          ].map(({ label, count }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by robot name, ID or zone..."
            className="pl-9"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Robot grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((robot) => (
            <Card
              key={robot.id}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelected(robot)}
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003DA5]/10">
                      <Bot className="h-5 w-5 text-[#003DA5]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{robot.name}</p>
                      <p className="text-xs text-muted-foreground">{robot.id}</p>
                    </div>
                  </div>
                  <Badge className={cn("text-[10px] shrink-0", statusStyle[robot.status])}>
                    {robot.status.charAt(0).toUpperCase() + robot.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>Zone: <span className="font-medium text-foreground">{robot.zone}</span></span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Bot className="h-3 w-3" />
                    <span>Cleaned today: <span className="font-medium text-foreground">{robot.cleanedToday} panels</span></span>
                  </div>
                </div>

                <div className="mt-3">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span className="flex items-center gap-1"><Battery className="h-3 w-3" />Battery</span>
                    <span className="font-medium text-foreground">{robot.battery}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div
                      className={cn("h-full rounded-full", batteryColor(robot.battery))}
                      style={{ width: `${robot.battery}%` }}
                    />
                  </div>
                </div>

                {robot.errorCode && (
                  <div className="mt-3 flex items-center gap-1.5 rounded-md bg-red-50 px-2 py-1.5">
                    <AlertTriangle className="h-3 w-3 text-red-600 shrink-0" />
                    <p className="text-[10px] text-red-600 truncate">{robot.errorCode}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selected && <RobotDetail robot={selected} onClose={() => setSelected(null)} />}
    </AppShell>
  );
}
