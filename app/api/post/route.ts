import { getQueue, markPosted } from '@/lib/store';
import { postToTikTok } from '@/lib/publisher/tiktok';

export const dynamic = 'force-dynamic';

export async function POST() {
  const { scheduled } = await getQueue();
  const pending = scheduled.filter((s) => s.status === 'pending').slice(0, 6);
  const results = [] as any[];
  for (const item of pending) {
    const res = await postToTikTok(item);
    await markPosted(item.id, !!res.ok);
    results.push({ id: item.id, ok: res.ok, error: res.error });
  }
  return new Response(JSON.stringify({ posted: results.filter(r => r.ok).length, results }), {
    headers: { 'content-type': 'application/json' },
  });
}
