import { motion, useReducedMotion } from "framer-motion"
import { Quote } from "lucide-react"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"
import { createFadeUp, createStagger } from "./landingMotion"

interface TestimonialsProps {
  className?: string
}

const TESTIMONIALS = [
  {
    quoteKey: "landing.testimonials.items.finding",
    authorKey: "landing.testimonials.authors.communityBuilder",
    roleKey: "landing.testimonials.roles.communityBuilder",
  },
  {
    quoteKey: "landing.testimonials.items.focus",
    authorKey: "landing.testimonials.authors.researcher",
    roleKey: "landing.testimonials.roles.researcher",
  },
  {
    quoteKey: "landing.testimonials.items.workflow",
    authorKey: "landing.testimonials.authors.mlEngineer",
    roleKey: "landing.testimonials.roles.mlEngineer",
  },
]

export function Testimonials({ className }: TestimonialsProps): ReactElement {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const containerVariants = createStagger(reduceMotion, 0.12, 0.1)
  const itemVariants = createFadeUp(reduceMotion, 18, 0.55)

  return (
    <motion.section
      className={cn("py-14", className)}
      data-testid="landing-testimonials"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {t("landing.testimonials.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t("landing.testimonials.subtitle")}
        </p>
      </motion.div>

      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {TESTIMONIALS.map((testimonial) => (
          <motion.div
            key={testimonial.quoteKey}
            variants={itemVariants}
            className="rounded-2xl border bg-background/70 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
          >
            <Quote className="h-6 w-6 text-primary" />
            <p className="mt-4 text-sm text-muted-foreground">
              {t(testimonial.quoteKey)}
            </p>
            <div className="mt-4 text-sm font-semibold">
              {t(testimonial.authorKey)}
            </div>
            <div className="text-xs text-muted-foreground">
              {t(testimonial.roleKey)}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}
