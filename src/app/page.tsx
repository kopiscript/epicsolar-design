import { AppShell } from "@/components/layout/AppShell";
import { KpiCards } from "@/components/dashboard/KpiCards";
import { FarmMap } from "@/components/dashboard/FarmMap";
import { RecentAlerts } from "@/components/dashboard/RecentAlerts";
import { RobotStrip } from "@/components/dashboard/RobotStrip";

export default function DashboardPage() {
  return (
    <AppShell title="Dashboard">
      <div className="space-y-4">

        {/* KPI cards with sparklines */}
        <div className="rounded-xl overflow-hidden border border-border shadow-sm">
          <KpiCards />
        </div>

        {/* Robot fleet status strip */}
        <RobotStrip />

        {/* Zone map + Alerts */}
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          <div className="xl:col-span-2 rounded-xl border border-border shadow-sm overflow-hidden">
            <FarmMap />
          </div>
          <div className="rounded-xl border border-border shadow-sm overflow-hidden">
            <RecentAlerts />
          </div>
        </div>

      </div>
    </AppShell>
  );
}
