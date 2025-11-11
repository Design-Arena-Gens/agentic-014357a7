export const metadata = { title: 'Football Edits Agent', description: 'Daily TikTok football edit collector' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'ui-sans-serif, system-ui', margin: 0 }}>{children}</body>
    </html>
  );
}
