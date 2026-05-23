import Link from 'next/link';
import { ReactNode } from 'react';
const nav = [
  ['Dashboard', '/dashboard'],
  ['Repositories', '/repos'],
  ['Settings', '/settings'],
  ['Demo', '/demo']
];
export function AppShell({ children }: { children: ReactNode }) {
  return <div className="min-h-screen"><aside className="fixed h-full w-60 border-r border-slate-800 bg-slate-900/80 p-6"><h1 className="mb-8 text-xl font-semibold">NordicFlow</h1><nav className="space-y-2">{nav.map(([label, href]) => <Link key={href} href={href} className="block rounded-lg px-3 py-2 text-slate-300 hover:bg-slate-800">{label}</Link>)}</nav></aside><main className="ml-60 p-8">{children}</main></div>;
}
