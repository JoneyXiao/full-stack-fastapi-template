import { MessageSquare, Search, Send } from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface HowItWorksProps {
  className?: string
}

const STEPS = [
  {
    icon: Search,
    titleKey: "landing.howItWorks.searchTitle",
    descriptionKey: "landing.howItWorks.searchDescription",
  },
  {
    icon: MessageSquare,
    titleKey: "landing.howItWorks.askTitle",
    descriptionKey: "landing.howItWorks.askDescription",
  },
  {
    icon: Send,
    titleKey: "landing.howItWorks.contributeTitle",
    descriptionKey: "landing.howItWorks.contributeDescription",
  },
]

export function HowItWorks({ className }: HowItWorksProps) {
  const { t } = useTranslation()

  return (
    <section className={cn("py-16", className)} data-testid="how-it-works">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">
          {t("landing.howItWorks.title")}
        </h2>
        <p className="mt-2 text-muted-foreground">
          {t("landing.howItWorks.subtitle")}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, index) => (
          <div
            key={step.titleKey}
            className={cn(
              "group relative flex flex-col items-center rounded-2xl border bg-background/50 p-8 text-center shadow-sm backdrop-blur-sm",
              "transition-all duration-300 hover:border-primary/30 hover:shadow-lg",
            )}
          >
            {/* Step number badge */}
            <div className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-sm">
              {index + 1}
            </div>

            {/* Icon */}
            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 transition-colors group-hover:bg-primary/15">
              <step.icon className="h-8 w-8 text-primary" />
            </div>

            {/* Content */}
            <h3 className="mb-2 text-lg font-semibold">{t(step.titleKey)}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {t(step.descriptionKey)}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
