import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Bookmark, ExternalLink } from "lucide-react"
import { Suspense } from "react"
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
import { Skeleton } from "@/components/ui/skeleton"
import useDocumentTitle from "@/hooks/useDocumentTitle"

function getFavoritesQueryOptions() {
  return {
    queryFn: () => ResourcesService.listMyFavorites({ skip: 0, limit: 50 }),
    queryKey: ["my-favorites"],
  }
}

export const Route = createFileRoute("/_layout/favorites")({
  component: FavoritesPage,
})

function FavoritesListContent() {
  const { t } = useTranslation()
  const { data: favorites } = useSuspenseQuery(getFavoritesQueryOptions())

  if (favorites.data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-12">
        <div className="rounded-full bg-muted p-4 mb-4">
          <Bookmark className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold">{t("favorites.noFavorites")}</h3>
        <p className="text-muted-foreground mb-4">
          {t("favorites.noFavoritesHint")}
        </p>
        <Link to="/resources">
          <Button>{t("favorites.browseResources")}</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {favorites.data.map((resource) => (
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
              <Badge variant="secondary">{resource.category_name ?? "-"}</Badge>
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

function FavoritesListSkeleton() {
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

function FavoritesPage() {
  const { t } = useTranslation()
  useDocumentTitle("favorites.pageTitle")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("favorites.title")}
        </h1>
        <p className="text-muted-foreground">{t("favorites.description")}</p>
      </div>

      <Suspense fallback={<FavoritesListSkeleton />}>
        <FavoritesListContent />
      </Suspense>
    </div>
  )
}
