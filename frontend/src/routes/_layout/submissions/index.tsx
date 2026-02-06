import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { LayoutGrid, List as ListIcon, Plus, Search } from "lucide-react"
import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"

import { SubmissionsService } from "@/client"
import { SubmissionGridCard, SubmissionsTable } from "@/components/Submissions"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import useDocumentTitle from "@/hooks/useDocumentTitle"

type ViewMode = "grid" | "list"
const VIEW_STORAGE_KEY = "submissions:viewMode"

function getMySubmissionsQueryOptions() {
  return {
    queryFn: () => SubmissionsService.listMySubmissions({ skip: 0, limit: 50 }),
    queryKey: ["my-submissions"],
  }
}

export const Route = createFileRoute("/_layout/submissions/")({
  component: SubmissionsPage,
})

function ViewModeToggle({
  value,
  onChange,
}: {
  value: ViewMode
  onChange: (value: ViewMode) => void
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
    >
      <ToggleGroupItem value="grid" aria-label={t("resources.list.viewGrid")}>
        <LayoutGrid className="h-4 w-4" />
        <span className="sr-only">{t("resources.list.viewGrid")}</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label={t("resources.list.viewList")}>
        <ListIcon className="h-4 w-4" />
        <span className="sr-only">{t("resources.list.viewList")}</span>
      </ToggleGroupItem>
    </ToggleGroup>
  )
}

function SubmissionsListContent({ viewMode }: { viewMode: ViewMode }) {
  const { t } = useTranslation()
  const { data: submissions } = useSuspenseQuery(getMySubmissionsQueryOptions())

  if (submissions.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">
          {t("submissions.noSubmissions")}
        </h3>
        <p className="text-muted-foreground mb-4">
          {t("submissions.noSubmissionsHint")}
        </p>
        <Link to="/submissions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("submissions.submitResource")}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground pl-2">
        {t("common.found", { count: submissions.count })}
      </p>

      {viewMode === "list" ? (
        <SubmissionsTable submissions={submissions.data} />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {submissions.data.map((submission) => (
            <SubmissionGridCard key={submission.id} submission={submission} />
          ))}
        </div>
      )}
    </div>
  )
}

function SubmissionsListSkeleton() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="rounded-2xl border bg-card overflow-hidden">
          <Skeleton className="aspect-[16/10] w-full" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function SubmissionsPage() {
  const { t } = useTranslation()
  useDocumentTitle("submissions.pageTitle")

  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const stored = localStorage.getItem(VIEW_STORAGE_KEY)
    return stored === "list" || stored === "grid" ? stored : "grid"
  })

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode)
    localStorage.setItem(VIEW_STORAGE_KEY, mode)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("submissions.mySubmissionsTitle", {
              defaultValue: "My Submissions",
            })}
          </h1>
          <p className="text-muted-foreground">
            {t("submissions.description")}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <ViewModeToggle value={viewMode} onChange={handleViewModeChange} />
          <Link to="/submissions/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              {t("submissions.submitResource")}
            </Button>
          </Link>
        </div>
      </div>

      <Suspense fallback={<SubmissionsListSkeleton />}>
        <SubmissionsListContent viewMode={viewMode} />
      </Suspense>
    </div>
  )
}
