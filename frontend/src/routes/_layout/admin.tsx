import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  CheckCircle,
  Clock,
  Edit2,
  ExternalLink,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react"
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useAuth from "@/hooks/useAuth"
import {
  useCategoriesAdmin,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/useCategories"
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
                <Badge variant="secondary">
                  {resource.category_name ?? "-"}
                </Badge>
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
              <Badge variant="secondary">
                {submission.category_name ?? "-"}
              </Badge>
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

function CreateCategoryDialog() {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const createMutation = useCreateCategory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    createMutation.mutate(name.trim(), {
      onSuccess: () => {
        showSuccessToast(t("admin.categories.createSuccess"))
        setName("")
        setOpen(false)
      },
      onError: (error: Error & { body?: { detail?: string } }) => {
        const detail = error.body?.detail || t("admin.categories.createFailed")
        showErrorToast(detail)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-1" />
          {t("admin.categories.create")}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("admin.categories.createTitle")}</DialogTitle>
          <DialogDescription>
            {t("admin.categories.createDescription")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="category-name">
                {t("admin.categories.nameLabel")}
              </Label>
              <Input
                id="category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t("admin.categories.namePlaceholder")}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={!name.trim() || createMutation.isPending}
            >
              {createMutation.isPending
                ? t("common.creating")
                : t("common.create")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function EditCategoryDialog({
  category,
}: {
  category: { id: string; name: string }
}) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(category.name)
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const updateMutation = useUpdateCategory()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    updateMutation.mutate(
      { id: category.id, name: name.trim() },
      {
        onSuccess: () => {
          showSuccessToast(t("admin.categories.renameSuccess"))
          setOpen(false)
        },
        onError: (error: Error & { body?: { detail?: string } }) => {
          const detail =
            error.body?.detail || t("admin.categories.renameFailed")
          showErrorToast(detail)
        },
      },
    )
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o)
        if (o) setName(category.name) // Reset name when opening
      }}
    >
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Edit2 className="h-4 w-4" />
          <span className="sr-only">{t("common.edit")}</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("admin.categories.renameTitle")}</DialogTitle>
          <DialogDescription>
            {t("admin.categories.renameDescription")}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-category-name">
                {t("admin.categories.nameLabel")}
              </Label>
              <Input
                id="edit-category-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              {t("common.cancel")}
            </Button>
            <Button
              type="submit"
              disabled={
                !name.trim() ||
                name === category.name ||
                updateMutation.isPending
              }
            >
              {updateMutation.isPending ? t("common.saving") : t("common.save")}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

function DeleteCategoryButton({
  category,
}: {
  category: { id: string; name: string; in_use?: boolean }
}) {
  const { t } = useTranslation()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const deleteMutation = useDeleteCategory()

  const handleDelete = () => {
    deleteMutation.mutate(category.id, {
      onSuccess: () => {
        showSuccessToast(t("admin.categories.deleteSuccess"))
      },
      onError: (error: Error & { body?: { detail?: string } }) => {
        const detail = error.body?.detail || t("admin.categories.deleteFailed")
        showErrorToast(detail)
      },
    })
  }

  if (category.in_use) {
    return (
      <Button
        variant="ghost"
        size="sm"
        disabled
        title={t("admin.categories.cannotDeleteInUse")}
      >
        <Trash2 className="h-4 w-4 text-muted-foreground" />
        <span className="sr-only">{t("common.delete")}</span>
      </Button>
    )
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4 text-destructive" />
          <span className="sr-only">{t("common.delete")}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {t("admin.categories.deleteTitle")}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {t("admin.categories.deleteDescription", { name: category.name })}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {deleteMutation.isPending
              ? t("common.deleting")
              : t("common.delete")}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function CategoriesListContent() {
  const { t } = useTranslation()
  const { data: categories } = useCategoriesAdmin()

  if (categories.data.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">
          {t("admin.categories.noCategories")}
        </p>
        <CreateCategoryDialog />
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <CreateCategoryDialog />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t("admin.categories.nameLabel")}</TableHead>
            <TableHead className="text-center">
              {t("admin.categories.resourcesCount")}
            </TableHead>
            <TableHead className="text-center">
              {t("admin.categories.submissionsCount")}
            </TableHead>
            <TableHead className="text-center">
              {t("admin.categories.status")}
            </TableHead>
            <TableHead className="text-right">
              {t("admin.categories.actions")}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories.data.map((category) => (
            <TableRow key={category.id}>
              <TableCell className="font-medium">{category.name}</TableCell>
              <TableCell className="text-center">
                {category.resources_count}
              </TableCell>
              <TableCell className="text-center">
                {category.submissions_count}
              </TableCell>
              <TableCell className="text-center">
                {category.in_use ? (
                  <Badge variant="secondary">
                    {t("admin.categories.inUse")}
                  </Badge>
                ) : (
                  <Badge variant="outline">
                    {t("admin.categories.unused")}
                  </Badge>
                )}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <EditCategoryDialog category={category} />
                  <DeleteCategoryButton category={category} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function CategoriesListSkeleton() {
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Skeleton className="h-9 w-36" />
      </div>
      <div className="rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Skeleton className="h-4 w-16" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-16 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-20 mx-auto" />
              </TableHead>
              <TableHead className="text-center">
                <Skeleton className="h-4 w-14 mx-auto" />
              </TableHead>
              <TableHead className="text-right">
                <Skeleton className="h-4 w-16 ml-auto" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {[1, 2, 3].map((i) => (
              <TableRow key={i}>
                <TableCell>
                  <Skeleton className="h-4 w-24" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-8 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-4 w-8 mx-auto" />
                </TableCell>
                <TableCell className="text-center">
                  <Skeleton className="h-5 w-16 mx-auto rounded-full" />
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-1">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function CategoriesList() {
  return (
    <Suspense fallback={<CategoriesListSkeleton />}>
      <CategoriesListContent />
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
          <TabsTrigger value="categories">
            {t("admin.tabs.categories")}
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

        <TabsContent value="categories" className="mt-6">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              {t("admin.categories.title")}
            </h2>
            <p className="text-muted-foreground text-sm">
              {t("admin.categories.description")}
            </p>
          </div>
          <CategoriesList />
        </TabsContent>
      </Tabs>
    </div>
  )
}
