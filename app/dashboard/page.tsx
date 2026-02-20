import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen } from 'lucide-react'
import { DashboardGuard } from './DashboardGuard'
import { Subject } from '@/types'

async function fetchDashboardData() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/login')

  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .order('semester', { ascending: true })

  return {
    user,
    subjects: (subjects as Subject[]) ?? [],
  }
}

export const metadata = {
  title: 'Dashboard — NehaNotes',
}

export default async function DashboardPage() {
  const { user, subjects } = await fetchDashboardData()

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    user.email?.split('@')[0] ??
    'there'

  return (
    <DashboardGuard>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 space-y-12">

        {/* Welcome */}
        <div className="rounded-2xl bg-primary/5 border border-primary/10 p-8 sm:p-10">
          <h1 className="text-3xl font-bold">Welcome back, {displayName}</h1>
          <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
        </div>

        {/* Subjects — primary navigation */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Subjects</h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/subjects">
                View all <ArrowRight className="size-3.5 ml-1" />
              </Link>
            </Button>
          </div>

          {subjects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No subjects available yet.</p>
          ) : (
            <div className="divide-y rounded-xl border bg-card overflow-hidden">
              {subjects.map((subject) => (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.code}`}
                  className="group flex items-center gap-4 p-5 hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <BookOpen className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">{subject.name}</p>
                    <div className="flex gap-2 flex-wrap mt-1">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {subject.code}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Sem {subject.semester}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {subject.department} · {subject.regulation}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </DashboardGuard>
  )
}
