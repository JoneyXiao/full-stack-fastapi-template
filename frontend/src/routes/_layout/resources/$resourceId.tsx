import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import {
  ArrowLeft,
  ExternalLink,
  Heart,
  Bookmark,
  Share2,
  MessageSquare,
  Send,
} from "lucide-react"
import { Suspense, useState } from "react"

import { ResourcesService } from "@/client"
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
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import useCustomToast from "@/hooks/useCustomToast"
import useAuth from "@/hooks/useAuth"

function getResourceQueryOptions(resourceId: string) {
  return {
    queryFn: () => ResourcesService.getResource({ id: resourceId }),
    queryKey: ["resource", resourceId],
  }
}

function getCommentsQueryOptions(resourceId: string) {
  return {
    queryFn: () => ResourcesService.listResourceComments({ id: resourceId }),
    queryKey: ["resource-comments", resourceId],
  }
}

export const Route = createFileRoute("/_layout/resources/$resourceId")({
  component: ResourceDetailPage,
  head: () => ({
    meta: [
      {
        title: "Resource Details - AI Resources",
      },
    ],
  }),
})

function ResourceDetailContent({ resourceId }: { resourceId: string }) {
  const { data: resource } = useSuspenseQuery(getResourceQueryOptions(resourceId))
  const { data: comments } = useSuspenseQuery(getCommentsQueryOptions(resourceId))
  const { user } = useAuth()
  const [, copyToClipboard] = useCopyToClipboard()
  const { showSuccessToast } = useCustomToast()
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("")

  const likeMutation = useMutation({
    mutationFn: () => ResourcesService.likeResource({ id: resourceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resource", resourceId] })
      showSuccessToast("Resource added to your likes")
    },
  })

  const favoriteMutation = useMutation({
    mutationFn: () => ResourcesService.favoriteResource({ id: resourceId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resource", resourceId] })
      showSuccessToast("Resource added to your favorites")
    },
  })

  const commentMutation = useMutation({
    mutationFn: (body: string) =>
      ResourcesService.createResourceComment({ id: resourceId, requestBody: { body } }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resource-comments", resourceId] })
      setNewComment("")
      showSuccessToast("Your comment has been posted")
    },
  })

  const handleShare = () => {
    copyToClipboard(window.location.href)
    showSuccessToast("Resource link copied to clipboard")
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      commentMutation.mutate(newComment.trim())
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Link to="/resources" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Resources
      </Link>

      <div className="space-y-6">
        {/* Resource Header */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">{resource.title}</h1>
              <Badge variant="secondary" className="mt-2">{resource.type}</Badge>
            </div>
            <a
              href={resource.destination_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Visit Resource
              </Button>
            </a>
          </div>
          {resource.description && (
            <p className="text-muted-foreground mt-4">{resource.description}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {user && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => likeMutation.mutate()}
                disabled={likeMutation.isPending}
              >
                <Heart className="h-4 w-4 mr-1" />
                Like
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => favoriteMutation.mutate()}
                disabled={favoriteMutation.isPending}
              >
                <Bookmark className="h-4 w-4 mr-1" />
                Favorite
              </Button>
            </>
          )}
          <Button variant="outline" size="sm" onClick={handleShare}>
            <Share2 className="h-4 w-4 mr-1" />
            Share
          </Button>
        </div>

        {/* Comments Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Comments ({comments.count})
            </CardTitle>
            <CardDescription>Join the discussion about this resource</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Add Comment Form */}
            {user ? (
              <form onSubmit={handleSubmitComment} className="space-y-2">
                <Textarea
                  placeholder="Write a comment..."
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
            ) : (
              <p className="text-sm text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  Sign in
                </Link>{" "}
                to leave a comment
              </p>
            )}

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

function ResourceDetailSkeleton() {
  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Skeleton className="h-4 w-32 mb-6" />
      <div className="space-y-6">
        <div>
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-20 mt-2" />
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-4 w-2/3 mt-2" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  )
}

function ResourceDetailPage() {
  const { resourceId } = Route.useParams()

  return (
    <Suspense fallback={<ResourceDetailSkeleton />}>
      <ResourceDetailContent resourceId={resourceId} />
    </Suspense>
  )
}
