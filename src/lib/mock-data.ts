export type RobotStatus = "cleaning" | "charging" | "idle" | "fault";
export type ZoneStatus = "cleaned" | "in-progress" | "pending" | "fault";
export type UserRole = "Admin" | "Operator" | "Viewer";
export type AlertSeverity = "critical" | "warning" | "info";

export interface Robot {
  id: string;
  name: string;
  status: RobotStatus;
  battery: number;
  zone: string;
  cleanedToday: number;
  lastMaintenance: string;
  firmwareVersion: string;
  totalCleaned: number;
  errorCode?: string;
}

export interface Zone {
  id: string;
  label: string;
  status: ZoneStatus;
  assignedRobot?: string;
  panelCount: number;
  lastCleaned: string;
  efficiency: number;
}

export interface ScheduleEntry {
  id: string;
  zone: string;
  robot: string;
  scheduledAt: string;
  duration: string;
  status: "completed" | "in-progress" | "upcoming" | "missed";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: "active" | "inactive";
  lastLogin: string;
  avatar: string;
}

export interface AlertEntry {
  id: string;
  severity: AlertSeverity;
  title: string;
  description: string;
  robot?: string;
  zone?: string;
  timestamp: string;
  resolved: boolean;
}

export const robots: Robot[] = [
  {
    id: "R-001",
    name: "SolarBot Alpha",
    status: "cleaning",
    battery: 78,
    zone: "B2",
    cleanedToday: 320,
    lastMaintenance: "2026-05-18",
    firmwareVersion: "v2.4.1",
    totalCleaned: 14280,
  },
  {
    id: "R-002",
    name: "SolarBot Beta",
    status: "charging",
    battery: 42,
    zone: "Charging Bay 1",
    cleanedToday: 210,
    lastMaintenance: "2026-05-20",
    firmwareVersion: "v2.4.1",
    totalCleaned: 12650,
  },
  {
    id: "R-003",
    name: "SolarBot Gamma",
    status: "idle",
    battery: 95,
    zone: "A3",
    cleanedToday: 0,
    lastMaintenance: "2026-05-22",
    firmwareVersion: "v2.3.8",
    totalCleaned: 9870,
  },
  {
    id: "R-004",
    name: "SolarBot Delta",
    status: "fault",
    battery: 15,
    zone: "C4",
    cleanedToday: 88,
    lastMaintenance: "2026-05-10",
    firmwareVersion: "v2.3.8",
    totalCleaned: 11320,
    errorCode: "ERR-0042: Brush motor overheat",
  },
  {
    id: "R-005",
    name: "SolarBot Epsilon",
    status: "cleaning",
    battery: 63,
    zone: "A1",
    cleanedToday: 415,
    lastMaintenance: "2026-05-21",
    firmwareVersion: "v2.4.1",
    totalCleaned: 16990,
  },
];

export const zones: Zone[] = [
  { id: "A1", label: "A1", status: "in-progress", assignedRobot: "R-005", panelCount: 120, lastCleaned: "2026-05-25", efficiency: 97 },
  { id: "A2", label: "A2", status: "cleaned",     panelCount: 118, lastCleaned: "2026-05-25", efficiency: 98 },
  { id: "A3", label: "A3", status: "pending",     panelCount: 122, lastCleaned: "2026-05-24", efficiency: 91 },
  { id: "A4", label: "A4", status: "pending",     panelCount: 115, lastCleaned: "2026-05-23", efficiency: 89 },
  { id: "B1", label: "B1", status: "cleaned",     panelCount: 124, lastCleaned: "2026-05-25", efficiency: 96 },
  { id: "B2", label: "B2", status: "in-progress", assignedRobot: "R-001", panelCount: 121, lastCleaned: "2026-05-25", efficiency: 95 },
  { id: "B3", label: "B3", status: "pending",     panelCount: 119, lastCleaned: "2026-05-24", efficiency: 90 },
  { id: "B4", label: "B4", status: "pending",     panelCount: 117, lastCleaned: "2026-05-23", efficiency: 88 },
  { id: "C1", label: "C1", status: "pending",     panelCount: 125, lastCleaned: "2026-05-22", efficiency: 85 },
  { id: "C2", label: "C2", status: "pending",     panelCount: 123, lastCleaned: "2026-05-22", efficiency: 84 },
  { id: "C3", label: "C3", status: "pending",     panelCount: 120, lastCleaned: "2026-05-21", efficiency: 82 },
  { id: "C4", label: "C4", status: "fault",       assignedRobot: "R-004", panelCount: 118, lastCleaned: "2026-05-20", efficiency: 79 },
];

export const schedule: ScheduleEntry[] = [
  { id: "S-001", zone: "A1", robot: "R-005",  scheduledAt: "2026-05-25 08:00", duration: "2h", status: "in-progress" },
  { id: "S-002", zone: "B2", robot: "R-001",  scheduledAt: "2026-05-25 08:30", duration: "2h", status: "in-progress" },
  { id: "S-003", zone: "A2", robot: "R-002",  scheduledAt: "2026-05-25 06:00", duration: "2h", status: "completed" },
  { id: "S-004", zone: "B1", robot: "R-003",  scheduledAt: "2026-05-25 07:00", duration: "1.5h", status: "completed" },
  { id: "S-005", zone: "A3", robot: "R-003",  scheduledAt: "2026-05-25 11:00", duration: "2h", status: "upcoming" },
  { id: "S-006", zone: "B3", robot: "R-002",  scheduledAt: "2026-05-25 11:30", duration: "2h", status: "upcoming" },
  { id: "S-007", zone: "A4", robot: "R-001",  scheduledAt: "2026-05-25 13:00", duration: "2h", status: "upcoming" },
  { id: "S-008", zone: "B4", robot: "R-005",  scheduledAt: "2026-05-25 13:30", duration: "2h", status: "upcoming" },
  { id: "S-009", zone: "C4", robot: "R-004",  scheduledAt: "2026-05-25 09:00", duration: "2h", status: "missed" },
  { id: "S-010", zone: "C1", robot: "R-001",  scheduledAt: "2026-05-26 07:00", duration: "2h", status: "upcoming" },
  { id: "S-011", zone: "C2", robot: "R-002",  scheduledAt: "2026-05-26 07:30", duration: "2h", status: "upcoming" },
  { id: "S-012", zone: "C3", robot: "R-005",  scheduledAt: "2026-05-26 09:00", duration: "2h", status: "upcoming" },
];

export const users: User[] = [
  { id: "U-001", name: "Ahmad Razif", email: "ahmad.razif@epicsolar.com.my", role: "Admin", status: "active", lastLogin: "2026-05-25 08:12", avatar: "AR" },
  { id: "U-002", name: "Siti Norzahirah", email: "siti.norzahirah@epicsolar.com.my", role: "Operator", status: "active", lastLogin: "2026-05-25 07:45", avatar: "SN" },
  { id: "U-003", name: "Mohd Fadzli", email: "mohd.fadzli@epicsolar.com.my", role: "Operator", status: "active", lastLogin: "2026-05-24 16:30", avatar: "MF" },
  { id: "U-004", name: "Nurul Hidayah", email: "nurul.hidayah@epicsolar.com.my", role: "Viewer", status: "active", lastLogin: "2026-05-23 09:00", avatar: "NH" },
  { id: "U-005", name: "Zulkifli Hassan", email: "zulkifli.hassan@epicsolar.com.my", role: "Viewer", status: "inactive", lastLogin: "2026-05-10 14:22", avatar: "ZH" },
  { id: "U-006", name: "Azmi Fawwaz", email: "azmi@epicsolar.com.my", role: "Admin", status: "active", lastLogin: "2026-05-25 09:01", avatar: "AF" },
];

export const alerts: AlertEntry[] = [
  { id: "AL-001", severity: "critical", title: "Robot Fault Detected", description: "SolarBot Delta (R-004) brush motor overheat in Zone C4. Immediate inspection required.", robot: "R-004", zone: "C4", timestamp: "2026-05-25 09:15", resolved: false },
  { id: "AL-002", severity: "warning", title: "Low Battery", description: "SolarBot Beta (R-002) battery at 42%. Returning to charging bay.", robot: "R-002", timestamp: "2026-05-25 09:00", resolved: false },
  { id: "AL-003", severity: "warning", title: "Missed Schedule", description: "Zone C4 cleaning session missed due to robot fault. Reschedule required.", zone: "C4", timestamp: "2026-05-25 09:05", resolved: false },
  { id: "AL-004", severity: "warning", title: "Low Panel Efficiency", description: "Zones C1–C4 efficiency below 85%. Cleaning overdue by 3+ days.", zone: "C1", timestamp: "2026-05-25 07:00", resolved: false },
  { id: "AL-005", severity: "info", title: "Cleaning Completed", description: "Zone A2 cleaned successfully by SolarBot Beta. Efficiency restored to 98%.", zone: "A2", robot: "R-002", timestamp: "2026-05-25 08:10", resolved: true },
  { id: "AL-006", severity: "info", title: "Firmware Update Available", description: "SolarBot Gamma and Delta eligible for firmware v2.4.1 upgrade.", timestamp: "2026-05-24 18:00", resolved: false },
  { id: "AL-007", severity: "critical", title: "Critical Battery Level", description: "SolarBot Delta (R-004) battery critically low at 15%. Robot immobilised.", robot: "R-004", timestamp: "2026-05-25 09:20", resolved: false },
];

export const energyData = [
  { date: "May 19", before: 14.2, after: 17.1 },
  { date: "May 20", before: 13.8, after: 16.9 },
  { date: "May 21", before: 15.1, after: 17.8 },
  { date: "May 22", before: 14.6, after: 17.4 },
  { date: "May 23", before: 13.5, after: 16.5 },
  { date: "May 24", before: 14.9, after: 17.6 },
  { date: "May 25", before: 13.2, after: 16.8 },
];

export const cleaningFrequency = [
  { week: "Wk 18", zones: 8 },
  { week: "Wk 19", zones: 10 },
  { week: "Wk 20", zones: 7 },
  { week: "Wk 21", zones: 12 },
  { week: "Wk 22", zones: 9 },
];

export const panelEfficiencyTrend = [
  { month: "Jan", efficiency: 88 },
  { month: "Feb", efficiency: 91 },
  { month: "Mar", efficiency: 89 },
  { month: "Apr", efficiency: 94 },
  { month: "May", efficiency: 92 },
];
