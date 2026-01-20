import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import { MessageSquare, Search } from "lucide-react"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createFadeUp, createStagger } from "./landingMotion"

interface OnboardingChecklistProps {
  className?: string
  onChatClick?: () => void
  onSearchClick?: () => void
}

const STEPS = [
  "landing.onboarding.steps.ask",
  "landing.onboarding.steps.search",
  "landing.onboarding.steps.save",
  "landing.onboarding.steps.contribute",
]

export function OnboardingChecklist({
  className,
  onChatClick,
  onSearchClick,
}: OnboardingChecklistProps): ReactElement {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const containerVariants = createStagger(reduceMotion, 0.12, 0.05)
  const itemVariants = createFadeUp(reduceMotion, 16, 0.5)

  return (
    <motion.section
      className={cn("py-14", className)}
      data-testid="landing-onboarding"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="rounded-3xl border bg-muted/30 p-8 md:p-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <motion.div variants={itemVariants}>
            <h2 className="text-2xl font-semibold md:text-3xl">
              {t("landing.onboarding.title")}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {t("landing.onboarding.subtitle")}
            </p>
          </motion.div>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3"
          >
            <Button className="gap-2" onClick={onChatClick}>
              <MessageSquare className="h-4 w-4" />
              {t("landing.onboarding.ctaChat")}
            </Button>
            <Button variant="outline" className="gap-2" onClick={onSearchClick}>
              <Search className="h-4 w-4" />
              {t("landing.onboarding.ctaSearch")}
            </Button>
            <Link
              to="/resources"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {t("landing.onboarding.skip")}
            </Link>
          </motion.div>
        </div>

        <div className="relative mt-8 grid gap-4 md:grid-cols-2">
          {STEPS.map((stepKey, index) => (
            <motion.div
              key={stepKey}
              variants={itemVariants}
              className="flex items-start gap-3 rounded-2xl border bg-background/80 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {index + 1}
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{t(stepKey)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
