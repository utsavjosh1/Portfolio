export default function Loading() {
  return (
    <div className="min-h-screen pt-16 flex items-center justify-center">
      <div className="space-y-4 text-center">
        <div className="h-8 w-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-[var(--text-2)] font-mono text-sm">Loading...</p>
      </div>
    </div>
  );
}
