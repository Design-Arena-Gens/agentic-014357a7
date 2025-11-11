import { addToQueue, saveCandidates, unseenFilter } from '@/lib/store';
import { RapidApiTikTokSource } from '@/lib/providers/rapidapi';
import { MockSource } from '@/lib/providers/mock';

const DAILY_COUNT = Number(process.env.DAILY_COUNT || 6);
const MIN_VIEWS = Number(process.env.DAILY_MIN_VIEWS || 500_000);

function chooseSource() {
  // Prefer RapidAPI when key is present, otherwise fallback to mock
  if (process.env.RAPIDAPI_KEY) return RapidApiTikTokSource;
  return MockSource;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  const source = chooseSource();
  const found = await source.searchFootballEdits({ minViews: MIN_VIEWS, limit: DAILY_COUNT * 2 });
  const filtered = (await unseenFilter(found)).slice(0, DAILY_COUNT);
  await saveCandidates(filtered);
  await addToQueue(filtered);
  return new Response(JSON.stringify({ added: filtered.length }), { headers: { 'content-type': 'application/json' } });
}
