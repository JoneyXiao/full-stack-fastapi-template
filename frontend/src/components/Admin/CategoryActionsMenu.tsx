import { Edit2, EllipsisVertical, Trash2 } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import type { CategoryAdmin } from "@/client"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useDeleteCategory, useUpdateCategory } from "@/hooks/useCategories"
import useCustomToast from "@/hooks/useCustomToast"

interface CategoryActionsMenuProps {
  category: CategoryAdmin
}

export function CategoryActionsMenu({ category }: CategoryActionsMenuProps) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [name, setName] = useState(category.name)
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const updateMutation = useUpdateCategory()
  const deleteMutation = useDeleteCategory()

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    updateMutation.mutate(
      { id: category.id, name: name.trim() },
      {
        onSuccess: () => {
          showSuccessToast(t("admin.categories.renameSuccess"))
          setEditDialogOpen(false)
        },
        onError: (error: Error & { body?: { detail?: string } }) => {
          const detail =
            error.body?.detail || t("admin.categories.renameFailed")
          showErrorToast(detail)
        },
      },
    )
  }

  const handleDelete = () => {
    deleteMutation.mutate(category.id, {
      onSuccess: () => {
        showSuccessToast(t("admin.categories.deleteSuccess"))
        setDeleteDialogOpen(false)
      },
      onError: (error: Error & { body?: { detail?: string } }) => {
        const detail = error.body?.detail || t("admin.categories.deleteFailed")
        showErrorToast(detail)
      },
    })
  }

  const handleEditDialogOpen = (open: boolean) => {
    if (open) setName(category.name)
    setEditDialogOpen(open)
  }

  return (
    <>
      <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <EllipsisVertical className="h-4 w-4" />
            <span className="sr-only">{t("common.actions")}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              setMenuOpen(false)
              handleEditDialogOpen(true)
            }}
          >
            <Edit2 className="h-4 w-4" />
            {t("common.edit")}
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setMenuOpen(false)
              setDeleteDialogOpen(true)
            }}
            disabled={category.in_use}
          >
            <Trash2 className="h-4 w-4" />
            {t("common.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={handleEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("admin.categories.renameTitle")}</DialogTitle>
            <DialogDescription>
              {t("admin.categories.renameDescription")}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
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
                onClick={() => setEditDialogOpen(false)}
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
                {updateMutation.isPending
                  ? t("common.saving")
                  : t("common.save")}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
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
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending
                ? t("common.deleting")
                : t("common.delete")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
