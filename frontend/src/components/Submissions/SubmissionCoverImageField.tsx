/**
 * Cover image field component for resource submissions.
 * Supports both file upload and external URL with mutual exclusivity.
 */

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { ImageIcon, Link2, Trash2, Upload, X } from "lucide-react"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"

import { SubmissionsService } from "@/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface SubmissionCoverImageFieldProps {
  /** The submission ID (required for upload/clear after creation) */
  submissionId?: string
  /** Current image URL (uploaded or external) */
  currentImageUrl?: string | null
  /** External URL value for controlled input */
  externalUrl: string
  /** Callback when external URL changes */
  onExternalUrlChange: (url: string) => void
  /** Callback when a file is selected (for deferred upload after submission creation) */
  onFileSelect?: (file: File | null) => void
  /** Whether the submission is in a modifiable state */
  disabled?: boolean
  /** Class name for the container */
  className?: string
}

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const SUPPORTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"]

export function SubmissionCoverImageField({
  submissionId,
  currentImageUrl,
  externalUrl,
  onExternalUrlChange,
  onFileSelect,
  disabled = false,
  className,
}: SubmissionCoverImageFieldProps) {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [showUrlInput, setShowUrlInput] = useState(!!externalUrl)
  const [error, setError] = useState<string | null>(null)

  // Determine what to show in the preview
  const displayUrl = previewUrl || currentImageUrl || null

  const uploadMutation = useMutation({
    mutationFn: (file: File) => {
      if (!submissionId) {
        return Promise.reject(new Error("Submission must be created first"))
      }
      return SubmissionsService.uploadSubmissionImage({
        id: submissionId,
        formData: { file },
      })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      queryClient.invalidateQueries({ queryKey: ["my-submissions"] })
      setError(null)
      setPreviewUrl(null) // Server response will update currentImageUrl
      onExternalUrlChange("") // Clear external URL (mutual exclusivity)
    },
    onError: (err: Error & { body?: { detail?: string } }) => {
      setError(err.body?.detail || t("submissions.new.coverImage.uploadFailed"))
      setPreviewUrl(null)
    },
  })

  const clearMutation = useMutation({
    mutationFn: () => {
      if (!submissionId) {
        return Promise.reject(new Error("Submission must be created first"))
      }
      return SubmissionsService.clearSubmissionImage({ id: submissionId })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      queryClient.invalidateQueries({ queryKey: ["my-submissions"] })
      setPreviewUrl(null)
      onExternalUrlChange("")
      setError(null)
    },
    onError: (err: Error & { body?: { detail?: string } }) => {
      setError(err.body?.detail || t("submissions.new.coverImage.clearFailed"))
    },
  })

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Client-side validation
      if (!SUPPORTED_TYPES.includes(file.type)) {
        setError(t("submissions.new.coverImage.unsupportedType"))
        return
      }
      if (file.size > MAX_FILE_SIZE) {
        setError(t("submissions.new.coverImage.fileTooLarge"))
        return
      }

      // Show preview immediately
      const reader = new FileReader()
      reader.onload = (ev) => setPreviewUrl(ev.target?.result as string)
      reader.readAsDataURL(file)
      setError(null)

      // Upload if submission exists, otherwise notify parent for deferred upload
      if (submissionId) {
        uploadMutation.mutate(file)
      } else if (onFileSelect) {
        onFileSelect(file)
        onExternalUrlChange("") // Clear external URL (mutual exclusivity)
      } else {
        // No submission and no callback - show error
        setError(t("submissions.new.coverImage.saveFirst"))
      }

      // Reset input
      e.target.value = ""
    },
    [submissionId, uploadMutation, t, onFileSelect, onExternalUrlChange],
  )

  const handleExternalUrlBlur = () => {
    // When external URL is set, clear any uploaded image preview
    if (externalUrl.trim()) {
      setPreviewUrl(null)
    }
  }

  const handleClear = () => {
    if (submissionId && (currentImageUrl || externalUrl)) {
      clearMutation.mutate()
    } else {
      // Just clear local state if no submission yet
      setPreviewUrl(null)
      onExternalUrlChange("")
      onFileSelect?.(null)
      setError(null)
    }
  }

  const isUploading = uploadMutation.isPending
  const isClearing = clearMutation.isPending
  const isBusy = isUploading || isClearing

  return (
    <div className={cn("space-y-3", className)}>
      <Label>{t("submissions.new.coverImage.label")}</Label>

      {/* Preview Area */}
      <div
        className={cn(
          "relative border-2 border-dashed rounded-lg overflow-hidden",
          "aspect-video flex items-center justify-center",
          "bg-muted/30",
          disabled && "opacity-50 cursor-not-allowed",
        )}
      >
        {displayUrl ? (
          <>
            <img
              src={displayUrl}
              alt={t("submissions.new.coverImage.previewAlt")}
              className="object-cover w-full h-full"
            />
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={handleClear}
                disabled={isBusy}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground p-4">
            <ImageIcon className="h-10 w-10" />
            <span className="text-sm text-center">
              {t("submissions.new.coverImage.placeholder")}
            </span>
          </div>
        )}

        {isBusy && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <div className="animate-spin h-6 w-6 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      {/* Error message */}
      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      {/* Action Buttons */}
      {!disabled && (
        <div className="flex flex-wrap gap-2">
          {/* Upload Button */}
          <label>
            <input
              type="file"
              accept={SUPPORTED_TYPES.join(",")}
              onChange={handleFileSelect}
              disabled={isBusy || disabled}
              className="sr-only"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isBusy}
              asChild
            >
              <span className="cursor-pointer">
                <Upload className="h-4 w-4 mr-2" />
                {t("submissions.new.coverImage.uploadButton")}
              </span>
            </Button>
          </label>

          {/* Toggle External URL */}
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => setShowUrlInput(!showUrlInput)}
            disabled={isBusy}
          >
            <Link2 className="h-4 w-4 mr-2" />
            {t("submissions.new.coverImage.externalUrlToggle")}
          </Button>

          {/* Clear Button */}
          {(displayUrl || externalUrl) && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleClear}
              disabled={isBusy}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              {t("submissions.new.coverImage.clearButton")}
            </Button>
          )}
        </div>
      )}

      {/* External URL Input */}
      {showUrlInput && !disabled && (
        <div className="space-y-2">
          <Label htmlFor="image_external_url" className="text-sm">
            {t("submissions.new.coverImage.externalUrlLabel")}
          </Label>
          <Input
            id="image_external_url"
            type="url"
            placeholder={t("submissions.new.coverImage.externalUrlPlaceholder")}
            value={externalUrl}
            onChange={(e) => onExternalUrlChange(e.target.value)}
            onBlur={handleExternalUrlBlur}
            disabled={isBusy}
          />
          <p className="text-xs text-muted-foreground">
            {t("submissions.new.coverImage.externalUrlHint")}
          </p>
        </div>
      )}

      {/* Help text */}
      <p className="text-xs text-muted-foreground">
        {t("submissions.new.coverImage.sizeHint")} •{" "}
        {t("submissions.new.coverImage.supportedTypes")}
      </p>
    </div>
  )
}
