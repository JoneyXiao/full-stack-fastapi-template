/**
 * Table component for displaying submissions in List view.
 * Features:
 * - Status column showing submission status badge
 * - Cover image thumbnail
 * - Destination URL rendered as clickable hostname link
 */

import { Link } from "@tanstack/react-router"
import type { ComponentType, SyntheticEvent } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { TbExternalLink } from "react-icons/tb"

import type { ResourceSubmissionPublic } from "@/client"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import {
  calculateImageFit,
  getResourceIcon,
  resolveApiUrl,
  safeHostname,
} from "@/utils"

interface SubmissionsTableProps {
  submissions: ResourceSubmissionPublic[]
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

function SubmissionListThumbnail({
  imageUrl,
  title,
  FallbackIcon,
}: {
  imageUrl?: string | null
  title: string
  FallbackIcon: ComponentType<{ className?: string }>
}) {
  const [imageError, setImageError] = useState(false)
  const [imageFit, setImageFit] = useState<"cover" | "contain">("cover")

  const hasImage = Boolean(imageUrl) && !imageError

  function handleImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setImageFit(calculateImageFit(naturalWidth, naturalHeight))
  }

  return (
    <div className="mt-0.5 hidden h-9 w-14 shrink-0 overflow-hidden rounded-lg bg-muted md:inline-flex">
      {hasImage ? (
        <img
          src={imageUrl!}
          alt={title}
          onLoad={handleImageLoad}
          onError={() => setImageError(true)}
          className={cn(
            "h-full w-full",
            imageFit === "contain" ? "object-contain p-1" : "object-cover",
          )}
          decoding="async"
          loading="lazy"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
          <FallbackIcon className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const { t } = useTranslation()

  return (
    <div className="rounded-md bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60%] md:w-[400px]">
              {t("common.title")}
            </TableHead>
            <TableHead className="w-[1%] whitespace-nowrap px-2 text-center">
              {t("resources.detail.categoryLabel")}
            </TableHead>
            <TableHead className="hidden md:table-cell">
              {t("resources.detail.domain")}
            </TableHead>
            <TableHead className="hidden md:table-cell">
              {t("resources.detail.added")}
            </TableHead>
            <TableHead className="w-[1%] whitespace-nowrap px-2 text-center">
              {t("submissions.status.label", "Status")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {submissions.map((submission) => {
            const host = safeHostname(submission.destination_url)
            const Icon = getResourceIcon(submission.destination_url)

            return (
              <TableRow key={submission.id}>
                <TableCell className="w-[60%]">
                  <div className="flex items-start gap-3">
                    <SubmissionListThumbnail
                      imageUrl={resolveApiUrl(submission.image_url)}
                      title={submission.title}
                      FallbackIcon={Icon}
                    />
                    <div className="grid gap-1">
                      <Link
                        to="/submissions/$submissionId"
                        params={{ submissionId: submission.id }}
                        className="font-medium hover:underline underline-offset-4 line-clamp-2 md:line-clamp-1"
                      >
                        {submission.title}
                      </Link>
                      {submission.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {submission.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[1%] whitespace-nowrap px-2 text-center">
                  <Badge
                    variant="secondary"
                    title={submission.category_name ?? "-"}
                    className="max-w-[12rem] truncate"
                  >
                    {submission.category_name ?? "-"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-sm md:table-cell">
                  {/* Destination URL as clickable hostname link */}
                  {host ? (
                    <a
                      href={submission.destination_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline underline-offset-4 flex items-center gap-1"
                    >
                      {host}
                      <TbExternalLink className="h-3 w-3" />
                    </a>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell className="hidden text-muted-foreground text-sm whitespace-nowrap md:table-cell">
                  {new Date(submission.created_at).toLocaleDateString()}
                </TableCell>
                {/* Status column */}
                <TableCell className="w-[1%] whitespace-nowrap px-2 text-center">
                  <Badge variant={getStatusBadgeVariant(submission.status)}>
                    {t(`submissions.status.${submission.status}`, {
                      defaultValue: submission.status,
                    })}
                  </Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
