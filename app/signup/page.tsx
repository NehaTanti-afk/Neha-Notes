import { Suspense } from 'react'
import { SignupForm } from './SignupForm'

export const metadata = {
  title: 'Sign Up — NehaNotes',
}

export default function SignupPage() {
  return (
    <div className="flex min-h-[calc(100vh-4.5rem)]">
      {/* Brand panel */}
      <div className="hidden lg:flex lg:w-2/5 flex-col justify-center items-center bg-primary text-primary-foreground p-12">
        <p className="text-3xl font-bold tracking-tight">
          Neha<span className="text-primary-foreground/70">Notes</span>
        </p>
        <p className="text-primary-foreground/60 mt-3 text-center max-w-xs text-sm leading-relaxed">
          Join thousands of MAKAUT students studying smarter with worked solutions
        </p>
        <div className="mt-10 space-y-3 w-full max-w-xs">
          <div className="flex items-center gap-3 text-primary-foreground/50 text-xs">
            <div className="size-1.5 rounded-full bg-primary-foreground/30" />
            Sample &amp; past year papers
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/50 text-xs">
            <div className="size-1.5 rounded-full bg-primary-foreground/30" />
            Full solutions with key points
          </div>
          <div className="flex items-center gap-3 text-primary-foreground/50 text-xs">
            <div className="size-1.5 rounded-full bg-primary-foreground/30" />
            Organised by subject &amp; semester
          </div>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Create your account</h1>
            <p className="text-sm text-muted-foreground">
              Join NehaNotes and start studying smarter
            </p>
          </div>
          <Suspense fallback={null}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
