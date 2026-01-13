import { MessageSquare, Search, Send } from "lucide-react"
import { cn } from "@/lib/utils"

interface HowItWorksProps {
  className?: string
}

const STEPS = [
  {
    icon: Search,
    title: "Search",
    description:
      "Enter keywords to instantly find relevant tutorials, tools, and papers.",
  },
  {
    icon: MessageSquare,
    title: "Ask",
    description:
      "Sign in to chat with our AI for personalized recommendations based on your needs.",
  },
  {
    icon: Send,
    title: "Contribute",
    description: "Submit new resources to help grow the community collection.",
  },
]

export function HowItWorks({ className }: HowItWorksProps) {
  return (
    <section className={cn("py-16", className)} data-testid="how-it-works">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold md:text-3xl">How It Works</h2>
        <p className="mt-2 text-muted-foreground">
          Get started in three simple steps
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
        {STEPS.map((step, index) => (
          <div
            key={step.title}
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
            <h3 className="mb-2 text-lg font-semibold">{step.title}</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
