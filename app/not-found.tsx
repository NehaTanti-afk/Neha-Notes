import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <p className="text-8xl font-extrabold text-primary/20">404</p>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Page not found</h2>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>
        <Button asChild variant="outline" size="lg">
          <Link href="/">
            <ArrowLeft className="size-4 mr-2" />
            Go home
          </Link>
        </Button>
      </div>
    </main>
  )
}
