import { Group } from '@/types'

interface GroupSectionProps {
  group: Group
  children: React.ReactNode
}

export function GroupSection({ group, children }: GroupSectionProps) {
  return (
    <section className="space-y-6">
      {/* Group header */}
      <div className="rounded-xl bg-primary/8 border border-primary/15 px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="font-bold text-lg">
              Group {group.name.toUpperCase()}
            </h2>
            <p className="text-sm text-muted-foreground mt-0.5">
              {group.instructions}
            </p>
          </div>
          <div className="shrink-0 text-right text-xs text-muted-foreground space-y-0.5">
            {group.attempt_count < group.questions_count ? (
              <p>
                {group.attempt_count} of {group.questions_count} questions
              </p>
            ) : (
              <p>{group.questions_count} questions</p>
            )}
            <p className="font-medium text-foreground">
              {group.marks_per_question} mark{group.marks_per_question !== 1 ? 's' : ''} each
            </p>
          </div>
        </div>
      </div>

      {/* Questions */}
      <div className="space-y-4">{children}</div>
    </section>
  )
}
