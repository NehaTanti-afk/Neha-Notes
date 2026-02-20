import { createClient } from '@/lib/supabase/server'
import { Subject, Paper } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, Clock, Award, BookOpen, FileText } from 'lucide-react'

interface SubjectPageProps {
  params: Promise<{ code: string }>
}

const PAPER_TYPE_LABELS: Record<Paper['type'], string> = {
  end_sem: 'End Semester',
  mid_sem_1: 'Mid Semester 1',
  mid_sem_2: 'Mid Semester 2',
  practice: 'Practice',
}

const QUESTION_TYPE_LABELS: Record<string, string> = {
  mcq: 'MCQ',
  short: 'Short Answer',
  long: 'Long Answer',
}

async function fetchSubjectWithPapers(
  code: string
): Promise<{ subject: Subject; papers: Paper[] } | null> {
  try {
    const supabase = await createClient()

    const { data: subjectData, error: subjectError } = await supabase
      .from('subjects')
      .select('*')
      .eq('code', code.toUpperCase())
      .single()

    if (subjectError || !subjectData) return null

    const { data: papersData } = await supabase
      .from('papers')
      .select(
        'id, subject_id, title, type, year, metadata, created_at'
      )
      .eq('subject_id', subjectData.id)
      .order('year', { ascending: false })

    return {
      subject: subjectData as Subject,
      papers: (papersData as unknown as Paper[]) ?? [],
    }
  } catch {
    return null
  }
}

export async function generateMetadata({
  params,
}: SubjectPageProps) {
  const { code } = await params
  return {
    title: `${code.toUpperCase()} — NehaNotes`,
  }
}

export default async function SubjectPage({ params }: SubjectPageProps) {
  const { code } = await params
  const result = await fetchSubjectWithPapers(code)

  if (!result) notFound()

  const { subject, papers } = result
  const { exam_pattern } = subject
  const durationLabel = formatDuration(exam_pattern.duration_minutes)

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Back link */}
      <Link
        href="/subjects"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to Subjects
      </Link>

      {/* Subject header */}
      <div className="space-y-6">
        <div className="flex flex-wrap items-start gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-2">
              <Badge variant="secondary" className="font-mono">
                {subject.code}
              </Badge>
              <Badge variant="outline">{subject.regulation}</Badge>
            </div>
            <h1 className="text-3xl font-bold">{subject.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">
              {subject.department} · Semester {subject.semester} · {subject.college}
            </p>
          </div>
        </div>

        {/* Exam stats */}
        <div className="rounded-xl border bg-card p-5">
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <Award className="size-4 text-primary" />
              <strong className="text-foreground">{exam_pattern.total_marks}</strong> total marks
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-4 text-primary" />
              <strong className="text-foreground">{durationLabel}</strong>
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="size-4 text-primary" />
              <strong className="text-foreground">{exam_pattern.groups.length}</strong> groups
            </span>
          </div>
        </div>

        {/* Exam pattern breakdown */}
        {exam_pattern.groups.length > 0 && (
          <div className="rounded-xl border bg-card p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-3">
              Exam Pattern
            </p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {exam_pattern.groups.map((group) => (
                <div
                  key={group.name}
                  className="rounded-lg border bg-muted/30 p-3 text-sm space-y-1"
                >
                  <p className="font-semibold">
                    Group {group.name.toUpperCase()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {group.instructions}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Type: {QUESTION_TYPE_LABELS[group.question_type] ?? group.question_type}
                  </p>
                  <p className="text-xs font-medium text-foreground">
                    {group.attempt_count} × {group.marks_per_question}m ={' '}
                    {group.attempt_count * group.marks_per_question} marks
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Separator />

      {/* Papers section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <FileText className="size-5 text-primary" />
          Papers
          {papers.length > 0 && (
            <Badge variant="secondary">{papers.length}</Badge>
          )}
        </h2>

        {papers.length === 0 ? (
          <div className="rounded-2xl border border-dashed py-16 text-center space-y-2">
            <p className="font-medium">No papers available yet</p>
            <p className="text-sm text-muted-foreground">
              Papers for {subject.name} will be added soon.
            </p>
          </div>
        ) : (
          <div className="divide-y rounded-xl border bg-card overflow-hidden">
            {papers.map((paper) => (
              <PaperRow
                key={paper.id}
                paper={paper}
                subjectCode={subject.code}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function PaperRow({
  paper,
  subjectCode,
}: {
  paper: Paper
  subjectCode: string
}) {
  return (
    <Link
      href={`/subjects/${subjectCode}/${paper.id}`}
      className="group flex items-center gap-4 p-5 hover:bg-accent/40 transition-colors"
    >
      <div className="flex items-center justify-center size-11 rounded-xl bg-secondary text-muted-foreground shrink-0">
        <FileText className="size-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm group-hover:text-primary transition-colors">
          {paper.title}
        </p>
        <div className="flex flex-wrap items-center gap-2 mt-1.5">
          <Badge variant="outline" className="text-xs">
            {PAPER_TYPE_LABELS[paper.type]}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {paper.year}
          </Badge>
          {paper.metadata?.difficulty && (
            <span className="text-xs text-muted-foreground capitalize">
              Difficulty: {paper.metadata.difficulty}
            </span>
          )}
        </div>
      </div>
      <ArrowRight className="size-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
    </Link>
  )
}

function formatDuration(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  if (h > 0 && m > 0) return `${h}h ${m}m`
  if (h > 0) return `${h}h`
  return `${m}m`
}
