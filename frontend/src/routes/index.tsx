import { createFileRoute, Link } from "@tanstack/react-router"
import {
  FeaturedTopics,
  Hero,
  HowItWorks,
  LandingChat,
  LandingHeader,
  LandingSearch,
} from "@/components/Landing"
import { isLoggedIn } from "@/hooks/useAuth"

export const Route = createFileRoute("/")({
  component: LandingPage,
  head: () => ({
    meta: [
      {
        title: "AI Resource Hub - Find the best AI resources fast",
      },
    ],
  }),
})

function LandingPage() {
  const authenticated = isLoggedIn()

  return (
    <div className="min-h-screen bg-background">
      {/* Floating header with navigation */}
      <LandingHeader />

      <main className="container mx-auto px-4 pt-4">
        {/* Hero Section */}
        <Hero />

        {/* Search Section */}
        <section className="mt-16">
          <div className="mb-6 text-center">
            <h2 className="text-xl font-semibold md:text-2xl">
              Search Resources
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Find exactly what you need
            </p>
          </div>
          <LandingSearch className="mx-auto max-w-3xl" />
        </section>

        {/* Chat Section */}
        <section className="mt-20">
          <LandingChat
            className="mx-auto max-w-3xl"
            isAuthenticated={authenticated}
          />
        </section>

        {/* Featured Topics */}
        <FeaturedTopics className="mt-4" />

        {/* How It Works */}
        <HowItWorks className="mx-auto mt-20 max-w-4xl" />
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-muted/30 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="text-lg font-semibold">AI Resource Hub</div>
          <p className="mt-2 text-sm text-muted-foreground">
            Curated resources for the AI community
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
            <Link
              to="/resources"
              className="transition-colors hover:text-foreground"
            >
              Browse
            </Link>
            {authenticated && (
              <Link
                to="/submissions/new"
                className="transition-colors hover:text-foreground"
              >
                Contribute
              </Link>
            )}
          </div>
        </div>
      </footer>
    </div>
  )
}
