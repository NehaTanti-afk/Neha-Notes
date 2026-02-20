'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface LockedQuestionsCardProps {
  /** Question numbers that are locked e.g. ["A2", "A3", ..., "A12"] */
  questionNumbers: string[]
}

export function LockedQuestionsCard({ questionNumbers }: LockedQuestionsCardProps) {
  const pathname = usePathname()
  const next = encodeURIComponent(pathname)
  const count = questionNumbers.length
  if (count === 0) return null

  return (
    <div className="rounded-xl border-2 border-dashed border-primary/20 bg-secondary/50 p-6 space-y-5">
      {/* Header row */}
      <div className="flex items-start gap-3">
        <div className="flex items-center justify-center size-10 rounded-xl bg-primary/10 text-primary shrink-0 mt-0.5">
          <Sparkles className="size-4" />
        </div>
        <div className="space-y-0.5">
          <p className="text-base font-semibold">
            {count} more {count === 1 ? 'question' : 'questions'} + answers inside
          </p>
          <p className="text-xs text-muted-foreground">
            Create a free account to unlock — full solutions &amp; key points included
          </p>
        </div>
      </div>

      {/* Question number chips */}
      <div className="flex flex-wrap gap-1.5 pl-13">
        {questionNumbers.map((num) => (
          <span
            key={num}
            className="inline-flex items-center gap-1 rounded-lg border bg-card px-2.5 py-1 text-xs text-muted-foreground"
          >
            {num}
          </span>
        ))}
      </div>

      {/* CTAs */}
      <div className="pl-13 flex gap-2">
        <Button asChild size="sm">
          <Link href={`/signup?next=${next}`}>Sign Up Free</Link>
        </Button>
        <Button asChild variant="outline" size="sm">
          <Link href={`/login?next=${next}`}>Sign In</Link>
        </Button>
      </div>
    </div>
  )
}
