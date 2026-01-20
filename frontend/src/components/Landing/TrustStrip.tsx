import { motion, useReducedMotion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { CheckCircle2, Sparkles, Users, Zap } from "lucide-react"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { createFadeUp, createStagger } from "./landingMotion"

interface TrustStripProps {
  className?: string
}

const TRUST_ITEMS: Array<{
  icon: LucideIcon
  titleKey: string
  descriptionKey: string
}> = [
  {
    icon: Sparkles,
    titleKey: "landing.trust.items.curated.title",
    descriptionKey: "landing.trust.items.curated.description",
  },
  {
    icon: Users,
    titleKey: "landing.trust.items.community.title",
    descriptionKey: "landing.trust.items.community.description",
  },
  {
    icon: Zap,
    titleKey: "landing.trust.items.fast.title",
    descriptionKey: "landing.trust.items.fast.description",
  },
  {
    icon: CheckCircle2,
    titleKey: "landing.trust.items.transparent.title",
    descriptionKey: "landing.trust.items.transparent.description",
  },
]

export function TrustStrip({ className }: TrustStripProps): ReactElement {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const containerVariants = createStagger(reduceMotion, 0.1, 0.05)
  const itemVariants = createFadeUp(reduceMotion, 16, 0.45)

  return (
    <motion.section
      className={cn("py-10", className)}
      data-testid="landing-trust"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {TRUST_ITEMS.map((item) => (
          <motion.div
            key={item.titleKey}
            variants={itemVariants}
            className="flex items-start gap-3 rounded-2xl border bg-background/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md"
          >
            <div className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
              <item.icon className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold">{t(item.titleKey)}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(item.descriptionKey)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
