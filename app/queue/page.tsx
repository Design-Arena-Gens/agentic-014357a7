import { getQueue } from '@/lib/store';

export const dynamic = 'force-dynamic';

export default async function QueuePage() {
  const { scheduled } = await getQueue();
  return (
    <main style={{ padding: 24 }}>
      <h1>Scheduled Queue</h1>
      <p>Items selected for posting (pending approval/posting).</p>
      <ul style={{ paddingLeft: 18 }}>
        {scheduled.length === 0 && <li>No items scheduled.</li>}
        {scheduled.map((item) => (
          <li key={item.id} style={{ margin: '12px 0' }}>
            <div><strong>{item.title}</strong></div>
            <div>Views: {item.stats.viewCount} ? URL: <a href={item.url} target="_blank">{item.url}</a></div>
            <div>Source: {item.source}</div>
            <div>Status: {item.status}</div>
          </li>
        ))}
      </ul>
    </main>
  );
}
