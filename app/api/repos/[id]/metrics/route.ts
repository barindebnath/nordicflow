import { repos } from '@/lib/data/mock-data';
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const repo = repos.find((r) => r.id === id);
  return repo ? Response.json(repo) : new Response('Not found', { status: 404 });
}
