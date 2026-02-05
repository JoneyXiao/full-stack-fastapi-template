import { Link } from "@tanstack/react-router"
import { ArrowUpRight } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { PiShootingStarFill } from "react-icons/pi"
import { TbThumbUp } from "react-icons/tb"

import type { ResourcePublic } from "@/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  calculateImageFit,
  getResourceIcon,
  resolveApiUrl,
  safeHostname,
} from "@/utils"

interface ResourceGridCardProps {
  resource: ResourcePublic
}

/**
 * Grid card for displaying a resource with image, metadata, and likes count.
 */
export function ResourceGridCard({ resource }: ResourceGridCardProps) {
  const { t } = useTranslation()
  const [imageError, setImageError] = useState(false)
  const [imageFit, setImageFit] = useState<"cover" | "contain">("cover")

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setImageFit(calculateImageFit(naturalWidth, naturalHeight))
  }

  const host = safeHostname(resource.destination_url)
  const Icon = getResourceIcon(resource.destination_url)
  const imageUrl = resolveApiUrl(resource.image_url)
  const hasImage = imageUrl && !imageError
  const isNew =
    Date.now() - new Date(resource.created_at).getTime() <
    7 * 24 * 60 * 60 * 1000

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border bg-card",
        "transition-all duration-200 ease-out",
        "focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-offset-2",
      )}
    >
      {/* Image Area */}
      <Link
        to="/resources/$resourceId"
        params={{ resourceId: resource.id }}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-muted"
      >
        {hasImage ? (
          <img
            src={imageUrl}
            alt={resource.title}
            onLoad={handleImageLoad}
            className={cn(
              "h-full w-full",
              imageFit === "contain"
                ? "object-contain p-6"
                : "object-cover transition-transform duration-300 ease-out group-hover:scale-105",
            )}
            onError={() => setImageError(true)}
            decoding="async"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted via-muted to-muted/80">
            <div className="flex flex-col items-center gap-2 text-muted-foreground/60">
              <Icon className="h-10 w-10" />
              {host && (
                <span className="text-xs font-medium opacity-70">{host}</span>
              )}
            </div>
          </div>
        )}

        {/* New badge */}
        {isNew && (
          <div className="absolute left-3 top-3">
            <Badge variant="default">
              <PiShootingStarFill className="h-4 w-4" />
              New
            </Badge>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />

        {/* Visit button on hover */}
        <div className="absolute bottom-3 right-3 opacity-0 transition-all duration-200 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0">
          <Button
            asChild
            size="sm"
            className="h-8 gap-1 rounded-full bg-white/95 text-slate-900 shadow-lg backdrop-blur-sm hover:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href={resource.destination_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("resources.visit")}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title & Description */}
        <div className="flex-1 space-y-1.5">
          <Link
            to="/resources/$resourceId"
            params={{ resourceId: resource.id }}
            className="block"
          >
            <h3 className="font-semibold leading-snug text-foreground line-clamp-1 transition-colors group-hover:text-primary">
              {resource.title}
            </h3>
          </Link>
          {resource.description && (
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {resource.description}
            </p>
          )}
        </div>

        {/* Footer: Category + Created Date + Likes */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              title={resource.category_name ?? "-"}
              className="max-w-[8rem] truncate text-muted-foreground"
            >
              {resource.category_name ?? "-"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(resource.created_at).toLocaleDateString()}
            </span>
          </div>

          {/* Likes (display-only per FR-007a) */}
          <div className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-muted-foreground">
            <TbThumbUp className="h-3.5 w-3.5" />
            <span className="font-medium">{resource.likes_count ?? 0}</span>
          </div>
        </div>
      </div>
    </article>
  )
}
