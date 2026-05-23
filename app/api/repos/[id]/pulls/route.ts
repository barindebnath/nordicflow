import { pullsByRepo } from '@/lib/data/mock-data';
export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return Response.json(pullsByRepo[id] ?? []);
}
