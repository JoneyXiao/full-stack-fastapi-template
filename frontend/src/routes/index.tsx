import { createFileRoute, Link } from "@tanstack/react-router"
import type { ReactElement, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import {
  FeaturedTopics,
  FinalCTA,
  Hero,
  HowItWorks,
  LandingFAQ,
  Testimonials,
  TrustStrip,
} from "@/components/Landing"
import { AppNavbar } from "@/components/Nav"
import { isLoggedIn } from "@/hooks/useAuth"
import useDocumentTitle from "@/hooks/useDocumentTitle"
import { NavDialogsProvider, useNavDialogs } from "@/hooks/useNavDialogs"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/")({
  component: LandingPage,
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

function LandingPageContent(): ReactElement {
  const { t } = useTranslation()
  const authenticated = isLoggedIn()
  const { openChat, openSearch } = useNavDialogs()
  useDocumentTitle("landing.pageTitle")

  return (
    <div className="min-h-screen bg-background">
      <AppNavbar />

      <main className="relative">
        {/* Hero Section */}
        <SectionWrap>
          <Hero onChatClick={openChat} onSearchClick={openSearch} />
        </SectionWrap>

        {/* Trust Strip */}
        <SectionWrap className="mt-4">
          <TrustStrip />
        </SectionWrap>

        {/* How It Works */}
        <SectionWrap className="mt-6">
          <HowItWorks className="mx-auto max-w-5xl" />
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
          <FinalCTA onChatClick={openChat} />
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

function LandingPage(): ReactElement {
  return (
    <NavDialogsProvider>
      <LandingPageContent />
    </NavDialogsProvider>
  )
}
