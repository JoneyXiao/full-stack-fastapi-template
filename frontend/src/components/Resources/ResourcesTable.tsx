import { Link } from "@tanstack/react-router"
import { TrendingUp } from "lucide-react"
import type { ComponentType, SyntheticEvent } from "react"
import { useState } from "react"
import { useTranslation } from "react-i18next"
import { TbExternalLink, TbThumbUp } from "react-icons/tb"

import type { ResourcePublic } from "@/client"
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

interface ResourcesTableProps {
  resources: ResourcePublic[]
}

function ResourceListThumbnail({
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

/**
 * Table component for displaying resources in List view.
 * Features:
 * - "Trends" column (renamed from "Actions") showing likes count
 * - Destination URL rendered as clickable hostname link (opens in new tab)
 * - Non-link placeholder when destination_url is missing/invalid
 */
export function ResourcesTable({ resources }: ResourcesTableProps) {
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
              <span className="flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t("resources.list.trends", "Trends")}
                </span>
              </span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource) => {
            const host = safeHostname(resource.destination_url)
            const Icon = getResourceIcon(resource.destination_url)

            return (
              <TableRow key={resource.id}>
                <TableCell className="w-[60%]">
                  <div className="flex items-start gap-3">
                    <ResourceListThumbnail
                      imageUrl={resolveApiUrl(resource.image_url)}
                      title={resource.title}
                      FallbackIcon={Icon}
                    />
                    <div className="grid gap-1">
                      <Link
                        to="/resources/$resourceId"
                        params={{ resourceId: resource.id }}
                        className="font-medium hover:underline underline-offset-4 line-clamp-2 md:line-clamp-1"
                      >
                        {resource.title}
                      </Link>
                      {resource.description && (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {resource.description}
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[1%] whitespace-nowrap px-2 text-center">
                  <Badge
                    variant="secondary"
                    title={resource.category_name ?? "-"}
                    className="max-w-[12rem] truncate"
                  >
                    {resource.category_name ?? "-"}
                  </Badge>
                </TableCell>
                <TableCell className="hidden text-sm md:table-cell">
                  {/* Destination URL as clickable hostname link */}
                  {host ? (
                    <a
                      href={resource.destination_url}
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
                  {new Date(resource.created_at).toLocaleDateString()}
                </TableCell>
                {/* Trends column: likes count (display-only) */}
                <TableCell className="w-[1%] whitespace-nowrap px-2 text-center">
                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground">
                    <TbThumbUp className="h-4 w-4" />
                    <span>{resource.likes_count ?? 0}</span>
                  </div>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
