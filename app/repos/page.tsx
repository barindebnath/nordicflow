import { AppShell } from '@/components/layout/app-shell';
import { repos } from '@/lib/data/mock-data';
export default function ReposPage() {
  return <AppShell><h2 className="mb-6 text-3xl font-semibold">Repositories</h2><div className="space-y-3">{repos.map((repo) => <article key={repo.id} className="rounded-xl border border-slate-800 bg-slate-900 p-4"><p className="font-medium">{repo.owner}/{repo.name}</p><p className="text-sm text-slate-400">DX score {repo.dxScore} · Open PRs {repo.openPrs} · Deploys/month {repo.deployFreq}</p></article>)}</div></AppShell>;
}
