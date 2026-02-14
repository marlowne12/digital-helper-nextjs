import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-6">
      <div className="text-center max-w-md">
        <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 mb-4">
          404
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-slate-400 mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-xl transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
