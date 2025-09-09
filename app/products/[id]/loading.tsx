export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <span className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></span>
      <span className="mt-4 text-accent font-semibold text-lg">
        Loading Product Details...
      </span>
    </div>
  );
}
