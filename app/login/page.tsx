import { Suspense } from "react";
import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Sign In — NehaNotes",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)]">
      {/* Brand panel — hidden on mobile */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-center items-center bg-primary text-primary-foreground p-12">
        <p className="text-3xl font-bold tracking-tight">
          Neha<span className="text-primary-foreground/70">Notes</span>
        </p>
        <p className="text-primary-foreground/60 mt-3 text-center max-w-xs text-sm leading-relaxed">
          Access question papers and worked solutions for MAKAUT engineering students
        </p>
        <div className="mt-10 space-y-3 w-full max-w-xs">
          <div className="flex items-center gap-3 text-primary-foreground/50 text-xs">
            <div className="size-1.5 rounded-full bg-primary-foreground/30" />
            Step-by-step solutions
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/50 text-xs">
            <div className="size-1.5 rounded-full bg-primary-foreground/30" />
            Course outcome mapped
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/50 text-xs">
            <div className="size-1.5 rounded-full bg-primary-foreground/30" />
            Inline math rendering
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Sign in to NehaNotes</h1>
            <p className="text-sm text-muted-foreground">
              Enter your credentials to access your account
            </p>
          </div>
          <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
          </Suspense>
          <p className="text-center text-xs text-muted-foreground">
            By signing in you agree to our terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}

function LoginFormSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-6 space-y-4 animate-pulse">
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="h-9 bg-muted rounded" />
      <div className="h-4 bg-muted rounded w-1/4 mx-auto" />
      <div className="h-9 bg-muted rounded" />
      <div className="h-9 bg-muted rounded" />
    </div>
  );
}
