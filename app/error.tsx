'use client'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="inline-flex items-center justify-center size-16 rounded-2xl bg-destructive/10 text-destructive mx-auto">
          <RefreshCw className="size-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Something went wrong</h2>
          <p className="text-muted-foreground">
            An unexpected error occurred. Please try again.
          </p>
        </div>
        <Button onClick={reset} size="lg">Try again</Button>
      </div>
    </main>
  )
}
