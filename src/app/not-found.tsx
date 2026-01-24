import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-6xl font-bold">404</h1>
            <h2 className="text-2xl mt-4">Page Not Found</h2>
            <Link href="/" className="mt-6 text-blue-500 hover:underline">
                Go back home
            </Link>
        </div>
    )
}
