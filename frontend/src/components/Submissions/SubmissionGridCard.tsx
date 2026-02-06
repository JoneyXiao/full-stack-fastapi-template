/**
 * Grid card for displaying a submission with image, metadata, and status badge.
 */

import { Link } from "@tanstack/react-router"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import type { ResourceSubmissionPublic } from "@/client"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import {
  calculateImageFit,
  getResourceIcon,
  resolveApiUrl,
  safeHostname,
} from "@/utils"

interface SubmissionGridCardProps {
  submission: ResourceSubmissionPublic
}

/**
 * Status badge variant mapping
 */
function getStatusBadgeVariant(
  status: string,
): "default" | "secondary" | "destructive" | "outline" {
  switch (status) {
    case "approved":
      return "default" // Primary/success color
    case "rejected":
      return "destructive"
    default:
      return "secondary"
  }
}

/**
 * Grid card for displaying a submission with image, metadata, and status.
 */
export function SubmissionGridCard({ submission }: SubmissionGridCardProps) {
  const { t } = useTranslation()
  const [imageError, setImageError] = useState(false)
  const [imageFit, setImageFit] = useState<"cover" | "contain">("cover")

  function handleImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setImageFit(calculateImageFit(naturalWidth, naturalHeight))
  }

  const host = safeHostname(submission.destination_url)
  const Icon = getResourceIcon(submission.destination_url)
  const imageUrl = resolveApiUrl(submission.image_url)
  const hasImage = imageUrl && !imageError

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
        to="/submissions/$submissionId"
        params={{ submissionId: submission.id }}
        className="relative block aspect-[16/10] w-full overflow-hidden bg-muted"
      >
        {hasImage ? (
          <img
            src={imageUrl}
            alt={submission.title}
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

        {/* Status badge */}
        <div className="absolute left-3 top-3">
          <Badge variant={getStatusBadgeVariant(submission.status)}>
            {t(`submissions.status.${submission.status}`, {
              defaultValue: submission.status,
            })}
          </Badge>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Title & Description */}
        <div className="flex-1 space-y-1.5">
          <Link
            to="/submissions/$submissionId"
            params={{ submissionId: submission.id }}
            className="block"
          >
            <h3 className="font-semibold leading-snug text-foreground line-clamp-1 transition-colors group-hover:text-primary">
              {submission.title}
            </h3>
          </Link>
          {submission.description && (
            <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
              {submission.description}
            </p>
          )}
        </div>

        {/* Footer: Category + Created Date */}
        <div className="flex items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              title={submission.category_name ?? "-"}
              className="max-w-[8rem] truncate text-muted-foreground"
            >
              {submission.category_name ?? "-"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {new Date(submission.created_at).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </article>
  )
}
