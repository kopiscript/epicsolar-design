"use client";

import { LineChart, Line, ResponsiveContainer, Tooltip } from "recharts";
import { robots, zones } from "@/lib/mock-data";
import { TrendingUp, TrendingDown } from "lucide-react";

const sparkData = {
  energy:     [{ v: 14.2 }, { v: 13.8 }, { v: 15.1 }, { v: 14.6 }, { v: 13.5 }, { v: 14.9 }, { v: 16.8 }],
  robots:     [{ v: 4 }, { v: 5 }, { v: 3 }, { v: 5 }, { v: 4 }, { v: 4 }, { v: 2 }],
  panels:     [{ v: 900 }, { v: 780 }, { v: 1100 }, { v: 950 }, { v: 820 }, { v: 980 }, { v: 1033 }],
  efficiency: [{ v: 87 }, { v: 89 }, { v: 91 }, { v: 90 }, { v: 88 }, { v: 91 }, { v: 90 }],
};

function Spark({ data, color }: { data: { v: number }[]; color: string }) {
  return (
    <ResponsiveContainer width="100%" height={40}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="v"
          stroke={color}
          strokeWidth={1.5}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          contentStyle={{ display: "none" }}
          cursor={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function KpiCards() {
  const activeRobots = robots.filter((r) => r.status === "cleaning").length;
  const faults = robots.filter((r) => r.status === "fault").length;
  const totalCleaned = robots.reduce((s, r) => s + r.cleanedToday, 0);
  const cleanedZones = zones.filter((z) => z.status === "cleaned").length;
  const avgEfficiency = Math.round(
    zones.reduce((s, z) => s + z.efficiency, 0) / zones.length
  );

  const kpis = [
    {
      label: "Energy Output Today",
      value: "16.8 MWh",
      trend: "+8.2% vs yesterday",
      up: true,
      spark: sparkData.energy,
      sparkColor: "#003DA5",
      gradient: "to-[#003DA5]/5",
    },
    {
      label: "Active Robots",
      value: `${activeRobots} / ${robots.length}`,
      trend: faults > 0 ? `${faults} fault detected` : "All nominal",
      up: faults === 0,
      spark: sparkData.robots,
      sparkColor: "#FCC63A",
      gradient: faults > 0 ? "to-red-500/5" : "to-[#FCC63A]/5",
    },
    {
      label: "Panels Cleaned",
      value: totalCleaned.toLocaleString(),
      trend: `${cleanedZones} of ${zones.length} zones done`,
      up: true,
      spark: sparkData.panels,
      sparkColor: "#003DA5",
      gradient: "to-emerald-500/5",
    },
    {
      label: "Panel Efficiency",
      value: `${avgEfficiency}%`,
      trend: avgEfficiency >= 95 ? "On target" : "Below 95% target",
      up: avgEfficiency >= 95,
      spark: sparkData.efficiency,
      sparkColor: avgEfficiency >= 95 ? "#003DA5" : "#FCC63A",
      gradient: avgEfficiency >= 95 ? "to-[#003DA5]/5" : "to-[#FCC63A]/5",
    },
  ];

  return (
    <div className="grid grid-cols-2 divide-x divide-y divide-border lg:grid-cols-4 lg:divide-y-0">
      {kpis.map(({ label, value, trend, up, spark, sparkColor, gradient }) => (
        <div key={label} className={`bg-gradient-to-br from-card ${gradient} px-6 py-5 flex flex-col gap-3`}>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p
            className="text-3xl font-bold tracking-tight text-foreground"
            style={{ fontFamily: "var(--font-jakarta), sans-serif" }}
          >
            {value}
          </p>
          <div className="-mx-1">
            <Spark data={spark} color={sparkColor} />
          </div>
          <div className="flex items-center gap-1">
            {up
              ? <TrendingUp className="h-3 w-3 text-emerald-500 shrink-0" />
              : <TrendingDown className="h-3 w-3 text-orange-500 shrink-0" />
            }
            <p className={`text-xs ${up ? "text-emerald-600" : "text-orange-500"}`}>
              {trend}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
