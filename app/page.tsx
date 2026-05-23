import Link from 'next/link';
import { 
  GitBranch, 
  ShieldCheck, 
  Cpu, 
  Activity, 
  TrendingUp, 
  Sparkles, 
  ArrowRight,
  Github
} from 'lucide-react';

export default function Home() {
  return (
    <div className="bg-[#0B1020] text-slate-100 min-h-screen selection:bg-blue-500/30">
      {/* Header/Nav */}
      <header className="border-b border-[#243041]/50 bg-[#0B1020]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center">
              <span className="text-xs font-bold text-white">N</span>
            </div>
            <span className="font-bold tracking-tight text-lg">NordicFlow</span>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Dashboard
            </Link>
            <Link href="/repos" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              Repositories
            </Link>
            <Link href="/demo" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition-all">
              Explore Demo
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/20 mb-6">
          <Sparkles className="h-3 w-3" /> Calm Developer Experience Intelligence
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-4xl mx-auto leading-[1.15] bg-gradient-to-b from-white to-slate-300 bg-clip-text text-transparent">
          Engineering intelligence for modern frontend teams.
        </h1>
        <p className="mt-6 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
          NordicFlow automatically analyzes pull requests, build histories, test files, and deployment frequencies to deliver high-fidelity velocity insights. Specially optimized for Scandinavian software organizations.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link href="/demo" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium shadow-lg hover:shadow-blue-900/20 transition-all flex items-center gap-2 group">
            Try Demo Workspace
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link href="/auth" className="bg-slate-900 hover:bg-slate-800 text-slate-200 border border-[#243041] px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2">
            <Github className="h-4 w-4" />
            Connect GitHub
          </Link>
        </div>
      </section>

      {/* Mock Interactive Dashboard Preview */}
      <section className="max-w-5xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-[#243041] bg-[#111827]/60 shadow-2xl p-6 backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
          
          {/* Header stub */}
          <div className="flex items-center justify-between pb-6 border-b border-[#243041]/50 mb-6">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Northwind Labs Workspace</span>
            </div>
            <span className="text-xs text-slate-500">Updated 2m ago · Simulated Live</span>
          </div>

          {/* Cards preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl border border-[#243041]/40 bg-[#0F172A]/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Lead Time to Production</span>
              <p className="text-2xl font-bold mt-1 text-slate-100">1.9 Days</p>
              <span className="text-[10px] text-emerald-400 font-medium block mt-1">↓ 12% vs last month</span>
            </div>
            <div className="p-4 rounded-xl border border-[#243041]/40 bg-[#0F172A]/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">DX Score</span>
              <p className="text-2xl font-bold mt-1 text-blue-400">82/100</p>
              <span className="text-[10px] text-slate-500 font-medium block mt-1">Steady performance</span>
            </div>
            <div className="p-4 rounded-xl border border-[#243041]/40 bg-[#0F172A]/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Avg PR Size</span>
              <p className="text-2xl font-bold mt-1 text-slate-100">384 LOC</p>
              <span className="text-[10px] text-emerald-400 font-medium block mt-1">↓ 8% this sprint</span>
            </div>
            <div className="p-4 rounded-xl border border-[#243041]/40 bg-[#0F172A]/80">
              <span className="text-[10px] text-slate-500 uppercase font-semibold">Test Stability</span>
              <p className="text-2xl font-bold mt-1 text-slate-100">96.4%</p>
              <span className="text-[10px] text-emerald-400 font-medium block mt-1">↑ 1.4% improvement</span>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="bg-[#111827]/40 border-t border-b border-[#243041]/40 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Designed to solve modern team bottlenecking</h2>
            <p className="mt-4 text-slate-400">NordicFlow connects directly with pull requests and repositories to highlight DX stability metrics, risk profiles, and test health.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-[#243041]/40 bg-[#0B1020]/60">
              <div className="h-10 w-10 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
                <GitBranch className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">GitHub Connection</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Connect with GitHub OAuth. NordicFlow imports commit logs, pull request records, and CI/CD status pipelines to run core developer analytics.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#243041]/40 bg-[#0B1020]/60">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-6">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">PR Risk Analysis</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Analyze PR metadata. Detect high complexity changes, refactor ratio, code hotspots, and missing tests to score risk as Low, Medium, or High.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#243041]/40 bg-[#0B1020]/60">
              <div className="h-10 w-10 rounded-lg bg-teal-500/10 text-teal-400 flex items-center justify-center mb-6">
                <Cpu className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">Frontend DX Score Engine</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Get visibility into component complexities, file churn rates, and unused component files to track velocity metrics and engineering maturity.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#243041]/40 bg-[#0B1020]/60">
              <div className="h-10 w-10 rounded-lg bg-amber-500/10 text-amber-400 flex items-center justify-center mb-6">
                <Activity className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">Activity Timeline</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Keep eyes on what's rolling. Live activity timelines capture pull requests merged, review requests, and CI build failure spikes instantly.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#243041]/40 bg-[#0B1020]/60">
              <div className="h-10 w-10 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-6">
                <TrendingUp className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">Delivery Metrics</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                View DORA-style metrics adapted for frontend. Keep track of lead time to deploy, deployment frequencies, and pipeline build stability.
              </p>
            </div>

            <div className="p-6 rounded-xl border border-[#243041]/40 bg-[#0B1020]/60">
              <div className="h-10 w-10 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-slate-200">AI Sprint Summaries</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                AI summaries extract details from git histories to explain sprint blockers. E.g., "Checkout-web pipeline instability slowed team delivery."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack & Architecture */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs font-semibold text-blue-500 uppercase tracking-widest font-mono">Clean Architecture</span>
            <h2 className="text-3xl font-bold tracking-tight mt-3 text-slate-100">
              Built on production-grade tools.
            </h2>
            <p className="mt-6 text-slate-400 leading-relaxed">
              NordicFlow is built to serve as an example of clean architecture. Codebases that are maintainable, easy to expand, and strongly focused on performance.
            </p>
            <ul className="mt-8 space-y-3.5">
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>React Server Components & Next.js App Router</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Global store state management via Zustand</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Flexible asynchronous caching using TanStack Query</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-slate-300">
                <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                <span>Robust unit testing configuration with Vitest</span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl border border-[#243041] bg-[#111827]/40 p-6 font-mono text-xs text-slate-300 shadow-xl overflow-x-auto">
            <p className="text-blue-400 font-semibold mb-3">// package.json dependencies</p>
            <pre>{`{
  "dependencies": {
    "next": "16.2.6",
    "react": "19.2.0",
    "react-dom": "19.2.0",
    "recharts": "2.15.3",
    "zustand": "5.0.5",
    "@tanstack/react-query": "5.76.2",
    "lucide-react": "0.511.0"
  }
}`}</pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#243041]/40 py-12 bg-[#0B1020]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-slate-500">
          <p>© 2026 NordicFlow. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/demo" className="hover:text-slate-300 transition-colors">Demo</Link>
            <Link href="/dashboard" className="hover:text-slate-300 transition-colors">Dashboard</Link>
            <Link href="/repos" className="hover:text-slate-300 transition-colors">Repositories</Link>
          </div>
          <p className="flex items-center gap-1">
            Made for Danish Scaleups
          </p>
        </div>
      </footer>
    </div>
  );
}

