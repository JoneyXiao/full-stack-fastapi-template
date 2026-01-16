import { createFileRoute, Link } from "@tanstack/react-router"
import type { ReactElement, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  FeaturedTopics,
  FinalCTA,
  Hero,
  HowItWorks,
  LandingChat,
  LandingFAQ,
  LandingSearch,
  Testimonials,
  TrustStrip,
} from "@/components/Landing"
import { AppNavbar } from "@/components/Nav"
import { isLoggedIn } from "@/hooks/useAuth"
import { cn } from "@/lib/utils"

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

type SectionWrapProps = {
  children: ReactNode
  className?: string
  id?: string
}

function SectionWrap({
  children,
  className,
  id,
}: SectionWrapProps): ReactElement {
  return (
    <section className={cn("px-6 md:px-8", className)} id={id}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  )
}

function scrollToSection(id: string, focusSelector?: string): void {
  const section = document.getElementById(id)
  section?.scrollIntoView({ behavior: "smooth", block: "start" })
  if (focusSelector) {
    setTimeout(() => {
      document.querySelector<HTMLElement>(focusSelector)?.focus()
    }, 250)
  }
}

function LandingPage(): ReactElement {
  const { t } = useTranslation()
  const authenticated = isLoggedIn()

  function handleChatClick(): void {
    scrollToSection("landing-chat", '[data-testid="landing-chat-input"]')
  }

  function handleSearchClick(): void {
    scrollToSection("landing-search", '[data-testid="landing-search-input"]')
  }

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <main className="relative">
        {/* Hero Section */}
        <SectionWrap>
          <Hero
            onChatClick={handleChatClick}
            onSearchClick={handleSearchClick}
          />
        </SectionWrap>

        {/* Trust Strip */}
        <SectionWrap className="mt-4">
          <TrustStrip />
        </SectionWrap>

        {/* How It Works */}
        <SectionWrap className="mt-6">
          <HowItWorks className="mx-auto max-w-5xl" />
        </SectionWrap>

        {/* Chat Section */}
        <SectionWrap className="mt-16" id="landing-chat">
          <div className="rounded-3xl border bg-muted/20 p-6 md:p-10">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold md:text-2xl">
                {t("landing.chatSection.title")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("landing.chatSection.subtitle")}
              </p>
            </div>
            <LandingChat
              className="mx-auto max-w-3xl"
              isAuthenticated={authenticated}
            />
          </div>
        </SectionWrap>

        {/* Search Section */}
        <SectionWrap className="mt-16" id="landing-search">
          <div className="rounded-3xl border bg-background/60 p-6 shadow-sm md:p-10">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold md:text-2xl">
                {t("landing.searchResources")}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {t("landing.findWhatYouNeed")}
              </p>
            </div>
            <div className="mx-auto max-w-4xl rounded-2xl border bg-card/80 p-6">
              <LandingSearch />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {t("landing.searchNote")}
              </p>
            </div>
          </div>
        </SectionWrap>

        {/* Featured Topics */}
        <SectionWrap className="mt-12">
          <FeaturedTopics />
        </SectionWrap>

        {/* Testimonials */}
        <SectionWrap className="mt-16">
          <Testimonials />
        </SectionWrap>

        {/* FAQ */}
        <SectionWrap className="mt-16">
          <LandingFAQ />
        </SectionWrap>

        {/* Final CTA */}
        <SectionWrap className="mt-24">
          <FinalCTA onChatClick={handleChatClick} />
        </SectionWrap>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-muted/30 py-12">
        <div className="px-6 md:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <div className="text-lg font-semibold">
                {t("landing.footer.title")}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("landing.footer.description")}
              </p>
              <div className="mt-6 flex items-center justify-center gap-6 text-sm text-muted-foreground">
                <Link
                  to="/resources"
                  className="transition-colors hover:text-foreground"
                >
                  {t("landing.footer.browse")}
                </Link>
                {authenticated && (
                  <Link
                    to="/submissions/new"
                    className="transition-colors hover:text-foreground"
                  >
                    {t("landing.footer.contribute")}
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
