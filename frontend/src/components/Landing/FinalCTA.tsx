import { Link } from "@tanstack/react-router"
import { motion, useReducedMotion } from "framer-motion"
import { ArrowRight, MessageSquare } from "lucide-react"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { createFadeUp, createStagger } from "./landingMotion"

interface FinalCTAProps {
  className?: string
  onChatClick?: () => void
}

export function FinalCTA({
  className,
  onChatClick,
}: FinalCTAProps): ReactElement {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const containerVariants = createStagger(reduceMotion, 0.12, 0.1)
  const itemVariants = createFadeUp(reduceMotion, 16, 0.5)

  return (
    <motion.section
      className={cn("py-16", className)}
      data-testid="landing-final-cta"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="rounded-3xl border bg-primary/5 p-8 text-center shadow-lg shadow-primary/10 md:p-12">
        <motion.h2
          variants={itemVariants}
          className="text-2xl font-semibold md:text-3xl"
        >
          {t("landing.finalCta.title")}
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="mx-auto mt-2 max-w-2xl text-muted-foreground"
        >
          {t("landing.finalCta.subtitle")}
        </motion.p>
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap items-center justify-center gap-4"
        >
          <Button className="gap-2" onClick={onChatClick}>
            <MessageSquare className="h-4 w-4" />
            {t("landing.finalCta.primary")}
          </Button>
          <Link to="/resources">
            <Button variant="outline" className="gap-2">
              {t("landing.finalCta.secondary")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  )
}
