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
import { cn } from "@/lib/utils"

interface FeaturedTopicsProps {
  className?: string
}

const FEATURED_TOPICS = [
  { label: "Machine Learning", query: "machine learning", icon: Brain },
  { label: "GPT & LLMs", query: "GPT LLM", icon: MessageSquare },
  { label: "Computer Vision", query: "computer vision", icon: Eye },
  { label: "NLP", query: "natural language processing", icon: BookOpen },
  { label: "Datasets", query: "dataset", icon: Database },
  { label: "Tutorials", query: "tutorial", icon: GraduationCap },
  { label: "Research Papers", query: "paper research", icon: FileText },
  { label: "Tools", query: "tool", icon: Wrench },
]

export function FeaturedTopics({ className }: FeaturedTopicsProps) {
  return (
    <section className={cn("py-12", className)} data-testid="featured-topics">
      <h2 className="mb-6 text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Popular Topics
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
              {topic.label}
            </span>
          </Link>
        ))}
      </div>
    </section>
  )
}
