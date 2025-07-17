import Link from 'next/link'
import { Button } from './components/ui/Button'
import { Home, Upload } from 'lucide-react'

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-md mx-auto">
                <div className="mb-8">
                    <h1 className="text-8xl font-bold mb-4">404</h1>
                    <h2 className="text-2xl font-bold mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-ci-muted mb-8">
                        Sorry, we couldn't find the page you're looking for.
                        It might have been moved or doesn't exist.
                    </p>
                </div>

                <div className="flex gap-4 flex-col md:flex-row">
                    <Link href="/" className="block">
                        <Button className="w-full">
                            <Home className="mr-2 h-4 w-4" />
                            Back to Home
                        </Button>
                    </Link>

                    <Link href="/dashboard/upload" className="block">
                        <Button variant="secondary" className="w-full">
                            <Upload className="mr-2 h-4 w-4" />
                            Upload
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}