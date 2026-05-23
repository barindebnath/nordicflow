import './globals.css';
import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'NordicFlow — Developer Experience Intelligence',
  description: 'Engineering intelligence for modern frontend teams.',
  openGraph: { title: 'NordicFlow', description: 'Calm engineering intelligence platform.' }
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>;
}
