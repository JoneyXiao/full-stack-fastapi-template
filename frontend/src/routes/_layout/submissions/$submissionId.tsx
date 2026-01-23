import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowLeft,
  CheckCircle,
  Clock,
  ExternalLink,
  MessageSquare,
  Send,
  XCircle,
} from "lucide-react"
import { Suspense, useState } from "react"
import { useTranslation } from "react-i18next"

import { SubmissionsService } from "@/client"
import { Markdown } from "@/components/markdown"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import useDocumentTitle from "@/hooks/useDocumentTitle"

function getSubmissionQueryOptions(submissionId: string) {
  return {
    queryFn: () => SubmissionsService.getSubmission({ id: submissionId }),
    queryKey: ["submission", submissionId],
  }
}

function getSubmissionCommentsQueryOptions(submissionId: string) {
  return {
    queryFn: () =>
      SubmissionsService.listSubmissionComments({ id: submissionId }),
    queryKey: ["submission-comments", submissionId],
  }
}

export const Route = createFileRoute("/_layout/submissions/$submissionId")({
  component: SubmissionDetailPage,
})

function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation()

  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          <Clock className="h-3 w-3 mr-1" />
          {t("submissions.status.pending")}
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          {t("submissions.status.approved")}
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="h-3 w-3 mr-1" />
          {t("submissions.status.rejected")}
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function SubmissionDetailContent({ submissionId }: { submissionId: string }) {
  const { t } = useTranslation()
  const { data: submission } = useSuspenseQuery(
    getSubmissionQueryOptions(submissionId),
  )
  const { data: comments } = useSuspenseQuery(
    getSubmissionCommentsQueryOptions(submissionId),
  )
  const { user } = useAuth()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("")

  const approveMutation = useMutation({
    mutationFn: () =>
      SubmissionsService.approveSubmission({ id: submissionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", submissionId] })
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      showSuccessToast(t("submissions.detail.approveSuccess"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("submissions.detail.approveFailed")
      showErrorToast(detail)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: () => SubmissionsService.rejectSubmission({ id: submissionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", submissionId] })
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      showSuccessToast(t("submissions.detail.rejectSuccess"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("submissions.detail.rejectFailed")
      showErrorToast(detail)
    },
  })

  const commentMutation = useMutation({
    mutationFn: (body: string) =>
      SubmissionsService.createSubmissionComment({
        id: submissionId,
        requestBody: { body },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["submission-comments", submissionId],
      })
      setNewComment("")
      showSuccessToast(t("submissions.detail.commentSuccess"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || t("submissions.detail.commentFailed")
      showErrorToast(detail)
    },
  })

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      commentMutation.mutate(newComment.trim())
    }
  }

  const isAdmin = user?.is_superuser

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <Link
        to="/submissions"
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("submissions.backToSubmissions")}
      </Link>

      <div className="space-y-6">
        {/* Submission Header */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {submission.title}
              </h1>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary">
                  {t(`submissions.types.${submission.type}`, {
                    defaultValue: submission.type,
                  })}
                </Badge>
                <StatusBadge status={submission.status} />
              </div>
            </div>
            <a
              href={submission.destination_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <ExternalLink className="h-4 w-4 mr-2" />
                {t("submissions.detail.previewUrl")}
              </Button>
            </a>
          </div>
          {submission.description && (
            <div className="mt-4">
              <Markdown className="text-muted-foreground">
                {submission.description}
              </Markdown>
            </div>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            {t("submissions.submitted", {
              date: new Date(submission.created_at).toLocaleDateString(),
            })}
          </p>
        </div>

        {/* Admin Actions */}
        {isAdmin && submission.status === "pending" && (
          <Card>
            <CardHeader>
              <CardTitle>{t("submissions.detail.adminActionsTitle")}</CardTitle>
              <CardDescription>
                {t("submissions.detail.adminActionsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                onClick={() => approveMutation.mutate()}
                disabled={approveMutation.isPending || rejectMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                {t("submissions.detail.approveAndPublish")}
              </Button>
              <Button
                variant="destructive"
                onClick={() => rejectMutation.mutate()}
                disabled={approveMutation.isPending || rejectMutation.isPending}
              >
                <XCircle className="h-4 w-4 mr-1" />
                {t("submissions.detail.reject")}
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              {t("submissions.detail.discussionTitle")}
            </CardTitle>
            <CardDescription>
              {t("submissions.detail.discussionDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmitComment} className="space-y-2">
              <Textarea
                placeholder={t("submissions.detail.commentPlaceholder")}
                value={newComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setNewComment(e.target.value)
                }
                rows={3}
                className="resize-y text-sm placeholder:text-muted-foreground/70"
              />
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim() || commentMutation.isPending}
              >
                <Send className="h-4 w-4 mr-1" />
                {t("submissions.detail.postComment")}
              </Button>
            </form>

            {/* Comments List */}
            {comments.data.length > 0 ? (
              <div className="space-y-4 pt-4 border-t">
                {comments.data.map((comment) => (
                  <div key={comment.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        {t("submissions.detail.commentAuthorFallback")}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                      {comment.updated_at !== comment.created_at && (
                        <span className="italic">
                          {t("submissions.detail.edited")}
                        </span>
                      )}
                    </div>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pt-4 border-t">
                {t("submissions.detail.noComments")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SubmissionDetailSkeleton() {
  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <Skeleton className="h-4 w-32" />
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4" />
          <div className="flex gap-2 mt-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-28" />
          </div>
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}

function SubmissionDetailPage() {
  const { submissionId } = Route.useParams()
  useDocumentTitle("submissions.detailPageTitle")

  return (
    <Suspense fallback={<SubmissionDetailSkeleton />}>
      <SubmissionDetailContent submissionId={submissionId} />
    </Suspense>
  )
}
