'use client';

import { useEffect, useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { MetricCard } from '@/components/dashboard/metric-card';
import { useStore } from '@/lib/store/useStore';
import Link from 'next/link';
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import { 
  Sparkles, 
  Clock, 
  GitPullRequest, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  TrendingDown,
  TrendingUp,
  Search,
  Filter
} from 'lucide-react';

// Mock chart data over past sprints
const sprintData = [
  { name: 'Sprint 12', leadTime: 2.8, dxScore: 74, stability: 92 },
  { name: 'Sprint 13', leadTime: 2.4, dxScore: 76, stability: 94 },
  { name: 'Sprint 14', leadTime: 2.1, dxScore: 79, stability: 95 },
  { name: 'Sprint 15', leadTime: 2.5, dxScore: 78, stability: 93 },
  { name: 'Sprint 16', leadTime: 1.9, dxScore: 82, stability: 96.4 },
];

export default function DashboardPage() {
  const [mounted, setMounted] = useState(false);
  const [filterRepo, setFilterRepo] = useState<string>('all');
  
  const { repos, pulls, builds, notifications } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Compute metrics based on selected repo
  const selectedRepo = filterRepo === 'all' ? null : repos.find(r => r.id === filterRepo);
  
  const totalOpenPrs = selectedRepo 
    ? selectedRepo.openPrs 
    : repos.reduce((acc, r) => acc + r.openPrs, 0);

  const avgDxScore = selectedRepo 
    ? selectedRepo.dxScore 
    : Math.round(repos.reduce((acc, r) => acc + r.dxScore, 0) / repos.length);

  // Compute PR metrics
  const activePulls = selectedRepo 
    ? (pulls[selectedRepo.id] || []) 
    : Object.values(pulls).flat();

  const avgPrSize = activePulls.length > 0
    ? Math.round(activePulls.reduce((acc, p) => acc + p.loc, 0) / activePulls.length)
    : 384; // default mock fallback

  const avgLeadTime = selectedRepo
    ? (selectedRepo.id === '1' ? '1.9 days' : '2.3 days')
    : '2.1 days';

  // Compute builds stability
  const activeBuilds = selectedRepo
    ? (builds[selectedRepo.id] || [])
    : Object.values(builds).flat();

  const failedCount = activeBuilds.filter(b => b.status === 'failed').length;
  const passRate = activeBuilds.length > 0
    ? Math.round(((activeBuilds.length - failedCount) / activeBuilds.length) * 1000) / 10
    : 96.4;

  const dxDelta = avgDxScore >= 78 ? '↑ 2% vs last week' : '↓ 1% vs last week';

  // Generate dynamic AI summaries based on states
  const getAiSummary = () => {
    if (failedCount > 0) {
      return `Build instability detected in ${selectedRepo ? selectedRepo.name : 'checkout-web'}. A review of the failing pipelines shows retry bottlenecks in recent payment configuration code. Recommended action: coordinate reviews on cart integration PRs.`;
    }
    return 'DORA metrics are stable across repositories. Pull request merge cycles are meeting targets, and test pass rates are at a high of 96.4%. No active developer experience bottlenecks detected.';
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Top Header Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-100">Engineering Health</h2>
            <p className="text-slate-400 text-sm mt-1">Cross-repository developer experience overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#111827] border border-[#243041] rounded-lg px-3 py-1.5 text-xs text-slate-300">
              <Filter className="h-3.5 w-3.5 text-slate-500" />
              <span>Filter Workspace:</span>
              <select 
                value={filterRepo} 
                onChange={(e) => setFilterRepo(e.target.value)}
                className="bg-transparent text-slate-200 border-none outline-none font-medium cursor-pointer focus:ring-0"
              >
                <option value="all">All Repositories</option>
                {repos.map(r => (
                  <option key={r.id} value={r.id}>{r.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* KPI Grid */}
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard 
            title="Lead Time to Deploy" 
            value={avgLeadTime} 
            delta="↓ 12% this sprint" 
          />
          <MetricCard 
            title="Developer Experience (DX) Score" 
            value={`${avgDxScore}/100`} 
            delta={dxDelta} 
          />
          <MetricCard 
            title="Average PR Size" 
            value={`${avgPrSize} LOC`} 
            delta="↓ 8% this sprint" 
          />
          <MetricCard 
            title="Test Suite Pass Rate" 
            value={`${passRate}%`} 
            delta="↑ 1.4% this sprint" 
          />
        </section>

        {/* AI summary and bottlenecks */}
        <section className="rounded-2xl border border-[#243041] bg-[#111827] overflow-hidden relative">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500"></div>
          <div className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1.5 flex-1">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-widest">
                <Sparkles className="h-4 w-4" /> AI Sprint Assistant
              </div>
              <h3 className="text-lg font-bold text-slate-100">Sprint Summary & Bottlenecks</h3>
              <p className="text-sm text-slate-400 leading-relaxed max-w-4xl">
                {getAiSummary()}
              </p>
            </div>
            {failedCount > 0 && (
              <Link 
                href="/repos/1" 
                className="shrink-0 flex items-center gap-2 text-xs font-semibold bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 px-4 py-2.5 rounded-lg transition-all"
              >
                Inspect Failures <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            )}
          </div>
        </section>

        {/* Charts & Timeline */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Charts Area */}
          <div className="lg:col-span-2 space-y-6">
            <div className="rounded-2xl border border-[#243041] bg-[#111827] p-6 space-y-4">
              <h3 className="text-base font-semibold text-slate-200">Lead Time and DX Score Trend</h3>
              <div className="h-64 w-full">
                {mounted ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sprintData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorDx" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: '#111827', borderColor: '#243041', borderRadius: '8px' }} 
                        labelStyle={{ color: '#94a3b8', fontSize: '11px', fontWeight: '600' }}
                        itemStyle={{ color: '#f3f4f6', fontSize: '12px' }}
                      />
                      <Area type="monotone" dataKey="dxScore" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorDx)" name="DX Score" />
                      <Line type="monotone" dataKey="leadTime" stroke="#10b981" strokeWidth={2} name="Lead Time (Days)" />
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="h-full bg-slate-900/50 animate-pulse rounded-xl"></div>
                )}
              </div>
            </div>

            {/* Repos Breakdown */}
            <div className="rounded-2xl border border-[#243041] bg-[#111827] p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-slate-200">Repository Directory</h3>
                <Link href="/repos" className="text-xs text-blue-400 hover:underline flex items-center gap-1">
                  View All Repositories <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-[#243041] text-slate-500 text-xs font-semibold">
                      <th className="pb-3 font-medium">Repository</th>
                      <th className="pb-3 font-medium text-center">DX Score</th>
                      <th className="pb-3 font-medium text-center">Open PRs</th>
                      <th className="pb-3 font-medium text-center">Deploys/mo</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#243041]/40">
                    {repos.map(r => (
                      <tr key={r.id} className="hover:bg-[#1F2937]/20 transition-colors">
                        <td className="py-4.5 font-medium text-slate-200">
                          <div>
                            <p>{r.name}</p>
                            <p className="text-[10px] text-slate-500">{r.owner}</p>
                          </div>
                        </td>
                        <td className="py-4.5 text-center">
                          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold ${
                            r.dxScore >= 80 ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          }`}>
                            {r.dxScore}/100
                          </span>
                        </td>
                        <td className="py-4.5 text-center text-slate-300 font-mono">{r.openPrs}</td>
                        <td className="py-4.5 text-center text-slate-300 font-mono">{r.deployFreq}</td>
                        <td className="py-4.5 text-right">
                          <Link 
                            href={`/repos/${r.id}`}
                            className="text-xs text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1"
                          >
                            Details <ArrowRight className="h-3 w-3" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Real-time timeline */}
          <div className="rounded-2xl border border-[#243041] bg-[#111827] p-6 space-y-6 flex flex-col">
            <div className="space-y-1">
              <h3 className="text-base font-semibold text-slate-200">Activity Timeline</h3>
              <p className="text-[11px] text-slate-500">Real-time alerts and engineering status events.</p>
            </div>
            
            <div className="flex-1 space-y-5 overflow-y-auto max-h-[420px] pr-2">
              {notifications.map((n) => (
                <div key={n.id} className="relative flex gap-4 text-xs group">
                  <div className="shrink-0 flex flex-col items-center">
                    <div className={`h-6.5 w-6.5 rounded-full flex items-center justify-center border ${
                      n.type === 'error' 
                        ? 'bg-red-500/10 border-red-500/30 text-red-400' 
                        : n.type === 'warning'
                        ? 'bg-amber-500/10 border-amber-500/30 text-amber-400'
                        : 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                    }`}>
                      {n.type === 'error' ? (
                        <AlertTriangle className="h-3 w-3" />
                      ) : n.type === 'warning' ? (
                        <Clock className="h-3 w-3" />
                      ) : (
                        <CheckCircle2 className="h-3 w-3" />
                      )}
                    </div>
                    <div className="w-px h-full bg-[#243041] mt-2 group-last:hidden"></div>
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-slate-300 leading-normal">{n.message}</p>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      {new Date(n.timestamp).toLocaleDateString()} · {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

