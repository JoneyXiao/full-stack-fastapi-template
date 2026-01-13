import { useMutation } from "@tanstack/react-query"
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router"
import { ArrowLeft } from "lucide-react"
import { useState } from "react"

import { SubmissionsService } from "@/client"
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
import { Textarea } from "@/components/ui/textarea"
import useCustomToast from "@/hooks/useCustomToast"

export const Route = createFileRoute("/_layout/submissions/new")({
  component: NewSubmissionPage,
  head: () => ({
    meta: [
      {
        title: "Submit a Resource - AI Resources",
      },
    ],
  }),
})

const RESOURCE_TYPES = [
  { value: "tutorial", label: "Tutorial" },
  { value: "tool", label: "Tool" },
  { value: "paper", label: "Paper" },
  { value: "course", label: "Course" },
  { value: "dataset", label: "Dataset" },
  { value: "library", label: "Library" },
  { value: "article", label: "Article" },
  { value: "video", label: "Video" },
  { value: "other", label: "Other" },
]

function NewSubmissionPage() {
  const navigate = useNavigate()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    destination_url: "",
    type: "",
  })

  const createMutation = useMutation({
    mutationFn: () =>
      SubmissionsService.createSubmission({
        requestBody: {
          title: formData.title,
          description: formData.description || null,
          destination_url: formData.destination_url,
          type: formData.type,
        },
      }),
    onSuccess: (data) => {
      showSuccessToast("Your resource submission is now pending review")
      navigate({
        to: "/submissions/$submissionId" as const,
        params: { submissionId: data.id },
      })
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || "Failed to create submission"
      showErrorToast(detail)
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    createMutation.mutate()
  }

  const isValid =
    formData.title.trim() && formData.destination_url.trim() && formData.type

  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <Link
        to="/submissions"
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Submissions
      </Link>

      <Card>
        <CardHeader>
          <CardTitle>Submit a New Resource</CardTitle>
          <CardDescription>
            Suggest an AI resource to be added to our collection. Your
            submission will be reviewed by our team.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Introduction to Machine Learning"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="destination_url">URL *</Label>
              <Input
                id="destination_url"
                type="url"
                placeholder="https://example.com/resource"
                value={formData.destination_url}
                onChange={(e) =>
                  setFormData({ ...formData, destination_url: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Resource Type *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
                <SelectContent>
                  {RESOURCE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Briefly describe what this resource is about..."
                value={formData.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={4}
              />
            </div>

            <Button
              type="submit"
              disabled={!isValid || createMutation.isPending}
              className="w-full"
            >
              {createMutation.isPending ? "Submitting..." : "Submit Resource"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
