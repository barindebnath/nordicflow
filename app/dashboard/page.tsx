import { AppShell } from '@/components/layout/app-shell';
import { MetricCard } from '@/components/dashboard/metric-card';
export default function DashboardPage() {
  return <AppShell><h2 className="mb-6 text-3xl font-semibold">Engineering Health Dashboard</h2><section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><MetricCard title="Lead Time" value="1.9 days" delta="↓ 12% this sprint" /><MetricCard title="Avg PR Size" value="384 LOC" delta="↓ 8% this sprint" /><MetricCard title="Open PR Count" value="11" delta="↑ 2 vs last week" /><MetricCard title="Test Pass Rate" value="96.4%" delta="↑ 1.4% this sprint" /></section></AppShell>;
}
