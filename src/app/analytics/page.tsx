"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { energyData, cleaningFrequency, panelEfficiencyTrend, zones } from "@/lib/mock-data";

const zoneEfficiency = zones.map((z) => ({
  zone: z.label,
  efficiency: z.efficiency,
}));

export default function AnalyticsPage() {
  return (
    <AppShell title="Analytics & Reports">
      <div className="space-y-6">
        {/* Summary stats */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Avg Daily Output", value: "17.0 MWh", sub: "7-day average" },
            { label: "Cleaning Gain", value: "+21.7%", sub: "Avg efficiency lift" },
            { label: "Total Cleaned", value: "65,110", sub: "Panels all-time" },
            { label: "Uptime", value: "94.2%", sub: "Fleet uptime this month" },
          ].map(({ label, value, sub }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">{value}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Energy chart */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold">Energy Output — Before vs After Cleaning</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <AreaChart data={energyData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAfter" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#003DA5" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#003DA5" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorBefore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FCC63A" stopOpacity={0.15} />
                    <stop offset="95%" stopColor="#FCC63A" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[12, 19]} />
                <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`${v} MWh`]} />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Area type="monotone" dataKey="before" name="Before Cleaning" stroke="#FCC63A" strokeWidth={2} fill="url(#colorBefore)" />
                <Area type="monotone" dataKey="after" name="After Cleaning" stroke="#003DA5" strokeWidth={2} fill="url(#colorAfter)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Cleaning frequency */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Zones Cleaned Per Week</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={cleaningFrequency} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="week" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} />
                  <Bar dataKey="zones" name="Zones Cleaned" fill="#003DA5" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Panel efficiency trend */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Avg Panel Efficiency Trend (2026)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={panelEfficiencyTrend} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[80, 100]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`${v}%`]} />
                  <Line type="monotone" dataKey="efficiency" name="Efficiency %" stroke="#FCC63A" strokeWidth={2.5} dot={{ r: 4, fill: "#FCC63A" }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Zone efficiency bar */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold">Current Panel Efficiency by Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={zoneEfficiency} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="zone" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} domain={[70, 100]} />
                  <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8 }} formatter={(v: number) => [`${v}%`]} />
                  <Bar
                    dataKey="efficiency"
                    name="Efficiency %"
                    radius={[4, 4, 0, 0]}
                    fill="#003DA5"
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
