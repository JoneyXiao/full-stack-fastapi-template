import { useSuspenseQuery } from "@tanstack/react-query"
import { Search, X } from "lucide-react"
import { useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { GiFox } from "react-icons/gi"

import { type ResourcePublic, ResourcesService } from "@/client"
import { DataTable } from "@/components/Common/DataTable"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getResourceColumns } from "./columns"

function getResourcesQueryOptions() {
  return {
    queryFn: () => ResourcesService.listResources({ skip: 0, limit: 100 }),
    queryKey: ["admin-resources"],
  }
}

type StatusFilter = "all" | "published" | "draft"

function matchesSearchQuery(resource: ResourcePublic, query: string): boolean {
  if (!query) return true
  const lowerQuery = query.toLowerCase()
  return (
    resource.title.toLowerCase().includes(lowerQuery) ||
    Boolean(resource.description?.toLowerCase().includes(lowerQuery)) ||
    Boolean(resource.category_name?.toLowerCase().includes(lowerQuery))
  )
}

function matchesStatusFilter(
  resource: ResourcePublic,
  filter: StatusFilter,
): boolean {
  if (filter === "all") return true
  if (filter === "published") return resource.is_published
  return !resource.is_published
}

export function AdminResourcesTableContent() {
  const { t } = useTranslation()
  const { data: resources } = useSuspenseQuery(getResourcesQueryOptions())
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("all")

  const filteredResources = useMemo(() => {
    return resources.data.filter(
      (resource) =>
        matchesSearchQuery(resource, searchQuery) &&
        matchesStatusFilter(resource, statusFilter),
    )
  }, [resources.data, searchQuery, statusFilter])

  const clearFilters = () => {
    setSearchQuery("")
    setStatusFilter("all")
  }

  if (resources.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <div className="rounded-full bg-muted p-4 mb-4">
          <GiFox className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium mb-1">
          {t("admin.resources.noResourcesTitle")}
        </h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          {t("admin.resources.noResources")}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-2">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={t("admin.resources.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-6 w-6 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
                aria-label={t("common.clear")}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as StatusFilter)}
          >
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder={t("admin.resources.filterStatus")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">
                {t("admin.resources.statusAll")}
              </SelectItem>
              <SelectItem value="published">
                {t("admin.resources.published")}
              </SelectItem>
              <SelectItem value="draft">
                {t("admin.resources.draft")}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        {t("admin.resources.showingCount", {
          count: filteredResources.length,
          total: resources.data.length,
        })}
      </div>

      {filteredResources.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
          <Search className="h-8 w-8 text-muted-foreground mb-2" />
          <p className="text-muted-foreground">
            {t("admin.resources.noResultsFound")}
          </p>
          <Button variant="link" onClick={clearFilters} className="mt-2">
            {t("admin.resources.clearFilters")}
          </Button>
        </div>
      ) : (
        <DataTable columns={getResourceColumns(t)} data={filteredResources} />
      )}
    </div>
  )
}

export function AdminResourcesTableSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-10 flex-1 max-w-sm" />
        <Skeleton className="h-10 w-[140px]" />
      </div>
      <Skeleton className="h-4 w-32" />
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%]">
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-12" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-14 mx-auto" />
              </TableHead>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3, 4, 5].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-10 w-16 rounded-md" />
                    <div className="grid gap-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-20 mx-auto rounded-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-20" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-8 w-8" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
