import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { ExternalLink, Search } from "lucide-react"
import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"

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
import { Skeleton } from "@/components/ui/skeleton"
import useDocumentTitle from "@/hooks/useDocumentTitle"

function getResourcesQueryOptions(q?: string, type?: string) {
  return {
    queryFn: () =>
      ResourcesService.listResources({ skip: 0, limit: 50, q, type }),
    queryKey: ["resources", { q, type }],
  }
}

export const Route = createFileRoute("/_layout/resources/")({
  component: ResourcesPage,
})

function ResourcesListContent({ q, type }: { q?: string; type?: string }) {
  const { t } = useTranslation()
  const { data: resources } = useSuspenseQuery(
    getResourcesQueryOptions(q, type),
  )

  if (resources.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Search className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">{t("resources.noResults")}</h3>
        <p className="text-muted-foreground">
          {q
            ? t("resources.noResultsForQuery", { query: q })
            : t("resources.checkBackLater")}
        </p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {resources.data.map((resource) => (
        <Card key={resource.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-2">
                <Link
                  to="/resources/$resourceId"
                  params={{ resourceId: resource.id }}
                  className="hover:underline"
                >
                  {resource.title}
                </Link>
              </CardTitle>
              <Badge variant="secondary">
                {t(`resources.types.${resource.type}`, {
                  defaultValue: resource.type,
                })}
              </Badge>
            </div>
            <CardDescription className="line-clamp-3">
              {resource.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter className="flex justify-between">
            <Link
              to="/resources/$resourceId"
              params={{ resourceId: resource.id }}
            >
              <Button variant="outline" size="sm">
                {t("resources.viewDetails")}
              </Button>
            </Link>
            <a
              href={resource.destination_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="ghost" size="sm">
                <ExternalLink className="h-4 w-4 mr-1" />
                {t("resources.visit")}
              </Button>
            </a>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function ResourcesListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-1" />
          </CardHeader>
          <CardContent className="flex-grow" />
          <CardFooter>
            <Skeleton className="h-9 w-24" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function ResourcesPage() {
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeQuery, setActiveQuery] = useState("")
  useDocumentTitle("resources.pageTitle")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    setActiveQuery(searchQuery)
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("resources.title")}
        </h1>
        <p className="text-muted-foreground">{t("resources.description")}</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
        <Input
          type="search"
          placeholder={t("resources.searchPlaceholder")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          {t("common.search")}
        </Button>
      </form>

      <Suspense fallback={<ResourcesListSkeleton />}>
        <ResourcesListContent q={activeQuery || undefined} />
      </Suspense>
    </div>
  )
}
