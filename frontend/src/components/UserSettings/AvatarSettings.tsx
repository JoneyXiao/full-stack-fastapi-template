import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Camera, Loader2, Trash2, X } from "lucide-react"
import { useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { type ApiError, UsersService } from "@/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import {
  getAvatarInitials,
  processAvatarImage,
  validateAvatarFile,
} from "@/lib/avatarProcessing"
import { DEFAULT_AVATAR, resolveApiUrl } from "@/utils"

interface PendingAvatar {
  blob: Blob
  dataUrl: string
}

function AvatarSettings() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { user: currentUser } = useAuth()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [pendingAvatar, setPendingAvatar] = useState<PendingAvatar | null>(null)

  const handleMutationError = (error: ApiError) => {
    if (error.status === 429) {
      showErrorToast(t("settings.avatar.errors.rateLimited"))
      return
    }
    const detail =
      (error.body as { detail?: string } | undefined)?.detail ||
      t("settings.avatar.errors.uploadFailed")
    showErrorToast(detail)
  }

  const uploadMutation = useMutation({
    mutationFn: (blob: Blob) =>
      UsersService.uploadAvatar({ formData: { file: blob } }),
    onSuccess: (data) => {
      showSuccessToast(t("settings.avatar.uploadSuccess"))
      setPendingAvatar(null)
      queryClient.setQueryData(["currentUser"], data)
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
    onError: handleMutationError,
  })

  const deleteMutation = useMutation({
    mutationFn: () => UsersService.deleteAvatar(),
    onSuccess: (data) => {
      showSuccessToast(t("settings.avatar.removeSuccess"))
      queryClient.setQueryData(["currentUser"], data)
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
    onError: handleMutationError,
  })

  const processFile = async (file: File) => {
    const error = validateAvatarFile(file)
    if (error) {
      showErrorToast(error)
      return
    }

    setIsProcessing(true)
    try {
      const processed = await processAvatarImage(file)
      setPendingAvatar(processed)
    } catch {
      showErrorToast(t("settings.avatar.errors.processingFailed"))
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    e.target.value = ""
    await processFile(file)
  }

  const handleDrop = async (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) {
      await processFile(file)
    }
  }

  const handleSave = () => {
    if (pendingAvatar) {
      uploadMutation.mutate(pendingAvatar.blob)
    }
  }

  const handleCancel = () => {
    setPendingAvatar(null)
  }

  const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
    e.preventDefault()
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const isLoading =
    uploadMutation.isPending || deleteMutation.isPending || isProcessing
  const hasAvatar = Boolean(currentUser?.avatar_url)
  const hasPendingAvatar = Boolean(pendingAvatar)
  const avatarUrl = resolveApiUrl(currentUser?.avatar_url) ?? DEFAULT_AVATAR
  const displayUrl = pendingAvatar?.dataUrl ?? avatarUrl
  const initials = getAvatarInitials(currentUser?.full_name, currentUser?.email)

  return (
    <div className="max-w-md">
      <h3 className="text-lg font-semibold py-4">
        {t("settings.avatar.title")}
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        {t("settings.avatar.description")}
      </p>

      <section
        className="flex items-start gap-6"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        aria-label={t("settings.avatar.title")}
      >
        {/* Avatar preview */}
        <div className="relative">
          <Avatar className="size-24">
            <AvatarImage
              src={displayUrl}
              alt={currentUser?.full_name || currentUser?.email || "Avatar"}
            />
            <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
          </Avatar>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full">
              <Loader2 className="size-6 text-white animate-spin" />
            </div>
          )}
        </div>

        {/* Upload controls */}
        <div className="flex flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/gif,image/webp"
            onChange={handleFileSelect}
            className="hidden"
            disabled={isLoading}
          />

          {/* Show Save/Cancel when pending, otherwise show upload/change buttons */}
          {hasPendingAvatar ? (
            <>
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={isLoading}
              >
                {t("common.save")}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <X className="size-4 mr-2" />
                {t("common.cancel")}
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={openFileDialog}
                disabled={isLoading}
              >
                <Camera className="size-4 mr-2" />
                {hasAvatar
                  ? t("settings.avatar.changeButton")
                  : t("settings.avatar.uploadButton")}
              </Button>

              {hasAvatar && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => deleteMutation.mutate()}
                  disabled={isLoading}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="size-4 mr-2" />
                  {t("settings.avatar.removeButton")}
                </Button>
              )}
            </>
          )}

          <p className="text-xs text-muted-foreground mt-2">
            {t("settings.avatar.supportedFormats")}
          </p>
        </div>
      </section>
    </div>
  )
}

export default AvatarSettings
