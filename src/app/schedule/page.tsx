"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { schedule } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { CalendarDays, Clock, CheckCircle, AlertCircle, Play, Search } from "lucide-react";

const statusConfig = {
  completed: { label: "Completed", class: "bg-[#003DA5] text-white", icon: CheckCircle },
  "in-progress": { label: "In Progress", class: "bg-[#FCC63A] text-black", icon: Play },
  upcoming: { label: "Upcoming", class: "bg-muted text-muted-foreground border border-border", icon: Clock },
  missed: { label: "Missed", class: "bg-red-500/15 text-red-500 border border-red-500/30", icon: AlertCircle },
};

export default function SchedulePage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = schedule.filter((s) => {
    const matchStatus = filter === "all" || s.status === filter;
    const matchSearch =
      s.zone.toLowerCase().includes(search.toLowerCase()) ||
      s.robot.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const counts = {
    completed: schedule.filter((s) => s.status === "completed").length,
    "in-progress": schedule.filter((s) => s.status === "in-progress").length,
    upcoming: schedule.filter((s) => s.status === "upcoming").length,
    missed: schedule.filter((s) => s.status === "missed").length,
  };

  return (
    <AppShell title="Cleaning Schedule">
      <div className="space-y-6">
        {/* Summary */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { label: "Completed", count: counts.completed },
            { label: "In Progress", count: counts["in-progress"] },
            { label: "Upcoming", count: counts.upcoming },
            { label: "Missed", count: counts.missed },
          ].map(({ label, count }) => (
            <Card key={label}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold text-foreground">{count}</p>
                <p className="text-xs text-muted-foreground">{label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <CardTitle className="text-sm font-semibold">
                <span className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4 text-[#003DA5]" />
                  Schedule — 25–26 May 2026
                </span>
              </CardTitle>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search zone or robot..."
                    className="h-8 pl-8 text-xs w-48"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="h-8 text-xs w-36">
                    <SelectValue placeholder="Filter status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="missed">Missed</SelectItem>
                  </SelectContent>
                </Select>
                <Button size="sm" className="h-8 bg-[#003DA5] hover:bg-[#002d7a] text-white text-xs">
                  + Add Job
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/40">
                    <TableHead className="text-xs">Job ID</TableHead>
                    <TableHead className="text-xs">Zone</TableHead>
                    <TableHead className="text-xs">Robot</TableHead>
                    <TableHead className="text-xs">Scheduled At</TableHead>
                    <TableHead className="text-xs">Duration</TableHead>
                    <TableHead className="text-xs">Status</TableHead>
                    <TableHead className="text-xs text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((job) => {
                    const { label, class: cls, icon: Icon } = statusConfig[job.status];
                    return (
                      <TableRow key={job.id} className="hover:bg-muted/30">
                        <TableCell className="text-xs font-mono text-muted-foreground">{job.id}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-md bg-[#003DA5]/10 dark:bg-[#003DA5]/25 px-2 py-0.5 text-xs font-semibold text-[#003DA5] dark:text-blue-400">
                            Zone {job.zone}
                          </span>
                        </TableCell>
                        <TableCell className="text-xs text-foreground">{job.robot}</TableCell>
                        <TableCell className="text-xs text-muted-foreground">{job.scheduledAt}</TableCell>
                        <TableCell className="text-xs text-foreground">{job.duration}</TableCell>
                        <TableCell>
                          <Badge className={cn("text-[10px] gap-1", cls)}>
                            <Icon className="h-2.5 w-2.5" />
                            {label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-6 px-2 text-[10px] text-[#003DA5]"
                          >
                            Edit
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppShell>
  );
}
