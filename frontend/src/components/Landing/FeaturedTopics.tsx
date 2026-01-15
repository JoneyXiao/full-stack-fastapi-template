import { Link } from "@tanstack/react-router"
import {
  BookOpen,
  Brain,
  Database,
  Eye,
  FileText,
  GraduationCap,
  MessageSquare,
  Wrench,
} from "lucide-react"
import { useTranslation } from "react-i18next"
import { cn } from "@/lib/utils"

interface FeaturedTopicsProps {
  className?: string
}

const FEATURED_TOPICS = [
  {
    labelKey: "landing.featuredTopics.machineLearning",
    query: "machine learning",
    icon: Brain,
  },
  {
    labelKey: "landing.featuredTopics.gptLlms",
    query: "GPT LLM",
    icon: MessageSquare,
  },
  {
    labelKey: "landing.featuredTopics.computerVision",
    query: "computer vision",
    icon: Eye,
  },
  {
    labelKey: "landing.featuredTopics.nlp",
    query: "natural language processing",
    icon: BookOpen,
  },
  {
    labelKey: "landing.featuredTopics.datasets",
    query: "dataset",
    icon: Database,
  },
  {
    labelKey: "landing.featuredTopics.tutorials",
    query: "tutorial",
    icon: GraduationCap,
  },
  {
    labelKey: "landing.featuredTopics.papers",
    query: "paper research",
    icon: FileText,
  },
  { labelKey: "landing.featuredTopics.tools", query: "tool", icon: Wrench },
]

export function FeaturedTopics({ className }: FeaturedTopicsProps) {
  const { t } = useTranslation()

  return (
    <section className={cn("py-12", className)} data-testid="featured-topics">
      <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
        {t("landing.featuredTopics.title")}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-3">
        {FEATURED_TOPICS.map((topic) => (
          <Link
            key={topic.query}
            to="/resources"
            search={{ q: topic.query }}
            className={cn(
              "group flex cursor-pointer items-center gap-2 rounded-full border bg-background px-4 py-2.5 text-sm font-medium shadow-sm",
              "transition-all duration-200 hover:border-primary/50 hover:bg-primary/5 hover:shadow-md",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
            )}
          >
            <topic.icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
            <span className="transition-colors group-hover:text-primary">
              {t(topic.labelKey)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
