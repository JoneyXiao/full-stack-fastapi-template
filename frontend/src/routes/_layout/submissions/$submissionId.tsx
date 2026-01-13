import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowLeft,
  ExternalLink,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  Send,
} from "lucide-react"
import { Suspense, useState } from "react"

import { SubmissionsService } from "@/client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useCustomToast from "@/hooks/useCustomToast"
import useAuth from "@/hooks/useAuth"

function getSubmissionQueryOptions(submissionId: string) {
  return {
    queryFn: () => SubmissionsService.getSubmission({ id: submissionId }),
    queryKey: ["submission", submissionId],
  }
}

function getSubmissionCommentsQueryOptions(submissionId: string) {
  return {
    queryFn: () => SubmissionsService.listSubmissionComments({ id: submissionId }),
    queryKey: ["submission-comments", submissionId],
  }
}

export const Route = createFileRoute("/_layout/submissions/$submissionId")({
  component: SubmissionDetailPage,
  head: () => ({
    meta: [
      {
        title: "Submission Details - AI Resources",
      },
    ],
  }),
})

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "pending":
      return (
        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
          <Clock className="h-3 w-3 mr-1" />
          Pending Review
        </Badge>
      )
    case "approved":
      return (
        <Badge variant="outline" className="text-green-600 border-green-600">
          <CheckCircle className="h-3 w-3 mr-1" />
          Approved
        </Badge>
      )
    case "rejected":
      return (
        <Badge variant="outline" className="text-red-600 border-red-600">
          <XCircle className="h-3 w-3 mr-1" />
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

function SubmissionDetailContent({ submissionId }: { submissionId: string }) {
  const { data: submission } = useSuspenseQuery(
    getSubmissionQueryOptions(submissionId)
  )
  const { data: comments } = useSuspenseQuery(
    getSubmissionCommentsQueryOptions(submissionId)
  )
  const { user } = useAuth()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("")

  const approveMutation = useMutation({
    mutationFn: () => SubmissionsService.approveSubmission({ id: submissionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", submissionId] })
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      showSuccessToast("Submission has been approved and published")
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || "Failed to approve submission"
      showErrorToast(detail)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: () => SubmissionsService.rejectSubmission({ id: submissionId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission", submissionId] })
      queryClient.invalidateQueries({ queryKey: ["submissions"] })
      showSuccessToast("Submission has been rejected")
    },
  })

  const commentMutation = useMutation({
    mutationFn: (body: string) =>
      SubmissionsService.createSubmissionComment({ id: submissionId, requestBody: { body } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["submission-comments", submissionId] })
      setNewComment("")
      showSuccessToast("Your comment has been posted")
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
        Back to Submissions
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
                <Badge variant="secondary">{submission.type}</Badge>
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
                Preview URL
              </Button>
            </a>
          </div>
          {submission.description && (
            <p className="text-muted-foreground mt-4">{submission.description}</p>
          )}
          <p className="text-sm text-muted-foreground mt-2">
            Submitted {new Date(submission.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Admin Actions */}
        {isAdmin && submission.status === "pending" && (
          <Card>
            <CardHeader>
              <CardTitle>Admin Actions</CardTitle>
              <CardDescription>
                Review and take action on this submission
              </CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              <Button
                onClick={() => approveMutation.mutate()}
                disabled={approveMutation.isPending || rejectMutation.isPending}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve & Publish
              </Button>
              <Button
                variant="destructive"
                onClick={() => rejectMutation.mutate()}
                disabled={approveMutation.isPending || rejectMutation.isPending}
              >
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Discussion
            </CardTitle>
            <CardDescription>
              Discuss this submission with the community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmitComment} className="space-y-2">
              <Textarea
                placeholder="Share your thoughts about this submission..."
                value={newComment}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewComment(e.target.value)}
                rows={3}
              />
              <Button
                type="submit"
                size="sm"
                disabled={!newComment.trim() || commentMutation.isPending}
              >
                <Send className="h-4 w-4 mr-1" />
                Post Comment
              </Button>
            </form>

            {/* Comments List */}
            {comments.data.length > 0 ? (
              <div className="space-y-4 pt-4 border-t">
                {comments.data.map((comment) => (
                  <div key={comment.id} className="space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="font-medium text-foreground">
                        User
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(comment.created_at).toLocaleDateString()}
                      </span>
                      {comment.updated_at !== comment.created_at && (
                        <span className="italic">(edited)</span>
                      )}
                    </div>
                    <p className="text-sm">{comment.body}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground pt-4 border-t">
                No comments yet. Be the first to share your thoughts!
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

  return (
    <Suspense fallback={<SubmissionDetailSkeleton />}>
      <SubmissionDetailContent submissionId={submissionId} />
    </Suspense>
  )
}
