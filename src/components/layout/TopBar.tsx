"use client";

import { Menu, Bell, ChevronDown, Sun, Moon, Monitor, LogOut, Settings, User } from "lucide-react";
import { useTheme } from "next-themes";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { alerts } from "@/lib/mock-data";

interface TopBarProps {
  onMenuClick: () => void;
  title: string;
}

const themeOptions = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark",  label: "Dark",  icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export function TopBar({ onMenuClick, title }: TopBarProps) {
  const { theme, setTheme } = useTheme();
  const now = new Date();
  const dateStr = now.toLocaleDateString("en-MY", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const unresolved = alerts.filter((a) => !a.resolved).length;

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-gradient-to-r from-background via-background to-[#003DA5]/5 dark:to-[#003DA5]/8 px-4 md:px-6">
      <button
        className="md:hidden text-muted-foreground hover:text-foreground"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="flex-1">
        <h1 className="text-base font-semibold text-foreground">{title}</h1>
        <p className="hidden text-xs text-muted-foreground sm:block">{dateStr}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Sync indicator */}
        <div className="hidden items-center gap-2 sm:flex">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          <span className="text-xs text-muted-foreground">Synced 2m ago</span>
        </div>

        <div className="hidden h-4 w-px bg-border sm:block" />

        {/* Alerts bell */}
        <div className="relative">
          <button className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-muted">
            <Bell className="h-4 w-4" />
          </button>
          {unresolved > 0 && (
            <Badge className="absolute -right-1 -top-1 h-4 min-w-4 rounded-full bg-[#FCC63A] px-1 text-[9px] text-black">
              {unresolved}
            </Badge>
          )}
        </div>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg border border-border px-2 py-1.5 hover:bg-muted transition-colors">
            <Avatar className="h-7 w-7">
              <AvatarFallback className="bg-[#003DA5] text-white text-xs">AF</AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium sm:block">Azmi Fawwaz</span>
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64 p-0 overflow-hidden">
            {/* Profile header */}
            <div className="flex items-center gap-3 px-4 py-4 bg-gradient-to-br from-[#003DA5]/10 to-[#FCC63A]/10 border-b border-border">
              <Avatar className="h-10 w-10 shrink-0">
                <AvatarFallback className="bg-[#003DA5] text-white text-sm font-semibold">AF</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">Azmi Fawwaz</p>
                <p className="text-xs text-muted-foreground truncate">adam@epicsolar.my</p>
                <span className="mt-1 inline-flex items-center rounded-full bg-[#003DA5]/10 px-2 py-0.5 text-[10px] font-medium text-[#003DA5] dark:bg-[#003DA5]/30 dark:text-blue-300">
                  Administrator
                </span>
              </div>
            </div>

            <div className="p-1">
              <DropdownMenuItem className="gap-2 rounded-md">
                <User className="h-4 w-4 text-muted-foreground" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2 rounded-md">
                <Settings className="h-4 w-4 text-muted-foreground" />
                Settings
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator />

            {/* Theme section */}
            <div className="px-3 py-2">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
                Appearance
              </p>
              <div className="grid grid-cols-3 gap-1">
                {themeOptions.map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setTheme(value)}
                    className={cn(
                      "flex flex-col items-center gap-1.5 rounded-lg px-2 py-2 text-xs font-medium transition-colors",
                      theme === value
                        ? "bg-[#003DA5] text-white"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="p-1">
              <DropdownMenuItem variant="destructive" className="gap-2 rounded-md">
                <LogOut className="h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
