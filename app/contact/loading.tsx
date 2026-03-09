export default function Loading() {
  return (
    <div className="min-h-screen pt-32 pb-24 bg-[var(--bg)] animate-pulse">
      <div className="page-container max-w-5xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
          <div className="space-y-12">
            <div className="space-y-6">
              <div className="w-16 h-4 bg-[var(--bg-3)] rounded" />
              <div className="w-64 h-12 bg-[var(--bg-3)] rounded-lg" />
              <div className="w-96 h-24 bg-[var(--bg-3)] rounded-lg" />
            </div>
            <div className="grid gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-[var(--bg-3)] rounded-2xl border border-[var(--border)]"
                />
              ))}
            </div>
          </div>
          <div className="h-[500px] bg-[var(--bg-3)] rounded-3xl border border-[var(--border)]" />
        </div>
      </div>
    </div>
  );
}
