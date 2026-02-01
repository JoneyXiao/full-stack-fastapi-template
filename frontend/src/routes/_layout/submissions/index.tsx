import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { CheckCircle, Clock, Plus, Search, XCircle } from "lucide-react"
import { Suspense } from "react"
import { useTranslation } from "react-i18next"

import { SubmissionsService } from "@/client"
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

function getPendingSubmissionsQueryOptions() {
  return {
    queryFn: () =>
      SubmissionsService.listPendingSubmissions({ skip: 0, limit: 50 }),
    queryKey: ["submissions", "pending"],
  }
}

export const Route = createFileRoute("/_layout/submissions/")({
  component: SubmissionsPage,
})

function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation()

  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          <Clock className="h-3 w-3 mr-1" />
          {t("submissions.status.pending")}
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          {t("submissions.status.approved")}
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="h-3 w-3 mr-1" />
          {t("submissions.status.rejected")}
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function SubmissionsListContent() {
  const { t } = useTranslation()
  const { data: submissions } = useSuspenseQuery(
    getPendingSubmissionsQueryOptions(),
  )

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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {submissions.data.map((submission) => (
        <Card key={submission.id} className="flex flex-col">
          <CardHeader>
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg line-clamp-2">
                <Link
                  to="/submissions/$submissionId"
                  params={{ submissionId: submission.id }}
                  className="hover:underline"
                >
                  {submission.title}
                </Link>
              </CardTitle>
              <StatusBadge status={submission.status} />
            </div>
            <CardDescription className="line-clamp-3">
              {submission.description}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <Badge variant="secondary">{submission.category_name ?? "-"}</Badge>
          </CardContent>
          <CardFooter className="text-sm text-muted-foreground">
            {t("submissions.submitted", {
              date: new Date(submission.created_at).toLocaleDateString(),
            })}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function SubmissionsListSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="flex flex-col">
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full mt-2" />
            <Skeleton className="h-4 w-2/3 mt-1" />
          </CardHeader>
          <CardContent className="flex-grow">
            <Skeleton className="h-5 w-16" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-4 w-32" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function SubmissionsPage() {
  const { t } = useTranslation()
  useDocumentTitle("submissions.pageTitle")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {t("submissions.title")}
          </h1>
          <p className="text-muted-foreground">
            {t("submissions.description")}
          </p>
        </div>
        <Link to="/submissions/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            {t("submissions.submitResource")}
          </Button>
        </Link>
      </div>

      <Suspense fallback={<SubmissionsListSkeleton />}>
        <SubmissionsListContent />
      </Suspense>
    </div>
  )
}
