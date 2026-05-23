import Link from 'next/link';
export default function Home() {
  return <main className="mx-auto max-w-7xl px-6 py-20"><h1 className="text-5xl font-bold">Engineering intelligence for modern frontend teams.</h1><p className="mt-6 max-w-2xl text-slate-300">NordicFlow helps English-speaking teams track PR risk, deployment confidence, test quality, and delivery health in one calm, actionable workspace.</p><div className="mt-8 flex gap-4"><Link href="/demo" className="rounded-lg bg-blue-500 px-4 py-2 font-medium">Explore Demo</Link><Link href="/dashboard" className="rounded-lg border border-slate-700 px-4 py-2">Open Dashboard</Link></div></main>;
}
