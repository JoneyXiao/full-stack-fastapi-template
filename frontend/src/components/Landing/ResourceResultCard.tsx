import { Link } from "@tanstack/react-router"
import { ExternalLink } from "lucide-react"
import type { ResourcePublic } from "@/client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ResourceResultCardProps {
  resource: ResourcePublic
}

export function ResourceResultCard({ resource }: ResourceResultCardProps) {
  return (
    <Link
      to="/resources/$resourceId"
      params={{ resourceId: resource.id }}
      data-testid="resource-result-card"
      className="group cursor-pointer"
    >
      <Card className="h-full border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-200 hover:border-primary/30 hover:bg-background/80 hover:shadow-lg">
        <CardHeader className="pb-2">
          <CardTitle
            className="flex items-start justify-between gap-2 text-base"
            data-testid="resource-card-title"
          >
            <span className="line-clamp-2">{resource.title}</span>
            <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {resource.description && (
            <p
              className="line-clamp-2 text-sm text-muted-foreground"
              data-testid="resource-card-description"
            >
              {resource.description}
            </p>
          )}
          <div className="mt-3 flex items-center gap-2">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
              {resource.type}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
