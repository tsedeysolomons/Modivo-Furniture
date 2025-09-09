export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></span>
      <span className="ml-4 text-accent font-semibold">Loading Cart...</span>
    </div>
  );
}