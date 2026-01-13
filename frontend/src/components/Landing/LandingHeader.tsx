import { Link } from "@tanstack/react-router"
import { BookOpen, Menu, MessageSquare, Search, Send } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { isLoggedIn } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

interface LandingHeaderProps {
  className?: string
}

export function LandingHeader({ className }: LandingHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const authenticated = isLoggedIn()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      data-testid="landing-header"
    >
      <div className="container flex h-14 items-center justify-between px-4">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="h-5 w-5 text-primary" />
          <span className="hidden sm:inline">AI Resource Hub</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-4 md:flex">
          <Link
            to="/resources"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Browse
          </Link>
          {authenticated && (
            <Link
              to="/submissions/new"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Contribute
            </Link>
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-2 md:flex">
          {/* Quick action buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Focus the search input on the page
              document
                .querySelector<HTMLInputElement>(
                  '[data-testid="landing-search-input"]',
                )
                ?.focus()
            }}
            title="Jump to search"
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              // Scroll to chat section
              document
                .querySelector('[data-testid="landing-chat-section"]')
                ?.scrollIntoView({ behavior: "smooth" })
            }}
            title="Jump to chat"
          >
            <MessageSquare className="h-4 w-4" />
          </Button>

          {/* Auth buttons */}
          {authenticated ? (
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm">Sign Up</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t md:hidden">
          <nav className="container flex flex-col gap-2 p-4">
            <Link
              to="/resources"
              className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
              onClick={() => setMobileMenuOpen(false)}
            >
              <BookOpen className="h-4 w-4" />
              Browse Resources
            </Link>
            {authenticated && (
              <Link
                to="/submissions/new"
                className="flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Send className="h-4 w-4" />
                Contribute
              </Link>
            )}
            <div className="my-2 h-px bg-border" />
            {authenticated ? (
              <Link
                to="/dashboard"
                className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                onClick={() => setMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-md px-3 py-2 text-sm font-medium hover:bg-accent"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  )
}
