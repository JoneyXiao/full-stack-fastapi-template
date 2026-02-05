import { useSuspenseQuery } from "@tanstack/react-query"
import { createFileRoute } from "@tanstack/react-router"
import { Clock, Plus } from "lucide-react"
import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"

import { SubmissionsService, type UserPublic, UsersService } from "@/client"
import AddUser from "@/components/Admin/AddUser"
import {
  AdminResourcesTableContent,
  AdminResourcesTableSkeleton,
} from "@/components/Admin/AdminResourcesTable"
import {
  getCategoryColumns,
  getSubmissionColumns,
  getUserColumns,
  type UserTableData,
} from "@/components/Admin/columns"
import { DataTable } from "@/components/Common/DataTable"
import PendingUsers from "@/components/Pending/PendingUsers"
import { Button } from "@/components/ui/button"
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
import { useCategoriesAdmin, useCreateCategory } from "@/hooks/useCategories"
import useCustomToast from "@/hooks/useCustomToast"
import useDocumentTitle from "@/hooks/useDocumentTitle"

function getUsersQueryOptions() {
  return {
    queryFn: () => UsersService.readUsers({ skip: 0, limit: 100 }),
    queryKey: ["users"],
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

function ResourcesList() {
  return (
    <Suspense fallback={<AdminResourcesTableSkeleton />}>
      <AdminResourcesTableContent />
    </Suspense>
  )
}

function SubmissionsListContent() {
  const { t } = useTranslation()
  const { data: submissions } = useSuspenseQuery(
    getPendingSubmissionsQueryOptions(),
  )

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

  return <DataTable columns={getSubmissionColumns(t)} data={submissions.data} />
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
      <DataTable columns={getCategoryColumns(t)} data={categories.data} />
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
