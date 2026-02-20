import { createClient } from '@/lib/supabase/server'
import { Subject } from '@/types'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react'

export const metadata = {
  title: 'Subjects — NehaNotes',
  description: 'Browse question papers and solutions by subject',
}

async function fetchSubjects(): Promise<Subject[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('subjects')
      .select('*')
      .order('semester', { ascending: true })
      .order('code', { ascending: true })

    if (error) {
      console.error('[subjects] fetch error:', error.message)
      return []
    }

    return (data as Subject[]) ?? []
  } catch {
    return []
  }
}

export default async function SubjectsPage() {
  const subjects = await fetchSubjects()

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-12 space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">Subjects</h1>
        <p className="text-muted-foreground text-lg">
          Browse question papers and solutions organised by subject and semester.
        </p>
      </div>

      {subjects.length === 0 ? (
        <EmptyState />
      ) : (
        <SubjectList subjects={subjects} />
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-24 text-center gap-4">
      <div className="flex items-center justify-center size-16 rounded-full bg-muted text-muted-foreground">
        <BookOpen className="size-6" />
      </div>
      <div className="space-y-1">
        <p className="font-semibold text-lg">No subjects available yet</p>
        <p className="text-sm text-muted-foreground">
          Check back soon — papers are being added regularly.
        </p>
      </div>
    </div>
  )
}

function SubjectList({ subjects }: { subjects: Subject[] }) {
  // Group by semester for visual hierarchy
  const bySemester = subjects.reduce<Record<number, Subject[]>>((acc, s) => {
    if (!acc[s.semester]) acc[s.semester] = []
    acc[s.semester].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-10">
      {Object.entries(bySemester).map(([sem, semSubjects]) => (
        <section key={sem}>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-4">
            Semester {sem}
          </h2>
          <div className="divide-y rounded-xl border bg-card overflow-hidden mb-10">
            {semSubjects.map((subject) => {
              const totalMarks = subject.exam_pattern.total_marks
              const durationMins = subject.exam_pattern.duration_minutes
              const durationLabel =
                durationMins >= 60
                  ? `${Math.floor(durationMins / 60)}h ${durationMins % 60 > 0 ? `${durationMins % 60}m` : ''}`.trim()
                  : `${durationMins}m`

              return (
                <Link
                  key={subject.id}
                  href={`/subjects/${subject.code}`}
                  className="group flex items-center gap-4 p-5 hover:bg-accent/40 transition-colors"
                >
                  <div className="flex items-center justify-center size-11 rounded-xl bg-primary/10 text-primary shrink-0">
                    <BookOpen className="size-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                      {subject.name}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                      <Badge variant="secondary" className="font-mono text-xs">
                        {subject.code}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Users className="size-3" />
                        {subject.department}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <BookOpen className="size-3" />
                        {totalMarks} marks
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="size-3" />
                        {durationLabel}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
