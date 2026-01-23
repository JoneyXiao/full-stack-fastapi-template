import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { LayoutGrid, List as ListIcon } from "lucide-react"
import { type ReactElement, Suspense, useMemo, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGlobe, FaWrench } from "react-icons/fa"
import { MdClear } from "react-icons/md"
import { PiGithubLogoDuotone, PiNewspaper } from "react-icons/pi"
import { TbExternalLink, TbSearch, TbSortDescending } from "react-icons/tb"

import { ResourcesService } from "@/client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useDocumentTitle from "@/hooks/useDocumentTitle"

type SortOption = "newest" | "oldest" | "titleAsc" | "titleDesc"
type ViewMode = "grid" | "list"

const SORT_OPTIONS: SortOption[] = ["newest", "oldest", "titleAsc", "titleDesc"]
const VIEW_STORAGE_KEY = "resources:viewMode"

const RESOURCE_TYPES = [
  "all",
  "website",
  "github_repo",
  "tutorial",
  "tool",
  "paper",
  "course",
  "dataset",
  "library",
  "article",
  "video",
  "other",
] as const

function getResourcesQueryOptions({
  q,
  type,
  skip,
  limit,
}: {
  q?: string
  type?: string
  skip: number
  limit: number
}) {
  return {
    queryFn: () =>
      ResourcesService.listResources({
        skip,
        limit,
        q,
        type: type && type !== "all" ? type : undefined,
      }),
    queryKey: ["resources", { q, type, skip, limit }],
  }
}

export const Route = createFileRoute("/_layout/resources/")({
  component: ResourcesPage,
})

function safeHostname(url: string) {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return undefined
  }
}

const RESOURCE_TYPE_ICONS: Record<string, typeof FaGlobe> = {
  github_repo: PiGithubLogoDuotone,
  tool: FaWrench,
  website: FaGlobe,
  article: PiNewspaper,
}

function getResourceTypeIcon(type?: string) {
  return RESOURCE_TYPE_ICONS[type ?? ""] ?? FaGlobe
}

function getTypeLabel(t: ReturnType<typeof useTranslation>["t"], type: string) {
  if (type === "all") return t("resources.list.allTypes")
  return t(`resources.types.${type}`, { defaultValue: type })
}

function ViewModeToggle({
  value,
  onChange,
  showLabels = false,
}: {
  value: ViewMode
  onChange: (value: ViewMode) => void
  showLabels?: boolean
}) {
  const { t } = useTranslation()
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      onValueChange={(v: string) => {
        if (v) onChange(v as ViewMode)
      }}
      aria-label={t("resources.list.view")}
      className={showLabels ? undefined : "w-full"}
    >
      <ToggleGroupItem value="grid" aria-label={t("resources.list.viewGrid")}>
        <LayoutGrid className="h-4 w-4" />
        {showLabels ? (
          <span className="hidden lg:inline">
            {t("resources.list.viewGrid")}
          </span>
        ) : (
          <span className="sr-only">{t("resources.list.viewGrid")}</span>
        )}
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label={t("resources.list.viewList")}>
        <ListIcon className="h-4 w-4" />
        {showLabels ? (
          <span className="hidden lg:inline">
            {t("resources.list.viewList")}
          </span>
        ) : (
          <span className="sr-only">{t("resources.list.viewList")}</span>
        )}
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

function SortSelect({
  value,
  onValueChange,
  className,
}: {
  value: SortOption
  onValueChange: (value: SortOption) => void
  className?: string
}) {
  const { t } = useTranslation()
  return (
    <Select value={value} onValueChange={(v) => onValueChange(v as SortOption)}>
      <SelectTrigger className={className}>
        <TbSortDescending className="mr-2 h-4 w-4 text-muted-foreground" />
        <SelectValue placeholder={t("resources.list.sort")} />
      </SelectTrigger>
      <SelectContent>
        {SORT_OPTIONS.map((opt) => (
          <SelectItem key={opt} value={opt}>
            {t(
              `resources.list.sort${opt.charAt(0).toUpperCase()}${opt.slice(1)}`,
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

function getPageItems(current: number, total: number) {
  // Keeps pagination compact: 1 … (n-1) n (n+1) … total
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const items: Array<number | "ellipsis"> = []
  const left = Math.max(2, current - 1)
  const right = Math.min(total - 1, current + 1)

  items.push(1)
  if (left > 2) items.push("ellipsis")
  for (let p = left; p <= right; p++) items.push(p)
  if (right < total - 1) items.push("ellipsis")
  items.push(total)
  return items
}

function ResourcesListContent({
  q,
  type,
  page,
  pageSize,
  sort,
  viewMode,
  onPageChange,
}: {
  q?: string
  type?: string
  page: number
  pageSize: number
  sort: SortOption
  viewMode: ViewMode
  onPageChange: (page: number) => void
}) {
  const { t } = useTranslation()
  const { data: resources } = useSuspenseQuery(
    getResourcesQueryOptions({
      q,
      type,
      skip: (page - 1) * pageSize,
      limit: pageSize,
    }),
  )

  const sortedData = useMemo(() => {
    const data = [...resources.data]
    switch (sort) {
      case "oldest":
        return data.sort(
          (a, b) =>
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
        )
      case "titleAsc":
        return data.sort((a, b) => a.title.localeCompare(b.title))
      case "titleDesc":
        return data.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return data.sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
    }
  }, [resources.data, sort])

  const totalPages = Math.max(1, Math.ceil(resources.count / pageSize))
  const from = resources.count === 0 ? 0 : (page - 1) * pageSize + 1
  const to = Math.min(resources.count, page * pageSize)

  if (sortedData.length === 0) {
    const noResultsDescription = q
      ? t("resources.noResultsForQuery", { query: q })
      : t("resources.checkBackLater")

    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="rounded-full bg-muted p-4 mb-4">
          <TbSearch className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold">{t("resources.noResults")}</h3>
        <p className="text-sm text-muted-foreground">{noResultsDescription}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between pl-2">
        <p className="text-sm text-muted-foreground">
          {t("common.found", { count: resources.count })}{" "}
          <span className="hidden sm:inline">
            •{" "}
            {t("resources.list.showing", { from, to, count: resources.count })}
          </span>
        </p>
      </div>

      {viewMode === "list" ? (
        <div className="rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%] md:w-[400px]">
                  {t("common.title")}
                </TableHead>
                <TableHead className="w-[1%] whitespace-nowrap px-2 text-center">
                  {t("resources.detail.typeLabel")}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("resources.detail.domain")}
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  {t("resources.detail.added")}
                </TableHead>
                <TableHead className="w-[1%] whitespace-nowrap px-2 text-right">
                  <span className="hidden sm:inline">
                    {t("common.actions")}
                  </span>
                  <span className="sr-only sm:hidden">
                    {t("common.actions")}
                  </span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedData.map((resource) => {
                const host = safeHostname(resource.destination_url)
                const Icon = getResourceTypeIcon(resource.type)
                return (
                  <TableRow key={resource.id}>
                    <TableCell className="w-[60%]">
                      <div className="flex items-start gap-3">
                        <div className="bg-primary/10 text-primary mt-0.5 hidden size-9 shrink-0 items-center justify-center rounded-lg md:inline-flex">
                          <Icon className="size-4" />
                        </div>
                        <div className="grid gap-1">
                          <Link
                            to="/resources/$resourceId"
                            params={{ resourceId: resource.id }}
                            className="font-medium hover:underline underline-offset-4 line-clamp-2 md:line-clamp-1"
                          >
                            {resource.title}
                          </Link>
                          {resource.description ? (
                            <p className="text-xs text-muted-foreground line-clamp-1">
                              {resource.description}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="w-[1%] whitespace-nowrap px-2 text-center">
                      <Badge variant="secondary" className="whitespace-nowrap">
                        {getTypeLabel(t, resource.type)}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground text-sm md:table-cell">
                      {host || "-"}
                    </TableCell>
                    <TableCell className="hidden text-muted-foreground text-sm whitespace-nowrap md:table-cell">
                      {new Date(resource.created_at).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="w-[1%] whitespace-nowrap px-2 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {/* <Link
                          to="/resources/$resourceId"
                          params={{ resourceId: resource.id }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">{t("resources.viewDetails")}</span>
                            <TbSearch className="h-4 w-4" />
                          </Button>
                        </Link> */}
                        <a
                          href={resource.destination_url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <span className="sr-only">
                              {t("resources.visit")}
                            </span>
                            <TbExternalLink className="h-4 w-4" />
                          </Button>
                        </a>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {sortedData.map((resource) => {
            const host = safeHostname(resource.destination_url)
            const Icon = getResourceTypeIcon(resource.type)
            return (
              <Card
                key={resource.id}
                className="group flex flex-col overflow-hidden transition-shadow hover:shadow-md"
              >
                <CardHeader className="space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="bg-primary/10 text-primary mt-1 inline-flex size-10 shrink-0 items-center justify-center rounded-lg">
                        <Icon className="size-5" />
                      </div>
                      <div className="min-w-0">
                        <CardTitle className="text-base leading-snug line-clamp-2">
                          <Link
                            to="/resources/$resourceId"
                            params={{ resourceId: resource.id }}
                            className="hover:underline underline-offset-4"
                          >
                            {resource.title}
                          </Link>
                        </CardTitle>
                        <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                          {host ? <span>{host}</span> : null}
                          <span className="hidden sm:inline">•</span>
                          <span>
                            {new Date(resource.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      {getTypeLabel(t, resource.type)}
                    </Badge>
                  </div>
                  {resource.description ? (
                    <CardDescription className="line-clamp-3">
                      {resource.description}
                    </CardDescription>
                  ) : null}
                </CardHeader>

                <CardContent className="flex-grow" />

                <CardFooter className="flex items-center justify-between gap-2">
                  <Link
                    to="/resources/$resourceId"
                    params={{ resourceId: resource.id }}
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                    >
                      {t("resources.viewDetails")}
                    </Button>
                  </Link>
                  <a
                    href={resource.destination_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="ghost"
                      size="sm"
                      className="cursor-pointer"
                    >
                      <TbExternalLink className="h-4 w-4 mr-1" />
                      {t("resources.visit")}
                    </Button>
                  </a>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      )}

      {totalPages > 1 ? (
        <Pagination className="pt-2">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(Math.max(1, page - 1))
                }}
                aria-disabled={page === 1}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>

            {getPageItems(page, totalPages).map((item, idx) => (
              <PaginationItem key={`${item}-${idx}`}>
                {item === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    isActive={item === page}
                    onClick={(e) => {
                      e.preventDefault()
                      onPageChange(item)
                    }}
                  >
                    {item}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(Math.min(totalPages, page + 1))
                }}
                aria-disabled={page === totalPages}
                className={
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      ) : null}
    </div>
  )
}

function SkeletonHeader(): ReactElement {
  return (
    <div className="flex items-center">
      <Skeleton className="h-4 w-64" />
    </div>
  )
}

const LIST_SKELETON_ROWS = 5
const GRID_SKELETON_CARDS = 9

function ResourcesListSkeleton({
  viewMode,
}: {
  viewMode: ViewMode
}): ReactElement {
  if (viewMode === "list") {
    return (
      <div className="space-y-4">
        <SkeletonHeader />
        <div className="rounded-md bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[60%] md:w-[400px]">
                  <Skeleton className="h-4 w-24" />
                </TableHead>
                <TableHead className="w-[1%] whitespace-nowrap px-2 text-center">
                  <Skeleton className="mx-auto h-4 w-12" />
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Skeleton className="h-4 w-16" />
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  <Skeleton className="h-4 w-20" />
                </TableHead>
                <TableHead className="w-[1%] whitespace-nowrap px-2 text-right">
                  <Skeleton className="ml-auto h-4 w-16" />
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: LIST_SKELETON_ROWS }, (_, i) => (
                <TableRow key={i}>
                  <TableCell className="w-[60%]">
                    <div className="flex items-start gap-3">
                      <Skeleton className="mt-0.5 hidden h-9 w-9 rounded-lg md:inline-flex" />
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="w-[1%] whitespace-nowrap px-2 text-center">
                    <Skeleton className="mx-auto h-5 w-20" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell className="w-[1%] whitespace-nowrap px-2 text-right">
                    <Skeleton className="ml-auto h-8 w-8" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <SkeletonHeader />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: GRID_SKELETON_CARDS }, (_, i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 w-full">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div className="w-full">
                    <Skeleton className="h-5 w-4/5" />
                    <Skeleton className="h-4 w-2/5 mt-2" />
                  </div>
                </div>
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </CardHeader>
            <CardContent className="flex-grow" />
            <CardFooter className="flex justify-between">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-20" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function ResourcesPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeQuery, setActiveQuery] = useState("")
  const [activeType, setActiveType] =
    useState<(typeof RESOURCE_TYPES)[number]>("all")
  const [sort, setSort] = useState<SortOption>("newest")
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    try {
      const stored = localStorage.getItem(VIEW_STORAGE_KEY)
      if (stored === "grid" || stored === "list") return stored
    } catch {
      // ignore
    }
    return "grid"
  })
  const [page, setPage] = useState(1)
  const pageSize = 24
  useDocumentTitle("resources.pageTitle")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveQuery(searchQuery)
    setPage(1)
  }

  const handleClear = () => {
    setSearchQuery("")
    setActiveQuery("")
    setActiveType("all")
    setSort("newest")
    setPage(1)
  }

  const setViewModePersisted = (next: ViewMode) => {
    setViewMode(next)
    try {
      localStorage.setItem(VIEW_STORAGE_KEY, next)
    } catch {
      // ignore
    }
  }

  const hasActiveFilters =
    activeQuery || searchQuery || activeType !== "all" || sort !== "newest"

  return (
    <div className="flex flex-col gap-6">
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative">
          <h1 className="text-xl font-bold tracking-tight">
            {t("resources.title")}
          </h1>
          <p className="mt-2 max-w-2xl text-muted-foreground text-sm">
            {t("resources.description")}
          </p>

          <div className="mt-6 flex flex-col gap-3">
            <form
              onSubmit={handleSearch}
              className="flex w-full flex-col gap-2 sm:flex-row sm:items-center"
            >
              <div className="relative w-full">
                <TbSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={t("resources.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-10 [&::-webkit-search-cancel-button]:appearance-none text-sm placeholder:text-muted-foreground/70"
                />
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClear}
                    className="absolute right-1.5 top-1/2 h-8 w-8 -translate-y-1/2 text-primary hover:bg-primary/10"
                  >
                    <MdClear className="h-4 w-4" />
                    <span className="sr-only">{t("common.clear")}</span>
                  </Button>
                )}
              </div>
              <Button
                type="submit"
                className="hidden shrink-0 sm:flex sm:w-auto text-sm"
              >
                {t("common.search")}
              </Button>
            </form>

            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <Tabs
                value={activeType}
                onValueChange={(value) => {
                  setActiveType(value as (typeof RESOURCE_TYPES)[number])
                  setPage(1)
                }}
                className="relative w-full overflow-hidden md:w-auto"
              >
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
                <TabsList className="h-auto w-full justify-start gap-0 sm:gap-2 overflow-x-auto bg-transparent p-0 py-1 scrollbar-hide [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pr-8">
                  {RESOURCE_TYPES.map((type) => (
                    <TabsTrigger
                      key={type}
                      value={type}
                      className="flex-none rounded-full border bg-muted/40 text-xs sm:text-sm data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none hover:bg-muted/60"
                    >
                      {getTypeLabel(t, type)}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>

              <div className="flex items-center gap-3">
                <SortSelect
                  value={sort}
                  onValueChange={setSort}
                  className="w-full md:w-[150px]"
                />
                <ViewModeToggle
                  value={viewMode}
                  onChange={setViewModePersisted}
                  showLabels
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Suspense fallback={<ResourcesListSkeleton viewMode={viewMode} />}>
        <ResourcesListContent
          q={activeQuery || undefined}
          type={activeType}
          page={page}
          pageSize={pageSize}
          sort={sort}
          viewMode={viewMode}
          onPageChange={(next) => {
            setPage(next)
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
        />
      </Suspense>
    </div>
  )
}
