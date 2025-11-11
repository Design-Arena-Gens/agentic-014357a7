import { getCandidates } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function CandidatesPage() {
  const { candidates } = await getCandidates();
  return (
    <main style={{ padding: 24 }}>
      <h1>Today Candidates</h1>
      <p>Discovered football edits with at least 500k views.</p>
      <ul style={{ paddingLeft: 18 }}>
        {candidates.length === 0 && <li>No candidates yet. Run the cron.</li>}
        {candidates.map((item) => (
          <li key={item.id} style={{ margin: '12px 0' }}>
            <div><strong>{item.title}</strong></div>
            <div>Views: {item.stats.viewCount} ? URL: <a href={item.url} target="_blank">{item.url}</a></div>
            <div>Creator: {item.author?.name || 'Unknown'}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
