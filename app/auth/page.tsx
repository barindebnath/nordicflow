'use client';

import { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { useStore } from '@/lib/store/useStore';
import { Github, CheckCircle2, RefreshCw, LogOut, ArrowRight, GitBranch } from 'lucide-react';
import Link from 'next/link';

export default function AuthPage() {
  const { user, isAuthenticated, login, logout, syncStatus, startSync } = useStore();
  const [usernameInput, setUsernameInput] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!usernameInput.trim()) {
      login('demo');
    } else {
      login(usernameInput.trim());
    }
  };

  const handleSyncData = async () => {
    await startSync();
  };

  return (
    <AppShell>
      <div className="max-w-2xl mx-auto py-8">
        <div className="rounded-2xl border border-[#243041] bg-[#111827] overflow-hidden shadow-xl">
          <div className="p-6 border-b border-[#243041] bg-[#1F2937]/30 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Github className="h-5 w-5 text-slate-300" />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">GitHub Integration</h2>
            </div>
            <span className="text-[10px] text-slate-500 font-mono">OAuth 2.0 Flow</span>
          </div>

          <div className="p-8 space-y-6">
            {isAuthenticated && user ? (
              <div className="space-y-6">
                {/* Connected User Profile */}
                <div className="p-5 rounded-xl border border-blue-900/30 bg-blue-950/5 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={user.avatarUrl} 
                      alt={user.name} 
                      className="h-12 w-12 rounded-full border border-[#243041]" 
                    />
                    <div>
                      <h3 className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                        {user.name} <CheckCircle2 className="h-4 w-4 text-green-400" />
                      </h3>
                      <p className="text-xs text-slate-400">@{user.username} · Connected via OAuth</p>
                    </div>
                  </div>
                  <button 
                    onClick={logout}
                    className="flex items-center gap-1 bg-[#1F2937]/80 hover:bg-red-950/20 border border-[#243041] hover:border-red-900/30 text-slate-300 hover:text-red-400 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  >
                    <LogOut className="h-3.5 w-3.5" /> Disconnect
                  </button>
                </div>

                {/* Data Sync Section */}
                <div className="space-y-3.5">
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Sync Operations</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    NordicFlow is currently pulling commit logs, pull request review feedback pipelines, and status metrics from your connected organization.
                  </p>
                  
                  {syncStatus.syncing ? (
                    <div className="p-5 rounded-xl border border-blue-900/30 bg-[#0B1020] space-y-3">
                      <div className="flex justify-between items-center text-xs font-medium">
                        <span className="text-slate-300 flex items-center gap-1.5">
                          <RefreshCw className="h-3.5 w-3.5 animate-spin text-blue-400" /> Syncing codebase details...
                        </span>
                        <span className="text-blue-400 font-bold">{syncStatus.progress}%</span>
                      </div>
                      <div className="w-full bg-[#111827] h-2 rounded-full overflow-hidden border border-[#243041]">
                        <div className="bg-blue-500 h-full rounded-full transition-all duration-200" style={{ width: `${syncStatus.progress}%` }}></div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-wrap gap-3">
                      <button 
                        onClick={handleSyncData}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        <RefreshCw className="h-4 w-4" /> Trigger Sync Data
                      </button>
                      <Link 
                        href="/dashboard"
                        className="bg-[#1F2937] hover:bg-[#1F2937]/80 text-slate-300 hover:text-white border border-[#243041] px-4 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                      >
                        View Dashboard <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-4 space-y-2">
                  <Github className="h-12 w-12 text-slate-400 mx-auto" />
                  <h3 className="text-lg font-bold text-slate-100">Simulate OAuth Connection</h3>
                  <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                    Connect your GitHub account to NordicFlow. This will authorize the platform to pull and analyze repository analytics.
                  </p>
                </div>

                <form onSubmit={handleLogin} className="max-w-sm mx-auto space-y-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 font-semibold mb-1.5 uppercase tracking-wider">GitHub Username</label>
                    <input 
                      type="text" 
                      placeholder="e.g. janesmith (leave blank for demo)"
                      value={usernameInput}
                      onChange={(e) => setUsernameInput(e.target.value)}
                      className="w-full bg-[#0B1020] border border-[#243041] rounded-lg px-3 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" /> Authorize & Sign in with GitHub
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}

