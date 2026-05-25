"use client";

import { useState } from "react";
import { zones, robots } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import type { Zone } from "@/lib/mock-data";

const statusConfig = {
  cleaned:       { bg: "bg-[#003DA5]",  text: "text-white",            label: "Cleaned",     dot: "bg-[#003DA5]" },
  "in-progress": { bg: "bg-[#FCC63A]",  text: "text-black",            label: "In Progress", dot: "bg-[#FCC63A]" },
  pending:       { bg: "bg-muted",       text: "text-muted-foreground", label: "Pending",     dot: "bg-muted-foreground/40" },
  fault:         { bg: "bg-red-500",    text: "text-white",            label: "Fault",       dot: "bg-red-500" },
};

export function FarmMap() {
  const [selected, setSelected] = useState<Zone | null>(null);

  const rows = [
    zones.filter((z) => z.id.startsWith("A")),
    zones.filter((z) => z.id.startsWith("B")),
    zones.filter((z) => z.id.startsWith("C")),
  ];

  const robot = selected?.assignedRobot
    ? robots.find((r) => r.id === selected.assignedRobot)
    : null;

  return (
    <div className="bg-card space-y-5 h-full overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-gradient-to-r from-[#003DA5]/8 to-transparent dark:from-[#003DA5]/12 px-6 pt-6 pb-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#003DA5]" />
          <p className="text-sm font-semibold text-foreground">Zone Map</p>
          <span className="text-xs text-muted-foreground ml-1">Teluk Kalong · 28 ha · 12 zones</span>
        </div>
        <div className="flex items-center gap-4">
          {Object.entries(statusConfig).map(([key, { dot, label }]) => (
            <div key={key} className="flex items-center gap-1.5">
              <span className={cn("h-2 w-2 rounded-sm shrink-0", dot)} />
              <span className="text-[11px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="space-y-2 px-6">
        {rows.map((row, ri) => (
          <div key={ri} className="grid grid-cols-4 gap-2">
            {row.map((zone) => {
              const cfg = statusConfig[zone.status];
              const isSelected = selected?.id === zone.id;
              const isAnimating = zone.status === "in-progress";
              return (
                <button
                  key={zone.id}
                  onClick={() => setSelected(isSelected ? null : zone)}
                  className={cn(
                    "group relative rounded-lg px-4 py-5 text-left transition-all focus:outline-none",
                    cfg.bg,
                    cfg.text,
                    isSelected
                      ? "ring-2 ring-[#003DA5] ring-offset-2 scale-[1.02]"
                      : "hover:opacity-90 hover:scale-[1.01]"
                  )}
                >
                  {isAnimating && (
                    <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-white/70 animate-pulse" />
                  )}
                  <p className="text-sm font-bold">{zone.label}</p>
                  <p className="text-[11px] opacity-75 mt-1">{zone.efficiency}% eff.</p>
                  <p className="text-[10px] opacity-60 mt-0.5">{zone.panelCount} panels</p>
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Detail row */}
      {selected ? (
        <div className="border-t border-border pt-4 pb-6 px-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4 backdrop-blur-sm">
          {[
            { label: "Zone", value: selected.label },
            { label: "Efficiency", value: `${selected.efficiency}%` },
            { label: "Last Cleaned", value: selected.lastCleaned },
            { label: "Panels", value: selected.panelCount.toString() },
            ...(robot ? [
              { label: "Robot", value: robot.name },
              { label: "Battery", value: `${robot.battery}%` },
            ] : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
              <p className="mt-0.5 text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="border-t border-border pt-4 pb-6 px-6">
          <p className="text-[11px] text-muted-foreground">Select a zone to view details</p>
        </div>
      )}
    </div>
  );
}
