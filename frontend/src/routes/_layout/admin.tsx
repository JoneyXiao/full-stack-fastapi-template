import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { Suspense, useState } from "react"
import { CheckCircle, XCircle, ExternalLink, Clock } from "lucide-react"

import { type UserPublic, UsersService, ResourcesService, SubmissionsService } from "@/client"
import AddUser from "@/components/Admin/AddUser"
import { columns, type UserTableData } from "@/components/Admin/columns"
import { DataTable } from "@/components/Common/DataTable"
import PendingUsers from "@/components/Pending/PendingUsers"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

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
    queryFn: () => SubmissionsService.listPendingSubmissions({ skip: 0, limit: 100, status: "pending" }),
    queryKey: ["admin-submissions", "pending"],
  }
}

export const Route = createFileRoute("/_layout/admin")({
  component: Admin,
  head: () => ({
    meta: [
      {
        title: "Admin - FastAPI Cloud",
      },
    ],
  }),
})

function UsersTableContent() {
  const { user: currentUser } = useAuth()
  const { data: users } = useSuspenseQuery(getUsersQueryOptions())

  const tableData: UserTableData[] = users.data.map((user: UserPublic) => ({
    ...user,
    isCurrentUser: currentUser?.id === user.id,
  }))

  return <DataTable columns={columns} data={tableData} />
}

function UsersTable() {
  return (
    <Suspense fallback={<PendingUsers />}>
      <UsersTableContent />
    </Suspense>
  )
}

function ResourcesListContent() {
  const { data: resources } = useSuspenseQuery(getResourcesQueryOptions())
  const queryClient = useQueryClient()
  const { showSuccessToast } = useCustomToast()

  const deleteMutation = useMutation({
    mutationFn: (id: string) => ResourcesService.deleteResource({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      showSuccessToast("Resource deleted successfully")
    },
  })

  if (resources.data.length === 0) {
    return (
      <p className="text-muted-foreground text-center py-8">
        No resources yet. Resources will appear here when created.
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
                <CardDescription className="line-clamp-2">
                  {resource.description}
                </CardDescription>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{resource.type}</Badge>
                <Badge variant={resource.is_published ? "default" : "outline"}>
                  {resource.is_published ? "Published" : "Draft"}
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
              Delete
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
  const { data: submissions } = useSuspenseQuery(getPendingSubmissionsQueryOptions())
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const approveMutation = useMutation({
    mutationFn: (id: string) => SubmissionsService.approveSubmission({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-submissions"] })
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      showSuccessToast("Submission approved and published")
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
      showSuccessToast("Submission rejected")
    },
  })

  if (submissions.data.length === 0) {
    return (
      <div className="text-center py-8">
        <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">
          No pending submissions to review.
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
                <CardDescription className="line-clamp-2">
                  {submission.description}
                </CardDescription>
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
              Submitted {new Date(submission.created_at).toLocaleDateString()}
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
              Approve
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={() => rejectMutation.mutate(submission.id)}
              disabled={approveMutation.isPending || rejectMutation.isPending}
            >
              <XCircle className="h-4 w-4 mr-1" />
              Reject
            </Button>
            <Link
              to="/submissions/$submissionId"
              params={{ submissionId: submission.id }}
            >
              <Button variant="outline" size="sm">
                View Details
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
  const [activeTab, setActiveTab] = useState("users")

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage users, resources, and submissions
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
          <TabsTrigger value="submissions">Pending Submissions</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold">Users</h2>
              <p className="text-muted-foreground text-sm">
                Manage user accounts and permissions
              </p>
            </div>
            <AddUser />
          </div>
          <UsersTable />
        </TabsContent>

        <TabsContent value="resources" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Resources</h2>
            <p className="text-muted-foreground text-sm">
              Manage published AI resources
            </p>
          </div>
          <ResourcesList />
        </TabsContent>

        <TabsContent value="submissions" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">Pending Submissions</h2>
            <p className="text-muted-foreground text-sm">
              Review and approve or reject submitted resources
            </p>
          </div>
          <SubmissionsList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
