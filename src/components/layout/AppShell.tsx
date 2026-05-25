"use client";

import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";

interface AppShellProps {
  children: React.ReactNode;
  title: string;
}

export function AppShell({ children, title }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(true)} title={title} />
        <main className="relative flex-1 overflow-y-auto overflow-x-hidden bg-[var(--content-bg)] p-4 md:p-6">
          {/* Decorative blur orbs — purely visual, z-index behind content */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-[#003DA5]/10 blur-3xl dark:bg-[#003DA5]/15" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#FCC63A]/8 blur-3xl dark:bg-[#FCC63A]/10" />
          {children}
        </main>
      </div>
    </div>
  );
}
