'use client';

import { use, useState, useEffect } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { useStore } from '@/lib/store/useStore';
import Link from 'next/link';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line,
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';
import { 
  ArrowLeft, 
  GitBranch, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Flame, 
  FileCode2, 
  Plus, 
  Play, 
  Gauge, 
  Sparkles,
  Search,
  BookOpen
} from 'lucide-react';

export default function RepoDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'prs' | 'builds' | 'dx'>('prs');
  const [simulatedTitle, setSimulatedTitle] = useState('');
  const [simulatedRisk, setSimulatedRisk] = useState<'Low' | 'Medium' | 'High'>('Low');

  const { 
    repos, 
    pulls, 
    builds, 
    addPullRequest, 
    addBuild,
    syncStatus,
    startSync
  } = useStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  const repo = repos.find(r => r.id === id);
  if (!repo) {
    return (
      <AppShell>
        <div className="text-center py-20">
          <AlertTriangle className="h-12 w-12 text-red-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-slate-100">Repository Not Found</h3>
          <Link href="/repos" className="text-blue-400 hover:underline mt-4 inline-block">
            Return to Repositories
          </Link>
        </div>
      </AppShell>
    );
  }

  const repoPulls = pulls[id] || [];
  const repoBuilds = builds[id] || [];

  // Simulate addition triggers
  const handleSimulatePr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!simulatedTitle.trim()) return;
    
    // Auto-calculate properties based on selected risk
    let filesChanged = 3;
    let loc = 80;
    if (simulatedRisk === 'Medium') {
      filesChanged = 12;
      loc = 340;
    } else if (simulatedRisk === 'High') {
      filesChanged = 35;
      loc = 1120;
    }

    addPullRequest(id, {
      title: simulatedTitle.trim(),
      risk: simulatedRisk,
      filesChanged,
      loc,
      hoursOpen: 2,
      reviews: 0
    });

    setSimulatedTitle('');
  };

  const handleSimulateBuild = (status: 'success' | 'failed') => {
    addBuild(id, {
      status,
      duration: Math.floor(Math.random() * 200) + 200,
      createdAt: new Date().toISOString()
    });
  };

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'High': return 'bg-red-500/10 text-red-400 border border-red-500/20';
      case 'Medium': return 'bg-amber-500/10 text-amber-400 border border-amber-500/20';
      default: return 'bg-green-500/10 text-green-400 border border-green-500/20';
    }
  };

  // Format build data for Recharts
  const buildChartData = [...repoBuilds]
    .reverse()
    .map((b, idx) => ({
      name: `#${idx + 1}`,
      duration: Math.round(b.duration / 60 * 10) / 10, // minutes
      status: b.status
    }));

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Back navigation and header */}
        <div className="space-y-4">
          <Link href="/repos" className="text-slate-400 hover:text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Repositories
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium font-mono uppercase tracking-wider">{repo.owner}</span>
                <span className="text-slate-700">/</span>
                <span className="text-xs font-bold bg-[#1F2937] text-slate-300 px-2 py-0.5 rounded border border-[#243041] font-mono">TypeScript</span>
              </div>
              <h2 className="text-3xl font-bold text-slate-100 mt-1">{repo.name}</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] text-slate-500 uppercase font-semibold block">Quality Index</span>
                <span className="text-lg font-bold text-blue-400">{repo.dxScore}/100 DX Score</span>
              </div>
              <button 
                onClick={() => startSync(repo.id)}
                disabled={syncStatus.syncing}
                className="bg-[#1F2937] hover:bg-[#1F2937]/80 text-slate-300 hover:text-white px-4 py-2 rounded-lg text-xs font-semibold border border-[#243041] transition-all flex items-center gap-1.5"
              >
                <Clock className="h-4 w-4" /> {syncStatus.syncing && syncStatus.currentRepo === repo.name ? 'Syncing...' : 'Force Sync'}
              </button>
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-[#243041]">
          <button 
            onClick={() => setActiveTab('prs')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'prs' 
                ? 'border-blue-500 text-white' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <GitBranch className="h-4 w-4" /> Pull Request Risk Model ({repoPulls.length})
          </button>
          <button 
            onClick={() => setActiveTab('builds')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'builds' 
                ? 'border-blue-500 text-white' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <CheckCircle2 className="h-4 w-4" /> CI/CD Build History ({repoBuilds.length})
          </button>
          <button 
            onClick={() => setActiveTab('dx')}
            className={`px-5 py-3 text-xs font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'dx' 
                ? 'border-blue-500 text-white' 
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Gauge className="h-4 w-4" /> Frontend DX Score Breakdown
          </button>
        </div>

        {/* Tab Content */}
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Main Tab Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* PR Risk Tab */}
            {activeTab === 'prs' && (
              <div className="space-y-4">
                <div className="rounded-2xl border border-[#243041] bg-[#111827] overflow-hidden">
                  <div className="p-4 border-b border-[#243041] flex items-center justify-between bg-[#1F2937]/30">
                    <h3 className="text-sm font-semibold text-slate-200">Active Pull Request Risks</h3>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono">Real-time Risk Classifier</span>
                  </div>
                  
                  <div className="divide-y divide-[#243041]/50">
                    {repoPulls.length === 0 ? (
                      <div className="p-12 text-center text-slate-500 text-sm">
                        No active PRs. Try simulating one using the sidebar panel.
                      </div>
                    ) : (
                      repoPulls.map(pr => (
                        <div key={pr.id} className="p-5 hover:bg-[#1F2937]/10 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="space-y-2 max-w-xl">
                            <h4 className="font-semibold text-slate-200 text-sm">{pr.title}</h4>
                            <div className="flex flex-wrap gap-2 text-[10px] font-medium text-slate-500">
                              <span className="font-mono text-slate-400">{pr.filesChanged} files changed</span>
                              <span>·</span>
                              <span className="font-mono text-slate-400">{pr.loc} lines changed</span>
                              <span>·</span>
                              <span>Open for {pr.hoursOpen}h</span>
                              <span>·</span>
                              <span>{pr.reviews} reviews</span>
                            </div>
                            
                            {/* Warnings based on size/risk */}
                            {pr.risk === 'High' && (
                              <div className="inline-flex items-center gap-1 bg-red-950/20 text-red-400 border border-red-900/30 px-2 py-0.5 rounded text-[10px]">
                                <AlertTriangle className="h-3 w-3" /> Warning: Large Changeset & review backlog risks stability.
                              </div>
                            )}
                          </div>
                          
                          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                            <span className={`px-2.5 py-1 rounded text-xs font-bold ${getRiskBadgeColor(pr.risk)}`}>
                              {pr.risk} Risk
                            </span>
                            <span className="text-[10px] text-slate-500 font-mono">PR #{pr.id.slice(-4)}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Build History Tab */}
            {activeTab === 'builds' && (
              <div className="space-y-6">
                {/* Build Duration Chart */}
                <div className="rounded-2xl border border-[#243041] bg-[#111827] p-6 space-y-4">
                  <h3 className="text-base font-semibold text-slate-200">Build Duration Trend</h3>
                  <div className="h-56 w-full">
                    {mounted && buildChartData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={buildChartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                          <XAxis dataKey="name" stroke="#64748b" fontSize={10} tickLine={false} />
                          <YAxis stroke="#64748b" fontSize={10} tickLine={false} />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#111827', borderColor: '#243041', borderRadius: '8px' }} 
                            itemStyle={{ color: '#f3f4f6', fontSize: '12px' }}
                            labelStyle={{ color: '#94a3b8', fontSize: '11px' }}
                          />
                          <Line type="monotone" dataKey="duration" stroke="#10b981" strokeWidth={2.5} name="Build Time (min)" />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full bg-slate-900/50 flex items-center justify-center text-xs text-slate-500">
                        No build runs logged yet.
                      </div>
                    )}
                  </div>
                </div>

                {/* Build Run Logs */}
                <div className="rounded-2xl border border-[#243041] bg-[#111827] overflow-hidden">
                  <div className="p-4 border-b border-[#243041] bg-[#1F2937]/30 flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-slate-200">Recent Build Executions</h3>
                    <span className="text-[10px] text-slate-500 font-mono">CI Status Logs</span>
                  </div>
                  <div className="divide-y divide-[#243041]/40 text-xs">
                    {repoBuilds.length === 0 ? (
                      <div className="p-12 text-center text-slate-500">
                        No recorded builds. Simulate a run in the sidebar panel.
                      </div>
                    ) : (
                      repoBuilds.map((build, idx) => (
                        <div key={build.id} className="p-4 flex items-center justify-between hover:bg-[#1F2937]/10 transition-colors">
                          <div className="flex items-center gap-3">
                            {build.status === 'success' ? (
                              <CheckCircle2 className="h-4.5 w-4.5 text-green-400" />
                            ) : (
                              <AlertTriangle className="h-4.5 w-4.5 text-red-400" />
                            )}
                            <div>
                              <p className="font-semibold text-slate-300">Run #{repoBuilds.length - idx}</p>
                              <p className="text-[10px] text-slate-500 font-mono mt-0.5">
                                {new Date(build.createdAt).toLocaleString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-slate-300 font-semibold">{(build.duration / 60).toFixed(1)} mins</span>
                            <span className={`block text-[10px] font-bold uppercase mt-0.5 ${
                              build.status === 'success' ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {build.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* DX Breakdown Tab */}
            {activeTab === 'dx' && (
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl border border-[#243041] bg-[#111827]">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Complexity Analysis</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-300">Component Cyclomatic Complexity</span>
                        <span className="text-slate-400">Moderate</span>
                      </div>
                      <div className="w-full bg-[#0B1020] h-2 rounded-full overflow-hidden border border-[#243041]">
                        <div className="bg-amber-400 h-full rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-300">Test Code Coverage</span>
                        <span className="text-blue-400">84.2%</span>
                      </div>
                      <div className="w-full bg-[#0B1020] h-2 rounded-full overflow-hidden border border-[#243041]">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '84.2%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-medium mb-1.5">
                        <span className="text-slate-300">Dead / Unused Component estimate</span>
                        <span className="text-green-400">4.5%</span>
                      </div>
                      <div className="w-full bg-[#0B1020] h-2 rounded-full overflow-hidden border border-[#243041]">
                        <div className="bg-green-500 h-full rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-5 rounded-2xl border border-[#243041] bg-[#111827]">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Hotspot Modules (High Churn)</h4>
                  <div className="space-y-3.5 text-xs">
                    <div className="flex justify-between items-center bg-[#0B1020] p-2.5 rounded-lg border border-[#243041]/60">
                      <div className="flex items-center gap-2">
                        <Flame className="h-3.5 w-3.5 text-red-400" />
                        <span className="font-mono text-slate-300">/components/cart/CartDrawer.tsx</span>
                      </div>
                      <span className="text-[10px] bg-red-950/20 text-red-400 px-1.5 py-0.5 rounded border border-red-900/30">Extreme Churn</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0B1020] p-2.5 rounded-lg border border-[#243041]/60">
                      <div className="flex items-center gap-2">
                        <Flame className="h-3.5 w-3.5 text-amber-400" />
                        <span className="font-mono text-slate-300">/lib/hooks/useCheckout.ts</span>
                      </div>
                      <span className="text-[10px] bg-amber-950/20 text-amber-400 px-1.5 py-0.5 rounded border border-amber-900/30">High Churn</span>
                    </div>
                    <div className="flex justify-between items-center bg-[#0B1020] p-2.5 rounded-lg border border-[#243041]/60">
                      <div className="flex items-center gap-2">
                        <FileCode2 className="h-3.5 w-3.5 text-slate-400" />
                        <span className="font-mono text-slate-300">/components/ui/Button.tsx</span>
                      </div>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded border border-[#243041]">Low Churn</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Simulated Control Panel Sidebar */}
          <div className="space-y-6">
            
            {/* PR Simulator */}
            <div className="p-5 rounded-2xl border border-[#243041] bg-[#111827]">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-4">
                <Sparkles className="h-4 w-4" /> Simulated Event Ingestion
              </div>
              <h3 className="text-base font-bold text-slate-200 mb-4">Simulate Pull Request</h3>
              <form onSubmit={handleSimulatePr} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1.5">PR Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Integrate Apple Pay sandbox"
                    value={simulatedTitle}
                    onChange={(e) => setSimulatedTitle(e.target.value)}
                    className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] uppercase font-semibold text-slate-500 mb-1.5">Risk Score Level</label>
                  <select
                    value={simulatedRisk}
                    onChange={(e) => setSimulatedRisk(e.target.value as any)}
                    className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500 focus:ring-0"
                  >
                    <option value="Low">Low Risk (small changeset)</option>
                    <option value="Medium">Medium Risk (moderate changes)</option>
                    <option value="High">High Risk (complex logic rewrite)</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Plus className="h-4 w-4" /> Queue Simulated PR
                </button>
              </form>
            </div>

            {/* Build Simulator */}
            <div className="p-5 rounded-2xl border border-[#243041] bg-[#111827] space-y-4">
              <h3 className="text-base font-bold text-slate-200">Simulate CI Build Job</h3>
              <p className="text-xs text-slate-400">Trigger simulated build workflows to verify DX reporting alert pipelines.</p>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => handleSimulateBuild('success')}
                  className="bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 border border-emerald-500/20 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="h-4 w-4" /> Trigger Success
                </button>
                <button 
                  onClick={() => handleSimulateBuild('failed')}
                  className="bg-red-600/10 hover:bg-red-600/20 text-red-400 border border-red-500/20 py-2.5 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <AlertTriangle className="h-4 w-4" /> Trigger Failure
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </AppShell>
  );
}
