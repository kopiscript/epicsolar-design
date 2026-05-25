"use client";

import { AppShell } from "@/components/layout/AppShell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Bell, Bot, Shield } from "lucide-react";

function Section({ icon: Icon, title, children }: { icon: React.ElementType; title: string; children: React.ReactNode }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-semibold">
          <Icon className="h-4 w-4 text-[#003DA5]" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">{children}</CardContent>
    </Card>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-3 sm:items-center">
      <Label className="text-xs text-muted-foreground sm:text-right">{label}</Label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function ToggleField({ label, description, defaultChecked = false }: { label: string; description: string; defaultChecked?: boolean }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

export default function SettingsPage() {
  return (
    <AppShell title="Settings">
      <div className="mx-auto max-w-2xl space-y-6">
        <Section icon={Building2} title="Site Information">
          <Field label="Site Name">
            <Input defaultValue="EPIC Solar Teluk Kalong" className="text-sm" />
          </Field>
          <Field label="Location">
            <Input defaultValue="Teluk Kalong Industrial Area, Kemaman, Terengganu" className="text-sm" />
          </Field>
          <Field label="Plant Capacity">
            <Input defaultValue="18.5 MW" className="text-sm" />
          </Field>
          <Field label="Total Zones">
            <Input defaultValue="12" className="text-sm" type="number" />
          </Field>
          <Field label="Notes">
            <Textarea defaultValue="Connected to national grid via TNB. Licence LRE 12/1/11/3 (LSS)." className="text-sm" rows={2} />
          </Field>
          <div className="flex justify-end">
            <Button size="sm" className="bg-[#003DA5] hover:bg-[#002d7a] text-white">Save Changes</Button>
          </div>
        </Section>

        <Section icon={Bot} title="Robot Configuration">
          <Field label="Auto-assign Robots">
            <Select defaultValue="efficiency">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="efficiency">By efficiency need (lowest first)</SelectItem>
                <SelectItem value="nearest">By nearest zone</SelectItem>
                <SelectItem value="manual">Manual only</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Low Battery Threshold">
            <div className="flex items-center gap-2">
              <Input defaultValue="30" type="number" className="text-sm w-20" />
              <span className="text-xs text-muted-foreground">%</span>
            </div>
          </Field>
          <Field label="Cleaning Interval">
            <Select defaultValue="daily">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="2days">Every 2 days</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Separator />
          <ToggleField label="Pause cleaning during rain" description="Robots return to bay when rain sensor triggers." defaultChecked />
          <ToggleField label="Auto-resume after charging" description="Robots resume last zone when battery exceeds 80%." defaultChecked />
          <div className="flex justify-end">
            <Button size="sm" className="bg-[#003DA5] hover:bg-[#002d7a] text-white">Save Changes</Button>
          </div>
        </Section>

        <Section icon={Bell} title="Notification Preferences">
          <ToggleField label="Critical fault alerts" description="Receive immediate alerts for robot faults and errors." defaultChecked />
          <ToggleField label="Low battery warnings" description="Alert when any robot battery drops below threshold." defaultChecked />
          <ToggleField label="Missed schedule alerts" description="Notify when a cleaning job is missed or delayed." defaultChecked />
          <ToggleField label="Daily summary report" description="Receive a daily email summarising cleaning and energy output." />
          <ToggleField label="Firmware update notifications" description="Alert when new firmware is available for any robot." defaultChecked />
          <Separator />
          <Field label="Alert Email">
            <Input defaultValue="ops@epicsolar.com.my" type="email" className="text-sm" />
          </Field>
          <div className="flex justify-end">
            <Button size="sm" className="bg-[#003DA5] hover:bg-[#002d7a] text-white">Save Changes</Button>
          </div>
        </Section>

        <Section icon={Shield} title="Security">
          <ToggleField label="Two-factor authentication" description="Require 2FA for all Admin accounts." defaultChecked />
          <ToggleField label="Session timeout" description="Auto sign-out after 30 minutes of inactivity." defaultChecked />
          <Field label="Password Policy">
            <Select defaultValue="strong">
              <SelectTrigger className="text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic (min 8 chars)</SelectItem>
                <SelectItem value="strong">Strong (min 12 chars + special)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="flex justify-end">
            <Button size="sm" className="bg-[#003DA5] hover:bg-[#002d7a] text-white">Save Changes</Button>
          </div>
        </Section>
      </div>
    </AppShell>
  );
}
