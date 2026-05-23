'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { useStore } from '@/lib/store/useStore';
import Link from 'next/link';
import { 
  Search, 
  Plus, 
  RefreshCw, 
  GitBranch, 
  Trash2, 
  CheckCircle,
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export default function ReposPage() {
  const [search, setSearch] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRepoName, setNewRepoName] = useState('');
  const [newRepoOwner, setNewRepoOwner] = useState('Northwind Labs');

  const { 
    repos, 
    syncStatus, 
    startSync, 
    addRepo, 
    deleteRepo 
  } = useStore();

  const filteredRepos = repos.filter(
    r => r.name.toLowerCase().includes(search.toLowerCase()) || 
         r.owner.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddRepo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRepoName.trim()) return;
    addRepo(newRepoName.trim(), newRepoOwner);
    setNewRepoName('');
    setShowAddForm(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400 border-green-500/20 bg-green-500/5';
    if (score >= 70) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    return 'text-red-400 border-red-500/20 bg-red-500/5';
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-100">Repositories</h2>
            <p className="text-slate-400 text-sm mt-1">Manage and monitor connected codebase streams.</p>
          </div>
          <button 
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-colors self-start sm:self-auto"
          >
            <Plus className="h-4 w-4" /> Register Repository
          </button>
        </div>

        {/* Add Repo Inline Form */}
        {showAddForm && (
          <form 
            onSubmit={handleAddRepo}
            className="p-5 rounded-xl border border-[#243041] bg-[#111827] space-y-4 max-w-lg"
          >
            <h3 className="text-sm font-semibold text-slate-200">Register Connected Repository</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Repository Owner</label>
                <input 
                  type="text" 
                  value={newRepoOwner} 
                  onChange={(e) => setNewRepoOwner(e.target.value)}
                  className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-400 font-medium mb-1.5">Repository Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. core-api"
                  value={newRepoName} 
                  onChange={(e) => setNewRepoName(e.target.value)}
                  className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2.5 justify-end">
              <button 
                type="button" 
                onClick={() => setShowAddForm(false)}
                className="px-3.5 py-2 text-xs font-semibold text-slate-400 hover:text-slate-200"
              >
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
              >
                Add Repository
              </button>
            </div>
          </form>
        )}

        {/* Search controls */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search repositories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#111827] border border-[#243041] rounded-xl pl-9 pr-4 py-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Repos Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {filteredRepos.length === 0 ? (
            <div className="p-12 text-center border border-dashed border-[#243041] rounded-2xl md:col-span-2">
              <Database className="h-8 w-8 text-slate-600 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-400">No repositories found matching your query.</p>
              <button 
                onClick={() => setSearch('')}
                className="mt-3 text-xs text-blue-400 hover:underline"
              >
                Clear Search Filter
              </button>
            </div>
          ) : (
            filteredRepos.map((repo) => {
              const isSyncingCurrent = syncStatus.syncing && syncStatus.currentRepo === repo.name;
              return (
                <article 
                  key={repo.id} 
                  className="rounded-xl border border-[#243041] bg-[#111827] p-5 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Repo Title and DX Score */}
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-slate-500 font-medium font-mono uppercase tracking-wider">{repo.owner}</span>
                        </div>
                        <h3 className="text-base font-semibold text-slate-200 mt-0.5">{repo.name}</h3>
                      </div>
                      <div className={`px-2.5 py-1 rounded-lg border text-xs font-bold ${getScoreColor(repo.dxScore)}`}>
                        DX Score: {repo.dxScore}/100
                      </div>
                    </div>

                    {/* Stats details */}
                    <div className="grid grid-cols-2 gap-4 border-t border-b border-[#243041]/50 py-3 text-xs font-medium">
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-semibold">Active PRs</p>
                        <p className="text-slate-200 mt-1 flex items-center gap-1">
                          <GitBranch className="h-3.5 w-3.5 text-blue-400" /> {repo.openPrs} open
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase font-semibold">Deploy Frequency</p>
                        <p className="text-slate-200 mt-1 font-mono">{repo.deployFreq} / month</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between mt-5 gap-3">
                    <button 
                      onClick={() => deleteRepo(repo.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-[#0B1020] transition-colors"
                      title="Remove Repository"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    <div className="flex items-center gap-3">
                      {isSyncingCurrent ? (
                        <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 bg-blue-950/20 px-3 py-1.5 rounded-lg border border-blue-900/30">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                          Syncing {syncStatus.progress}%
                        </div>
                      ) : (
                        <button 
                          onClick={() => startSync(repo.id)}
                          className="flex items-center gap-1 bg-[#1F2937]/50 hover:bg-[#1F2937] text-slate-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-[#243041] transition-colors"
                        >
                          <RefreshCw className="h-3 w-3" /> Sync
                        </button>
                      )}
                      <Link 
                        href={`/repos/${repo.id}`}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        Deep Dive <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          )}
        </div>
      </div>
    </AppShell>
  );
}

