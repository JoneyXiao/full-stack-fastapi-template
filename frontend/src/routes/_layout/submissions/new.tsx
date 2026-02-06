import { useMutation } from "@tanstack/react-query"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { SubmissionsService } from "@/client"
import { MarkdownEditor } from "@/components/markdown"
import { SubmissionCoverImageField } from "@/components/Submissions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useCategories } from "@/hooks/useCategories"
import useCustomToast from "@/hooks/useCustomToast"
import useDocumentTitle from "@/hooks/useDocumentTitle"

export const Route = createFileRoute("/_layout/submissions/new")({
  component: NewSubmissionPage,
})

const MAX_DESCRIPTION_LENGTH = 10000

function NewSubmissionPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  useDocumentTitle("submissions.newPageTitle")

  // Fetch categories for the dropdown
  const { data: categoriesData, isLoading: isCategoriesLoading } =
    useCategories()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination_url: "",
    category_id: "",
    image_external_url: "",
  })

  // Store selected file for upload after submission creation
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null)

  const createMutation = useMutation({
    mutationFn: () =>
      SubmissionsService.createSubmission({
        requestBody: {
          title: formData.title,
          description: formData.description || null,
          destination_url: formData.destination_url,
          category_id: formData.category_id,
          image_external_url: formData.image_external_url || null,
        },
      }),
    onSuccess: async (data) => {
      // If a file was selected, upload it now
      if (pendingImageFile) {
        try {
          await SubmissionsService.uploadSubmissionImage({
            id: data.id,
            formData: { file: pendingImageFile },
          })
        } catch (err) {
          // Image upload failed but submission was created - show warning
          console.error("Failed to upload cover image:", err)
          showErrorToast(t("submissions.new.coverImage.uploadFailed"))
        }
      }
      showSuccessToast(t("submissions.new.createSuccessPending"))
      navigate({
        to: "/submissions/$submissionId" as const,
        params: { submissionId: data.id },
      })
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("submissions.new.createFailed")
      showErrorToast(detail)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate()
  }

  const isValid =
    formData.title.trim() &&
    formData.destination_url.trim() &&
    formData.category_id &&
    formData.description.length <= MAX_DESCRIPTION_LENGTH

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <Link
        to="/submissions"
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("submissions.backToSubmissions")}
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>{t("submissions.new.title")}</CardTitle>
          <CardDescription>{t("submissions.new.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                {t("submissions.new.fields.title")} *
              </Label>
              <Input
                id="title"
                placeholder={t("submissions.new.placeholders.title")}
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination_url">
                {t("submissions.new.fields.url")} *
              </Label>
              <Input
                id="destination_url"
                type="url"
                placeholder={t("submissions.new.placeholders.url")}
                value={formData.destination_url}
                onChange={(e) =>
                  setFormData({ ...formData, destination_url: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">
                {t("submissions.new.fields.category")} *
              </Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) =>
                  setFormData({ ...formData, category_id: value })
                }
                disabled={isCategoriesLoading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      isCategoriesLoading
                        ? t("submissions.new.loadingCategories", {
                            defaultValue: "Loading categories...",
                          })
                        : t("submissions.new.placeholders.category", {
                            defaultValue: "Select a category",
                          })
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {categoriesData?.data?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                {t("submissions.new.fields.description")}
              </Label>
              <p className="text-xs text-muted-foreground">
                {t("submissions.new.markdownSupported", {
                  defaultValue:
                    "Markdown formatting is supported. Use the toolbar or type Markdown syntax.",
                })}
              </p>
              <MarkdownEditor
                id="description"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder={t("submissions.new.placeholders.description")}
                maxLength={MAX_DESCRIPTION_LENGTH}
                aria-label={t("submissions.new.fields.description")}
              />
              {formData.description.length > MAX_DESCRIPTION_LENGTH && (
                <p className="text-sm text-destructive">
                  {t("submissions.new.descriptionTooLong", {
                    max: MAX_DESCRIPTION_LENGTH,
                    defaultValue: `Description must be ${MAX_DESCRIPTION_LENGTH} characters or less`,
                  })}
                </p>
              )}
            </div>

            {/* Cover Image Field - supports file selection and external URL */}
            <SubmissionCoverImageField
              externalUrl={formData.image_external_url}
              onExternalUrlChange={(url) => {
                setFormData({ ...formData, image_external_url: url })
                if (url) setPendingImageFile(null)
              }}
              onFileSelect={setPendingImageFile}
            />

            <Button
              type="submit"
              disabled={!isValid || createMutation.isPending}
              className="w-full"
            >
              {createMutation.isPending
                ? t("submissions.new.submitting")
                : t("submissions.submitResource")}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
