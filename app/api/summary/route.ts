import { getCandidates, getQueue } from '@/lib/store';

export const dynamic = 'force-dynamic';

export async function GET() {
  const { candidates } = await getCandidates();
  const { scheduled } = await getQueue();
  return new Response(JSON.stringify({ candidates: candidates.length, queued: scheduled.length }), {
    headers: { 'content-type': 'application/json' },
  });
}
