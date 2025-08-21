import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
      <h1 className="text-6xl font-bold text-yellow-400 mb-4">404</h1>
      <p className="text-xl text-gray-300 mb-8">Page Not Found</p>
      <Link href="/" className="px-6 py-3 bg-yellow-500 text-black rounded-full font-semibold hover:bg-yellow-600 transition-colors">
        Go Home
      </Link>
    </div>
  );
}