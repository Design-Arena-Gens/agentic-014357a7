import Link from 'next/link';
import { Suspense } from 'react';

async function fetchSummary() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/summary`, { cache: 'no-store' });
  if (!res.ok) return { candidates: 0, queued: 0 };
  return res.json();
}

export default async function Page() {
  const summary = await fetchSummary();
  return (
    <main style={{ padding: 24 }}>
      <h1>Football Edits Agent</h1>
      <p>Daily collector for TikTok football edits (>= 500k views).</p>
      <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
        <Link href="/queue">Open Queue</Link>
        <Link href="/candidates">View Candidates</Link>
        <Link href="/api/cron/daily">Run Daily Cron (manual)</Link>
      </div>
      <div style={{ marginTop: 24 }}>
        <Suspense fallback={<p>Loading?</p>}>
          <div>
            <strong>Today candidates:</strong> {summary.candidates} ? <strong>Queued:</strong> {summary.queued}
          </div>
        </Suspense>
      </div>
    </main>
  );
}
