export default function Loading() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center">
      <span className="relative flex h-16 w-16">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gradient-to-r from-blue-500 to-teal-400 opacity-75"></span>
        <span className="relative inline-flex h-16 w-16 rounded-full bg-gradient-to-r from-blue-500 to-teal-400"></span>
      </span>
    </div>
  );
}
