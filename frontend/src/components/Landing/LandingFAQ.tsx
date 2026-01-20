import { motion, useReducedMotion } from "framer-motion"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { createFadeUp, createStagger } from "./landingMotion"

interface LandingFAQProps {
  className?: string
}

const FAQS = [
  {
    value: "faq-1",
    questionKey: "landing.faq.items.sources.question",
    answerKey: "landing.faq.items.sources.answer",
  },
  {
    value: "faq-2",
    questionKey: "landing.faq.items.chat.question",
    answerKey: "landing.faq.items.chat.answer",
  },
  {
    value: "faq-3",
    questionKey: "landing.faq.items.submissions.question",
    answerKey: "landing.faq.items.submissions.answer",
  },
  {
    value: "faq-4",
    questionKey: "landing.faq.items.privacy.question",
    answerKey: "landing.faq.items.privacy.answer",
  },
]

export function LandingFAQ({ className }: LandingFAQProps): ReactElement {
  const { t } = useTranslation()
  const reduceMotion = useReducedMotion()
  const containerVariants = createStagger(reduceMotion, 0.1, 0.05)
  const itemVariants = createFadeUp(reduceMotion, 16, 0.5)

  return (
    <motion.section
      className={cn("py-14", className)}
      data-testid="landing-faq"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <motion.div variants={itemVariants} className="text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">
          {t("landing.faq.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t("landing.faq.subtitle")}
        </p>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="mx-auto mt-8 max-w-3xl rounded-2xl border bg-background/70 p-6 shadow-sm"
      >
        <Accordion type="single" collapsible>
          {FAQS.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="text-sm font-semibold">
                {t(item.questionKey)}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {t(item.answerKey)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </motion.section>
  )
}
