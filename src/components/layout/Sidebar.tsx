"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  CalendarDays,
  BarChart3,
  Users,
  Bell,
  Settings,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { alerts } from "@/lib/mock-data";

const navItems = [
  { href: "/",          label: "Dashboard",         icon: LayoutDashboard },
  { href: "/dms",       label: "Device Management", icon: Bot,             tag: "DMS" },
  { href: "/schedule",  label: "Schedule",          icon: CalendarDays },
  { href: "/analytics", label: "Analytics",         icon: BarChart3 },
  { href: "/ums",       label: "User Management",   icon: Users,           tag: "UMS" },
  { href: "/alerts",    label: "Alerts",            icon: Bell },
  { href: "/settings",  label: "Settings",          icon: Settings },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();
  const unresolvedAlerts = alerts.filter((a) => !a.resolved).length;

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-gradient-to-b from-sidebar via-sidebar to-sidebar/95 transition-transform duration-300 ease-in-out overflow-hidden",
          "md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Bottom decorative orb */}
        <div className="pointer-events-none absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#003DA5]/8 blur-2xl dark:bg-[#003DA5]/12" />

        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-border px-5 bg-gradient-to-br from-[#003DA5]/5 to-transparent dark:from-[#003DA5]/10">
          <div className="flex h-9 w-9 items-center justify-center">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              {/* Yellow base */}
              <circle cx="50" cy="50" r="48" fill="#FCC63A" />
              {/* Blue top with S-curve wave */}
              <path
                d="M 2,50 A 48,48 0 0,0 98,50 C 98,26 50,26 50,50 C 50,74 2,74 2,50 Z"
                fill="#003DA5"
              />
            </svg>
          </div>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-bold text-[#003DA5] dark:text-blue-400" style={{ fontFamily: "var(--font-jakarta), sans-serif" }}>EPIC Solar</p>
            <p className="text-[10px] text-muted-foreground tracking-wide uppercase">Robot Control Centre</p>
          </div>
          <button className="md:hidden text-muted-foreground" onClick={onClose}>
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <p className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Main Menu
          </p>
          <ul className="space-y-0.5">
            {navItems.map(({ href, label, icon: Icon, tag }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={onClose}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-[#003DA5] text-white"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-[#003DA5] dark:hover:text-blue-400"
                    )}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span className="flex-1">{label}</span>
                    {tag && (
                      <span
                        className={cn(
                          "rounded px-1.5 py-0.5 text-[10px] font-semibold",
                          active
                            ? "bg-white/20 text-white"
                            : "bg-[#003DA5]/10 text-[#003DA5] dark:bg-[#003DA5]/30 dark:text-blue-400"
                        )}
                      >
                        {tag}
                      </span>
                    )}
                    {label === "Alerts" && unresolvedAlerts > 0 && (
                      <Badge
                        className={cn(
                          "h-5 min-w-5 rounded-full px-1.5 text-[10px]",
                          active
                            ? "bg-[#FCC63A] text-black"
                            : "bg-[#FCC63A] text-black"
                        )}
                      >
                        {unresolvedAlerts}
                      </Badge>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom info */}
        <div className="border-t border-border p-4">
          <div className="rounded-lg bg-[#003DA5]/5 dark:bg-[#003DA5]/15 p-3">
            <p className="text-xs font-semibold text-[#003DA5] dark:text-blue-400">Teluk Kalong Plant</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">28 ha · 18.5 MW · 12 Zones</p>
          </div>
        </div>
      </aside>
    </>
  );
}
