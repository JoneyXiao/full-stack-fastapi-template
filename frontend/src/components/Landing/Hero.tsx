import { Link } from "@tanstack/react-router"
import type { LucideIcon } from "lucide-react"
import { BookOpen, MessageSquare, Search, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface HeroProps {
  className?: string
}

const FEATURES = [
  { icon: Search, label: "Instant keyword search" },
  { icon: MessageSquare, label: "AI-powered recommendations" },
  { icon: BookOpen, label: "Community curated" },
]

function FeatureItem({ icon: Icon, label }: { icon: LucideIcon; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <span>{label}</span>
    </div>
  )
}

function focusSearchInput() {
  document
    .querySelector<HTMLInputElement>('[data-testid="landing-search-input"]')
    ?.focus()
}

export function Hero({ className }: HeroProps) {
  return (
    <section className={cn("relative", className)} data-testid="landing-hero">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="py-16 text-center md:py-24 lg:py-32">
        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-background/80 px-4 py-1.5 text-sm font-medium backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-primary" />
          <span>Curated AI Resources</span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Find the best{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            AI resources
          </span>
          —fast.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
          Discover curated tutorials, tools, datasets, and papers. Search
          directly or ask our AI assistant for personalized recommendations.
        </p>

        {/* Quick action buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link to="/resources">
            <Button size="lg" className="gap-2">
              <BookOpen className="h-5 w-5" />
              Browse Resources
            </Button>
          </Link>
          <Button
            size="lg"
            variant="outline"
            className="gap-2"
            onClick={focusSearchInput}
          >
            <Search className="h-5 w-5" />
            Quick Search
          </Button>
        </div>

        {/* Feature highlights */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-sm text-muted-foreground">
          {FEATURES.map((feature) => (
            <FeatureItem key={feature.label} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
