import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EllipsisVertical, Eye, EyeOff, ImageIcon, Trash2 } from "lucide-react"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { type ResourcePublic, ResourcesService } from "@/client"
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import useCustomToast from "@/hooks/useCustomToast"
import { cn } from "@/lib/utils"
import { calculateImageFit, isExternalUrl, resolveApiUrl } from "@/utils"

interface EditImageDialogProps {
  resource: ResourcePublic
  open: boolean
  onOpenChange: (open: boolean) => void
}

function EditImageDialog({
  resource,
  open,
  onOpenChange,
}: EditImageDialogProps) {
  const { t } = useTranslation()
  const [externalUrl, setExternalUrl] = useState(
    isExternalUrl(resource.image_url) ? resource.image_url! : "",
  )
  const [imagePreview, setImagePreview] = useState<string | null>(
    resolveApiUrl(resource.image_url) ?? null,
  )
  const [previewFit, setPreviewFit] = useState<"cover" | "contain">("cover")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  function handlePreviewLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { naturalWidth, naturalHeight } = e.currentTarget
    setPreviewFit(calculateImageFit(naturalWidth, naturalHeight))
  }

  const updateMutation = useMutation({
    mutationFn: (imageExternalUrl: string | null) =>
      ResourcesService.updateResource({
        id: resource.id,
        requestBody: { image_external_url: imageExternalUrl },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      showSuccessToast(t("admin.resources.imageUpdated"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail =
        error.body?.detail || t("admin.resources.imageUpdateFailed")
      showErrorToast(detail)
    },
  })

  const uploadMutation = useMutation({
    mutationFn: (file: File) =>
      ResourcesService.uploadResourceImage({
        id: resource.id,
        formData: { file },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      showSuccessToast(t("admin.resources.imageUploaded"))
      onOpenChange(false)
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail =
        error.body?.detail || t("admin.resources.imageUploadFailed")
      showErrorToast(detail)
    },
  })

  const clearMutation = useMutation({
    mutationFn: () => ResourcesService.clearResourceImage({ id: resource.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      showSuccessToast(t("admin.resources.imageCleared"))
      setExternalUrl("")
      setImagePreview(null)
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("admin.resources.imageClearFailed")
      showErrorToast(detail)
    },
  })

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setImagePreview(ev.target?.result as string)
      reader.readAsDataURL(file)
      uploadMutation.mutate(file)
    }
  }

  const handleSetExternalUrl = () => {
    if (!externalUrl.trim()) return
    updateMutation.mutate(externalUrl.trim(), {
      onSuccess: () => {
        setImagePreview(externalUrl.trim())
      },
    })
  }

  const handleClearImage = () => {
    clearMutation.mutate()
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const isLoading =
    uploadMutation.isPending ||
    updateMutation.isPending ||
    clearMutation.isPending

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setExternalUrl(
        isExternalUrl(resource.image_url) ? resource.image_url! : "",
      )
      setImagePreview(resolveApiUrl(resource.image_url) ?? null)
      setPreviewFit("cover")
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("admin.resources.editImageTitle")}</DialogTitle>
          <DialogDescription>
            {t("admin.resources.editImageDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex justify-center">
            <div className="aspect-[16/10] w-full max-w-sm overflow-hidden rounded-md bg-muted">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt={resource.title}
                  onLoad={handlePreviewLoad}
                  className={cn(
                    "h-full w-full",
                    previewFit === "contain"
                      ? "object-contain p-6"
                      : "object-cover",
                  )}
                  onError={() => setImagePreview(null)}
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label>{t("admin.resources.uploadImage")}</Label>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/gif,image/webp"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isLoading}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="w-full"
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                {uploadMutation.isPending
                  ? t("common.uploading")
                  : t("admin.resources.selectFile")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.resources.coverImageSizeHint")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("admin.resources.coverImageMaxFileSizeHint")}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("admin.resources.coverImageSupportedTypesHint")}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="external-url">
              {t("admin.resources.externalImageUrl")}
            </Label>
            <div className="flex gap-2">
              <Input
                id="external-url"
                type="url"
                value={externalUrl}
                onChange={(e) => setExternalUrl(e.target.value)}
                placeholder="https://example.com/image.png"
                disabled={isLoading}
              />
              <Button
                type="button"
                onClick={handleSetExternalUrl}
                disabled={!externalUrl.trim() || isLoading}
              >
                {updateMutation.isPending
                  ? t("common.saving")
                  : t("common.set")}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              {t("admin.resources.externalImageUrlHint")}
            </p>
          </div>

          {(resource.image_url || imagePreview) && (
            <Button
              type="button"
              variant="destructive"
              onClick={handleClearImage}
              disabled={isLoading}
              className="w-full"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {clearMutation.isPending
                ? t("common.clearing")
                : t("admin.resources.clearImage")}
            </Button>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t("common.close")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

interface ResourceActionsMenuProps {
  resource: ResourcePublic
}

export function ResourceActionsMenu({ resource }: ResourceActionsMenuProps) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const deleteMutation = useMutation({
    mutationFn: () => ResourcesService.deleteResource({ id: resource.id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      showSuccessToast(t("admin.resources.deleteSuccess"))
      setDeleteDialogOpen(false)
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("admin.resources.deleteFailed")
      showErrorToast(detail)
    },
  })

  const togglePublishMutation = useMutation({
    mutationFn: () =>
      ResourcesService.updateResource({
        id: resource.id,
        requestBody: { is_published: !resource.is_published },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      queryClient.invalidateQueries({ queryKey: ["resources"] })
      showSuccessToast(
        resource.is_published
          ? t("admin.resources.unpublishSuccess")
          : t("admin.resources.publishSuccess"),
      )
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("admin.resources.publishFailed")
      showErrorToast(detail)
    },
  })

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
              setImageDialogOpen(true)
            }}
          >
            <ImageIcon className="h-4 w-4" />
            {t("admin.resources.editImage")}
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              togglePublishMutation.mutate()
              setMenuOpen(false)
            }}
            disabled={togglePublishMutation.isPending}
          >
            {resource.is_published ? (
              <>
                <EyeOff className="h-4 w-4" />
                {t("admin.resources.unpublish")}
              </>
            ) : (
              <>
                <Eye className="h-4 w-4" />
                {t("admin.resources.publish")}
              </>
            )}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            onClick={() => {
              setMenuOpen(false)
              setDeleteDialogOpen(true)
            }}
          >
            <Trash2 className="h-4 w-4" />
            {t("common.delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditImageDialog
        resource={resource}
        open={imageDialogOpen}
        onOpenChange={setImageDialogOpen}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("admin.resources.deleteTitle")}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.resources.deleteDescription", {
                title: resource.title,
              })}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{t("common.cancel")}</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteMutation.mutate()}
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
