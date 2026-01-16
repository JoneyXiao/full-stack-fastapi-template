import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import {
  BookOpen,
  type LucideIcon,
  MessageSquare,
  Search,
  Sparkles,
} from "lucide-react"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  createFadeIn,
  createFadeUp,
  createFloatAnimation,
  createStagger,
} from "./landingMotion"

interface HeroProps {
  className?: string
  onChatClick?: () => void
  onSearchClick?: () => void
}

interface FeatureItemProps {
  icon: LucideIcon
  label: string
}

function FeatureItem({ icon: Icon, label }: FeatureItemProps): ReactElement {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span>{label}</span>
    </div>
  )
}

export function Hero({
  className,
  onChatClick,
  onSearchClick,
}: HeroProps): ReactElement {
  const { t, i18n } = useTranslation()
  const reduceMotion = useReducedMotion()

  const FEATURES = [
    { icon: MessageSquare, label: t("landing.heroFeatures.guided") },
    { icon: Search, label: t("landing.heroFeatures.fastSearch") },
    { icon: BookOpen, label: t("landing.heroFeatures.community") },
  ]

  const QUICK_STEPS = [
    t("landing.onboarding.steps.ask"),
    t("landing.onboarding.steps.search"),
    t("landing.onboarding.steps.save"),
    t("landing.onboarding.steps.contribute"),
  ]

  const containerVariants = createStagger(reduceMotion, 0.12, 0.15)
  const itemVariants = createFadeUp(reduceMotion, 18, 0.55)
  const fadeInVariants = createFadeIn(reduceMotion, 0.7)
  const featureStaggerVariants = createStagger(reduceMotion, 0.1, 0.2)
  const panelVariants = createFadeUp(reduceMotion, 24, 0.7)

  return (
    <section className={cn("relative", className)} data-testid="landing-hero">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          className="absolute -top-44 left-1/2 h-[520px] w-[860px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl"
          animate={createFloatAnimation(reduceMotion, 14)}
          aria-hidden="true"
        />
        <motion.div
          className="absolute -right-24 top-32 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
          animate={createFloatAnimation(reduceMotion, 18)}
          aria-hidden="true"
        />
        <motion.div
          className="absolute left-6 top-28 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
          animate={createFloatAnimation(reduceMotion, 10)}
          aria-hidden="true"
        />
      </div>

      <div className="py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <motion.div
            key={`hero-content-${i18n.language}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Badge */}
            <motion.div
              variants={fadeInVariants}
              className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span>{t("landing.heroBadge")}</span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl"
            >
              {t("landing.heroTitle")}{" "}
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                {t("landing.heroTitleHighlight")}
              </span>{" "}
              {t("landing.heroTitleEnd")}
            </motion.h1>
            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
            >
              {t("landing.heroDescription")}
            </motion.p>

            {/* Quick action buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
            >
              <Button
                size="lg"
                className="w-full gap-2 sm:w-auto"
                onClick={onChatClick}
              >
                <MessageSquare className="h-5 w-5" />
                {t("landing.primaryCta")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full gap-2 sm:w-auto"
                onClick={onSearchClick}
              >
                <Search className="h-5 w-5" />
                {t("landing.secondaryCta")}
              </Button>
              <Link to="/resources" className="w-full sm:w-auto">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full gap-2 sm:w-auto"
                >
                  <BookOpen className="h-5 w-5" />
                  {t("landing.browseResources")}
                </Button>
              </Link>
            </motion.div>

            {/* <motion.p
              variants={itemVariants}
              className="mt-3 text-sm text-muted-foreground"
            >
              {t("landing.heroNote")}
            </motion.p> */}

            {/* Feature highlights */}
            <div className="mt-12 flex justify-center sm:justify-start">
              <motion.div
                key={i18n.language}
                variants={featureStaggerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-start gap-3 text-left text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:items-start sm:gap-x-10 sm:gap-y-4"
              >
                {FEATURES.map((feature) => (
                  <motion.div key={feature.label} variants={itemVariants}>
                    <FeatureItem {...feature} />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            key={`hero-panel-${i18n.language}`}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            className="relative"
          >
            <div className="rounded-3xl border bg-background/80 p-6 shadow-xl shadow-primary/10 backdrop-blur">
              <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-4 w-4" />
                </span>
                {t("landing.onboarding.title")}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {t("landing.onboarding.subtitle")}
              </h3>
              <div className="mt-6 space-y-3">
                {QUICK_STEPS.map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-3 rounded-2xl border bg-background/70 p-3"
                  >
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                      {index + 1}
                    </div>
                    <p className="text-sm text-muted-foreground">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
