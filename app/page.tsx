import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, TrendingUp, ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { Subject } from "@/types";

const HOW_IT_WORKS = [
  {
    icon: Search,
    step: "01",
    title: "Browse Papers",
    description:
      "Find question papers for your subject and semester — sample papers and past year papers, organised by exam type.",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Sign Up Free",
    description:
      "Create a free account to unlock all answers and full solutions — no payment, ever.",
  },
  {
    icon: TrendingUp,
    step: "03",
    title: "Study Smart",
    description:
      "Understand concepts through worked examples, key points, and course-outcome-mapped explanations.",
  },
];

async function fetchFeaturedSubjects(): Promise<Subject[]> {
  try {
    const supabase = await createClient();
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await supabase
      .from("subjects")
      .select("*")
      .gte("featured_until", today)
      .order("featured_until", { ascending: true });

    if (error) return [];
    return (data as Subject[]) ?? [];
  } catch {
    return [];
  }
}

export default async function HomePage() {
  const featuredSubjects = await fetchFeaturedSubjects();

  return (
    <div className="flex flex-col">
      {/* Hero Section — Two-column split layout */}
      <section className="relative py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-secondary/30 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* LEFT column — text content */}
            <div>
              <Badge variant="secondary" className="mb-6 border-primary/20">
                MAKAUT Engineering
              </Badge>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[0.9]">
                Ace Your
                <br />
                Exams
              </h1>
              <p className="text-lg text-muted-foreground mt-6 max-w-lg">
                Question papers with fully worked solutions — mapped to course
                outcomes with step-by-step answers. Built for MAKAUT students,
                by a JISCE student.
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                Made by{" "}
                <span className="font-medium text-foreground">Neha Tanti</span>{" "}
                · JISCE
              </p>
              <div className="flex gap-3 mt-8">
                <Button asChild size="lg">
                  <Link href="/signup">Sign Up Free</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/subjects">Browse Subjects</Link>
                </Button>
              </div>
            </div>

            {/* RIGHT column — decorative paper cards visual */}
            <div className="hidden lg:block relative">
              <div className="relative h-[400px]">
                {/* Back card */}
                <div className="absolute top-8 left-8 right-0 bottom-0 rounded-2xl border bg-secondary rotate-3" />
                {/* Front card */}
                <div className="relative rounded-2xl border bg-card p-8 shadow-lg -rotate-1">
                  <div className="space-y-4">
                    {/* Fake header */}
                    <div className="flex items-center gap-3">
                      <div className="size-3 rounded-full bg-primary/30" />
                      <div className="h-3 w-32 rounded bg-primary/15" />
                    </div>
                    {/* Fake separator */}
                    <div className="h-px bg-border" />
                    {/* Fake question line 1 */}
                    <div className="flex items-start gap-3">
                      <div className="size-5 rounded-full bg-primary/10 shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 rounded bg-muted-foreground/10 w-full" />
                        <div className="h-2.5 rounded bg-muted-foreground/10 w-3/4" />
                      </div>
                    </div>
                    {/* Fake question line 2 */}
                    <div className="flex items-start gap-3">
                      <div className="size-5 rounded-full bg-primary/10 shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 rounded bg-muted-foreground/10 w-full" />
                        <div className="h-2.5 rounded bg-muted-foreground/10 w-3/4" />
                      </div>
                    </div>
                    {/* Fake question line 3 */}
                    <div className="flex items-start gap-3">
                      <div className="size-5 rounded-full bg-primary/10 shrink-0 mt-0.5" />
                      <div className="space-y-2 flex-1">
                        <div className="h-2.5 rounded bg-muted-foreground/10 w-full" />
                        <div className="h-2.5 rounded bg-muted-foreground/10 w-3/4" />
                      </div>
                    </div>
                    {/* Fake answer box */}
                    <div className="mt-4 rounded-lg border border-amber-300/40 bg-amber-50/30 p-4 space-y-2">
                      <div className="h-2 w-16 rounded bg-amber-300/40" />
                      <div className="h-2 rounded bg-amber-200/30 w-full" />
                      <div className="h-2 rounded bg-amber-200/30 w-2/3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Subjects — Editorial divider style */}
      {featuredSubjects.length > 0 && (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
          {/* Centered divider header */}
          <div className="flex items-center gap-4 mb-10 max-w-5xl mx-auto">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Just Added
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Subjects list */}
          <div className="max-w-5xl mx-auto">
            {featuredSubjects.map((subject) => (
              <Link
                key={subject.id}
                href={`/subjects/${subject.code}`}
                className="group flex items-center justify-between gap-6 py-6 border-b border-border last:border-b-0 hover:px-4 hover:bg-accent/40 hover:-mx-4 rounded-lg transition-all"
              >
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    {subject.code} · {subject.department} · Sem{" "}
                    {subject.semester}
                  </p>
                  <h3 className="text-xl sm:text-2xl font-bold mt-1 group-hover:text-primary transition-colors">
                    {subject.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {subject.college} · {subject.regulation}
                  </p>
                </div>
                <div className="shrink-0 flex items-center justify-center size-10 rounded-full border border-border text-muted-foreground group-hover:border-primary group-hover:text-primary transition-colors">
                  <ArrowRight className="size-4" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* How It Works — Connected numbered circles */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t bg-card">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Connecting horizontal line */}
            <div className="hidden sm:block absolute top-7 left-[16%] right-[16%] h-px bg-border" />
            {/* Steps grid */}
            <div className="grid sm:grid-cols-3 gap-10 sm:gap-8">
              {HOW_IT_WORKS.map(({ step, title, description }) => (
                <div key={step} className="relative text-center">
                  {/* Number circle */}
                  <div className="inline-flex items-center justify-center size-14 rounded-full bg-primary text-primary-foreground text-lg font-bold relative z-10 ring-4 ring-card">
                    {step}
                  </div>
                  {/* Title */}
                  <h3 className="font-semibold text-base mt-4">{title}</h3>
                  {/* Description */}
                  <p className="text-sm text-muted-foreground mt-2">
                    {description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
