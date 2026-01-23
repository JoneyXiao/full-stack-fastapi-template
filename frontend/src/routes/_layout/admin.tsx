import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { CheckCircle, Clock, ExternalLink, XCircle } from "lucide-react"
import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"

import {
  ResourcesService,
  SubmissionsService,
  type UserPublic,
  UsersService,
} from "@/client"
import AddUser from "@/components/Admin/AddUser"
import { getUserColumns, type UserTableData } from "@/components/Admin/columns"
import { DataTable } from "@/components/Common/DataTable"
import { Markdown } from "@/components/markdown"
import PendingUsers from "@/components/Pending/PendingUsers"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import useDocumentTitle from "@/hooks/useDocumentTitle"

function getUsersQueryOptions() {
  return {
    queryFn: () => UsersService.readUsers({ skip: 0, limit: 100 }),
    queryKey: ["users"],
  }
}

function getResourcesQueryOptions() {
  return {
    queryFn: () => ResourcesService.listResources({ skip: 0, limit: 100 }),
    queryKey: ["admin-resources"],
  }
}

function getPendingSubmissionsQueryOptions() {
  return {
    queryFn: () =>
      SubmissionsService.listPendingSubmissions({
        skip: 0,
        limit: 100,
        status: "pending",
      }),
    queryKey: ["admin-submissions", "pending"],
  }
}

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
})

function UsersTableContent() {
  const { t } = useTranslation()
  const { user: currentUser } = useAuth()
  const { data: users } = useSuspenseQuery(getUsersQueryOptions())

  const tableData: UserTableData[] = users.data.map((user: UserPublic) => ({
    ...user,
    isCurrentUser: currentUser?.id === user.id,
  }))

  return <DataTable columns={getUserColumns(t)} data={tableData} />
}

function UsersTable() {
  return (
    <Suspense fallback={<PendingUsers />}>
      <UsersTableContent />
    </Suspense>
  )
}

function ResourcesListContent() {
  const { t } = useTranslation()
  const { data: resources } = useSuspenseQuery(getResourcesQueryOptions())
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ResourcesService.deleteResource({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      showSuccessToast(t("admin.resources.deleteSuccess"))
    },
  })

  if (resources.data.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        {t("admin.resources.noResources")}
      </p>
    )
  }

  return (
    <div className="space-y-4">
      {resources.data.map((resource) => (
        <Card key={resource.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">{resource.title}</CardTitle>
                {resource.description && (
                  <div className="line-clamp-2 text-sm text-muted-foreground">
                    <Markdown>{resource.description}</Markdown>
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{resource.type}</Badge>
                <Badge variant={resource.is_published ? "default" : "outline"}>
                  {resource.is_published
                    ? t("admin.resources.published")
                    : t("admin.resources.draft")}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <a
              href={resource.destination_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {resource.destination_url.slice(0, 50)}...
            </a>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => deleteMutation.mutate(resource.id)}
              disabled={deleteMutation.isPending}
            >
              {t("common.delete")}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function ResourcesList() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <ResourcesListContent />
    </Suspense>
  )
}

function SubmissionsListContent() {
  const { t } = useTranslation()
  const { data: submissions } = useSuspenseQuery(
    getPendingSubmissionsQueryOptions(),
  )
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const approveMutation = useMutation({
    mutationFn: (id: string) => SubmissionsService.approveSubmission({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-submissions"] })
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      showSuccessToast(t("admin.submissions.approveSuccess"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || "Failed to approve"
      showErrorToast(detail)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: string) => SubmissionsService.rejectSubmission({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-submissions"] })
      showSuccessToast(t("admin.submissions.rejectSuccess"))
    },
  })

  if (submissions.data.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          {t("admin.submissions.noSubmissions")}
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {submissions.data.map((submission) => (
        <Card key={submission.id}>
          <CardHeader className="pb-2">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-lg">
                  <Link
                    to="/submissions/$submissionId"
                    params={{ submissionId: submission.id }}
                    className="hover:underline"
                  >
                    {submission.title}
                  </Link>
                </CardTitle>
                {submission.description && (
                  <div className="line-clamp-2 text-sm text-muted-foreground">
                    <Markdown>{submission.description}</Markdown>
                  </div>
                )}
              </div>
              <Badge variant="secondary">{submission.type}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <a
              href={submission.destination_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              {submission.destination_url.slice(0, 60)}...
            </a>
            <p className="text-xs text-muted-foreground mt-2">
              {t("submissions.submitted", {
                date: new Date(submission.created_at).toLocaleDateString(),
              })}
            </p>
          </CardContent>
          <CardFooter className="flex gap-2">
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => approveMutation.mutate(submission.id)}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              <CheckCircle className="h-4 w-4 mr-1" />
              {t("admin.submissions.approve")}
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => rejectMutation.mutate(submission.id)}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              <XCircle className="h-4 w-4 mr-1" />
              {t("admin.submissions.reject")}
            </Button>
            <Link
              to="/submissions/$submissionId"
              params={{ submissionId: submission.id }}
            >
              <Button variant="outline" size="sm">
                {t("resources.viewDetails")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

function SubmissionsList() {
  return (
    <Suspense fallback={<Skeleton className="h-64 w-full" />}>
      <SubmissionsListContent />
    </Suspense>
  )
}

function Admin() {
  const { t } = useTranslation()
  const [activeTab, setActiveTab] = useState("users")
  useDocumentTitle("admin.pageTitle")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("admin.title")}
        </h1>
        <p className="text-muted-foreground">{t("admin.description")}</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">{t("admin.tabs.users")}</TabsTrigger>
          <TabsTrigger value="resources">
            {t("admin.tabs.resources")}
          </TabsTrigger>
          <TabsTrigger value="submissions">
            {t("admin.tabs.submissions")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">
                {t("admin.users.title")}
              </h2>
              <p className="text-muted-foreground text-sm">
                {t("admin.users.description")}
              </p>
            </div>
            <AddUser />
          </div>
          <UsersTable />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {t("admin.resources.title")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("admin.resources.description")}
            </p>
          </div>
          <ResourcesList />
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {t("admin.submissions.title")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("admin.submissions.description")}
            </p>
          </div>
          <SubmissionsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
