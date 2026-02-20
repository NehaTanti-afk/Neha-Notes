'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'

export function Navbar() {
  const { user, loading, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)

  const displayName = user?.user_metadata?.name ?? user?.email ?? ''

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Thin accent bar at top */}
      <div className="h-0.5 bg-primary" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo - Two-tone text */}
          <Link
            href="/"
            className="flex items-baseline gap-0 text-2xl tracking-tight select-none"
          >
            <span className="font-extrabold text-primary">Neha</span>
            <span className="font-light text-[oklch(0.65_0.06_60)]">Notes</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/subjects"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Subjects
            </Link>
          </nav>

          {/* Desktop auth controls */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <div className="h-8 w-24 animate-pulse rounded-md bg-muted" />
            ) : user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  Dashboard
                </Link>
                <span className="text-sm text-muted-foreground truncate max-w-[160px]">
                  {displayName}
                </span>
                <Button variant="outline" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline" size="sm">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-background px-4 py-4 flex flex-col gap-3">
          <Link
            href="/subjects"
            className="text-sm font-medium border-l-2 border-primary pl-3 py-1"
            onClick={() => setMenuOpen(false)}
          >
            Subjects
          </Link>
          {!loading && (
            <>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium border-l-2 border-primary pl-3 py-1"
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <p className="text-sm text-muted-foreground truncate border-l-2 border-primary pl-3 py-1">
                    {displayName}
                  </p>
                  <div className="border-l-2 border-primary pl-3">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        signOut()
                        setMenuOpen(false)
                      }}
                    >
                      Sign Out
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-2 border-l-2 border-primary pl-3">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link href="/login">Sign In</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Link href="/signup">Sign Up</Link>
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </header>
  )
}
