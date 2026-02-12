export function PageLayout({
  content,
  sidebar,
}: {
  content?: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12">
      <div className="lg:col-start-4 lg:col-span-6">{content}</div>
      <aside className="lg:col-start-10 lg:col-span-3">{sidebar}</aside>
    </div>
  );
}
