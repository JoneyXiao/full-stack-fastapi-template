import { Link } from "@tanstack/react-router"
import type { ColumnDef } from "@tanstack/react-table"
import type { TFunction } from "i18next"
import { ExternalLink, Eye, EyeOff } from "lucide-react"
import type { SyntheticEvent } from "react"
import { useState } from "react"

import type {
  CategoryAdmin,
  ResourcePublic,
  ResourceSubmissionPublic,
  UserPublic,
} from "@/client"
import { Badge } from "@/components/ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import {
  calculateImageFit,
  getResourceIcon,
  resolveApiUrl,
  safeHostname,
} from "@/utils"
import { CategoryActionsMenu } from "./CategoryActionsMenu"
import { ResourceActionsMenu } from "./ResourceActionsMenu"
import { SubmissionActionsMenu } from "./SubmissionActionsMenu"
import { UserActionsMenu } from "./UserActionsMenu"

export type UserTableData = UserPublic & {
  isCurrentUser: boolean
}

export function getUserColumns(t: TFunction): ColumnDef<UserTableData>[] {
  return [
    {
      accessorKey: "full_name",
      header: t("auth.fullName"),
      cell: ({ row }) => {
        const fullName = row.original.full_name
        return (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "font-medium",
                !fullName && "text-muted-foreground",
              )}
            >
              {fullName || t("common.notAvailable")}
            </span>
            {row.original.isCurrentUser && (
              <Badge variant="outline" className="text-xs">
                {t("admin.users.table.you")}
              </Badge>
            )}
          </div>
        )
      },
    },
    {
      accessorKey: "email",
      header: t("auth.email"),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "is_superuser",
      header: t("admin.users.table.role"),
      cell: ({ row }) => (
        <Badge variant={row.original.is_superuser ? "default" : "secondary"}>
          {row.original.is_superuser
            ? t("admin.users.table.roles.superuser")
            : t("admin.users.table.roles.user")}
        </Badge>
      ),
    },
    {
      accessorKey: "is_active",
      header: t("admin.users.table.status"),
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <span
            className={cn(
              "size-2 rounded-full",
              row.original.is_active ? "bg-green-500" : "bg-gray-400",
            )}
          />
          <span
            className={row.original.is_active ? "" : "text-muted-foreground"}
          >
            {row.original.is_active
              ? t("admin.users.table.active")
              : t("admin.users.table.inactive")}
          </span>
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("common.actions")}</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <UserActionsMenu user={row.original} />
        </div>
      ),
    },
  ]
}

export function getCategoryColumns(t: TFunction): ColumnDef<CategoryAdmin>[] {
  return [
    {
      accessorKey: "name",
      header: t("admin.categories.nameLabel"),
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "resources_count",
      header: () => (
        <div className="text-center">
          {t("admin.categories.resourcesCount")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.resources_count ?? 0}</div>
      ),
    },
    {
      accessorKey: "submissions_count",
      header: () => (
        <div className="text-center">
          {t("admin.categories.submissionsCount")}
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.original.submissions_count ?? 0}</div>
      ),
    },
    {
      accessorKey: "in_use",
      header: () => (
        <div className="text-center">{t("admin.categories.status")}</div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {row.original.in_use ? (
            <Badge variant="secondary">{t("admin.categories.inUse")}</Badge>
          ) : (
            <Badge variant="outline">{t("admin.categories.unused")}</Badge>
          )}
        </div>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("common.actions")}</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <CategoryActionsMenu category={row.original} />
        </div>
      ),
    },
  ]
}

export function getSubmissionColumns(
  t: TFunction,
): ColumnDef<ResourceSubmissionPublic>[] {
  return [
    {
      accessorKey: "title",
      header: t("common.title"),
      cell: ({ row }) => (
        <div className="min-w-0">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                to="/submissions/$submissionId"
                params={{ submissionId: row.original.id }}
                className="font-medium hover:underline truncate max-w-[200px] md:max-w-[300px] block"
              >
                {row.original.title}
              </Link>
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs">
              <p>{row.original.title}</p>
            </TooltipContent>
          </Tooltip>
          {row.original.description && (
            <span className="text-xs text-muted-foreground line-clamp-1">
              {row.original.description}
            </span>
          )}
        </div>
      ),
    },
    {
      accessorKey: "category_name",
      header: () => (
        <div className="text-center">{t("resources.detail.categoryLabel")}</div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="secondary" className="max-w-[100px] truncate">
            {row.original.category_name ?? "-"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "destination_url",
      header: t("resources.detail.domain"),
      cell: ({ row }) => {
        const host = safeHostname(row.original.destination_url)
        return host ? (
          <a
            href={row.original.destination_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1"
          >
            {host}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      },
    },
    {
      accessorKey: "created_at",
      header: t("resources.detail.added"),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("common.actions")}</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <SubmissionActionsMenu submission={row.original} />
        </div>
      ),
    },
  ]
}

interface ResourceThumbnailProps {
  imageUrl?: string | null
  title: string
  destinationUrl?: string | null
}

function ResourceThumbnail({
  imageUrl,
  title,
  destinationUrl,
}: ResourceThumbnailProps) {
  const [imageError, setImageError] = useState(false)
  const [imageFit, setImageFit] = useState<"cover" | "contain">("cover")

  const hasImage = Boolean(imageUrl) && !imageError
  const Icon = getResourceIcon(destinationUrl)

  function handleImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setImageFit(calculateImageFit(naturalWidth, naturalHeight))
  }

  return (
    <div className="h-10 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
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
          <Icon className="h-5 w-5" />
        </div>
      )}
    </div>
  )
}

interface PublishStatusBadgeProps {
  isPublished: boolean
  t: TFunction
}

function PublishStatusBadge({ isPublished, t }: PublishStatusBadgeProps) {
  if (isPublished) {
    return (
      <Badge
        variant="default"
        className="bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400"
      >
        <Eye className="h-3 w-3 mr-1" />
        {t("admin.resources.published")}
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-muted-foreground">
      <EyeOff className="h-3 w-3 mr-1" />
      {t("admin.resources.draft")}
    </Badge>
  )
}

export function getResourceColumns(t: TFunction): ColumnDef<ResourcePublic>[] {
  return [
    {
      accessorKey: "title",
      header: t("common.title"),
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <ResourceThumbnail
            imageUrl={resolveApiUrl(row.original.image_url)}
            title={row.original.title}
            destinationUrl={row.original.destination_url}
          />
          <div className="grid gap-0.5 min-w-0">
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="font-medium truncate max-w-[200px] md:max-w-[300px] block">
                  {row.original.title}
                </span>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                <p>{row.original.title}</p>
              </TooltipContent>
            </Tooltip>
            {row.original.description && (
              <span className="text-xs text-muted-foreground line-clamp-1">
                {row.original.description}
              </span>
            )}
          </div>
        </div>
      ),
    },
    {
      accessorKey: "category_name",
      header: () => (
        <div className="text-center">{t("resources.detail.categoryLabel")}</div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <Badge variant="secondary" className="max-w-[100px] truncate">
            {row.original.category_name ?? "-"}
          </Badge>
        </div>
      ),
    },
    {
      accessorKey: "destination_url",
      header: t("resources.detail.domain"),
      cell: ({ row }) => {
        const host = safeHostname(row.original.destination_url)
        return host ? (
          <a
            href={row.original.destination_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline underline-offset-4 flex items-center gap-1"
          >
            {host}
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-muted-foreground">-</span>
        )
      },
    },
    {
      accessorKey: "is_published",
      header: () => (
        <div className="text-center">{t("admin.resources.statusHeader")}</div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          <PublishStatusBadge isPublished={row.original.is_published} t={t} />
        </div>
      ),
    },
    {
      accessorKey: "created_at",
      header: t("resources.detail.added"),
      cell: ({ row }) => (
        <span className="text-sm text-muted-foreground whitespace-nowrap">
          {new Date(row.original.created_at).toLocaleDateString()}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <span className="sr-only">{t("common.actions")}</span>,
      cell: ({ row }) => (
        <div className="flex justify-end">
          <ResourceActionsMenu resource={row.original} />
        </div>
      ),
    },
  ]
}
