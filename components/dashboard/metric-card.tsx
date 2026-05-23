export function MetricCard({ title, value, delta }: { title: string; value: string; delta: string }) {
  return <article className="rounded-xl border border-slate-800 bg-slate-900 p-5"><p className="text-sm text-slate-400">{title}</p><p className="mt-2 text-3xl font-semibold">{value}</p><p className="mt-2 text-sm text-emerald-400">{delta}</p></article>;
}
