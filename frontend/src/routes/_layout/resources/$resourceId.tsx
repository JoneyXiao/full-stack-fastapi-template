import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { createFileRoute, Link } from "@tanstack/react-router"
import { type ReactElement, Suspense, useState } from "react"
import { useTranslation } from "react-i18next"
import { FaGlobe } from "react-icons/fa"
import { LiaComments } from "react-icons/lia"
import { PiArrowLeft, PiPaperPlaneTiltBold } from "react-icons/pi"
import {
  TbBookmark,
  TbBookmarkFilled,
  TbDotsVertical,
  TbExternalLink,
  TbShare,
  TbThumbUp,
  TbThumbUpFilled,
} from "react-icons/tb"

import { type ResourceDetailPublic, ResourcesService } from "@/client"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Textarea } from "@/components/ui/textarea"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import useAuth from "@/hooks/useAuth"
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard"
import useCustomToast from "@/hooks/useCustomToast"
import useDocumentTitle from "@/hooks/useDocumentTitle"

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
})

function safeHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return undefined
  }
}

function initialsFromText(text: string): string {
  const cleaned = (text || "").trim()
  if (!cleaned) return "U"

  const words = cleaned.split(/\s+/).filter(Boolean)
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase()
  }

  // Single word: use first 2 alphanumeric chars, fallback to first 2 chars
  const chars =
    cleaned.replace(/[^a-z0-9]/gi, "").slice(0, 2) || cleaned.slice(0, 2)
  return (chars || "U").toUpperCase()
}

function formatDateTime(dateStr: string): { short: string; full: string } {
  const date = new Date(dateStr)
  return {
    short: date.toLocaleDateString(),
    full: date.toLocaleString(),
  }
}

function formatStarCount(count?: number | null): string {
  const safeCount = Math.max(0, count ?? 0)
  if (safeCount < 1000) {
    return safeCount.toString()
  }

  const value = safeCount / 1000
  const rounded = Math.round(value * 10) / 10
  let display = rounded.toFixed(1)
  if (Number.isInteger(rounded)) {
    display = rounded.toFixed(0)
  }
  return `${display}k`
}

function isEdited(createdAt: string, updatedAt: string): boolean {
  if (createdAt === updatedAt) return false

  const createdMs = Date.parse(createdAt)
  const updatedMs = Date.parse(updatedAt)

  if (!Number.isFinite(createdMs) || !Number.isFinite(updatedMs)) {
    return true
  }

  const toleranceMs = 1000
  // Treat timestamps within 1s as the same to avoid false "edited" labels.
  return Math.abs(updatedMs - createdMs) > toleranceMs
}

function CommentItem({
  comment,
  onCopyLink,
  onCopyText,
  t,
}: {
  comment: {
    id: string
    body: string
    author_id: string
    author_display?: string | null
    created_at: string
    updated_at: string
  }
  onCopyLink: (commentId: string) => void
  onCopyText: (text: string) => void
  t: (key: string, options?: Record<string, unknown>) => string
}) {
  const created = formatDateTime(comment.created_at)
  const edited = isEdited(comment.created_at, comment.updated_at)
  const authorDisplay = comment.author_display || t("common.user")

  return (
    <div id={`comment-${comment.id}`} className="group relative flex gap-3">
      <div className="pt-0.5">
        <Avatar className="size-8">
          <AvatarFallback className="text-[11px] font-semibold">
            {initialsFromText(authorDisplay)}
          </AvatarFallback>
        </Avatar>
      </div>

      <div className="min-w-0 flex-1 overflow-hidden rounded-lg border bg-card">
        <div className="flex items-center justify-between gap-2 border-b bg-muted/40 px-3 py-2">
          <div className="min-w-0 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{authorDisplay}</span>

            <span className="hidden sm:inline text-muted-foreground/70">•</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-default underline decoration-dotted underline-offset-4">
                  {created.short}
                </span>
              </TooltipTrigger>
              <TooltipContent sideOffset={6}>{created.full}</TooltipContent>
            </Tooltip>

            {edited && (
              <>
                <span className="text-muted-foreground/70">•</span>
                <span className="italic">({t("common.edited")})</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="cursor-pointer"
                  aria-label={t("common.openMenu")}
                >
                  <TbDotsVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onCopyLink(comment.id)}
                >
                  {t("resources.detail.share")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => onCopyText(comment.body)}
                >
                  {t("common.copy")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="px-3 py-3">
          <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
            {comment.body}
          </p>
        </div>
      </div>
    </div>
  )
}

function ResourceDetailContent({ resourceId }: { resourceId: string }) {
  const { t } = useTranslation()
  const { data: resource } = useSuspenseQuery(
    getResourceQueryOptions(resourceId),
  )
  const { data: comments } = useSuspenseQuery(
    getCommentsQueryOptions(resourceId),
  )
  const { user } = useAuth()
  const [, copyToClipboard] = useCopyToClipboard()
  const { showSuccessToast } = useCustomToast()
  const queryClient = useQueryClient()
  const [newComment, setNewComment] = useState("")

  const likeMutation = useMutation({
    mutationFn: () =>
      resource.liked_by_me
        ? ResourcesService.unlikeResource({ id: resourceId })
        : ResourcesService.likeResource({ id: resourceId }),
    onSuccess: (data) => {
      // Update cache immediately with returned state
      queryClient.setQueryData<ResourceDetailPublic>(
        ["resource", resourceId],
        (old) =>
          old
            ? { ...old, liked_by_me: data.active, likes_count: data.count }
            : old,
      )
      showSuccessToast(
        data.active
          ? t("resources.detail.likeSuccess")
          : t("resources.detail.unlikeSuccess"),
      )
    },
  })

  const favoriteMutation = useMutation({
    mutationFn: () =>
      resource.favorited_by_me
        ? ResourcesService.unfavoriteResource({ id: resourceId })
        : ResourcesService.favoriteResource({ id: resourceId }),
    onSuccess: (data) => {
      queryClient.setQueryData<ResourceDetailPublic>(
        ["resource", resourceId],
        (old) =>
          old
            ? {
                ...old,
                favorited_by_me: data.active,
                favorites_count: data.count,
              }
            : old,
      )
      showSuccessToast(
        data.active
          ? t("resources.detail.favoriteSuccess")
          : t("resources.detail.unfavoriteSuccess"),
      )
    },
  })

  const commentMutation = useMutation({
    mutationFn: (body: string) =>
      ResourcesService.createResourceComment({
        id: resourceId,
        requestBody: { body },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["resource-comments", resourceId],
      })
      setNewComment("")
      showSuccessToast(t("resources.detail.commentSuccess"))
    },
  })

  const handleShare = () => {
    copyToClipboard(window.location.href)
    showSuccessToast(t("resources.detail.shareSuccess"))
  }

  const handleCopyCommentLink = (commentId: string) => {
    const url = `${window.location.href.split("#")[0]}#comment-${commentId}`
    copyToClipboard(url)
    showSuccessToast(t("resources.detail.shareSuccess"))
  }

  const handleCopyText = (text: string) => {
    copyToClipboard(text)
    showSuccessToast(t("resources.detail.shareSuccess"))
  }

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      commentMutation.mutate(newComment.trim())
    }
  }

  const host = safeHostname(resource.destination_url)

  // Derived icon components based on reaction state
  const LikeIcon = resource.liked_by_me ? TbThumbUpFilled : TbThumbUp
  const FavoriteIcon = resource.favorited_by_me ? TbBookmarkFilled : TbBookmark
  const likeIconClass = resource.liked_by_me ? "text-primary" : ""
  const favoriteIconClass = resource.favorited_by_me ? "text-primary" : ""

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Link
          to="/resources"
          className="inline-flex items-center text-muted-foreground hover:text-foreground text-sm"
        >
          <PiArrowLeft className="h-4 w-4 mr-2" />
          {t("resources.detail.backToResources")}
        </Link>

        <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8">
          <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
          <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-bold tracking-tight">
                    {resource.title}
                  </h1>
                  <Badge variant="secondary">
                    {t(`resources.types.${resource.type}`, {
                      defaultValue: resource.type,
                    })}
                  </Badge>
                </div>
                <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                  {host && (
                    <span className="inline-flex items-center gap-1">
                      <FaGlobe className="h-4 w-4" />
                      {host}
                    </span>
                  )}
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {t("resources.detail.added")}:{" "}
                    {new Date(resource.created_at).toLocaleDateString()}
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span>
                    {t("resources.detail.updated")}:{" "}
                    {new Date(resource.updated_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="mt-2 flex items-center gap-2 lg:hidden">
                  <a
                    href={resource.destination_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={t("resources.detail.visitResource")}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="cursor-pointer justify-start hover:bg-transparent"
                    >
                      <TbExternalLink className="h-5 w-5" />
                    </Button>
                  </a>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="cursor-pointer justify-start hover:bg-transparent"
                    onClick={handleShare}
                    title={t("resources.detail.share")}
                  >
                    <TbShare className="h-5 w-5" />
                  </Button>
                  {user && (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer justify-start hover:bg-transparent gap-1"
                        onClick={() => favoriteMutation.mutate()}
                        disabled={favoriteMutation.isPending}
                        title={t(
                          resource.favorited_by_me
                            ? "resources.detail.unfavorite"
                            : "resources.detail.favorite",
                        )}
                      >
                        <FavoriteIcon
                          className={`h-5 w-5 ${favoriteIconClass}`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="cursor-pointer justify-start hover:bg-transparent gap-1"
                        onClick={() => likeMutation.mutate()}
                        disabled={likeMutation.isPending}
                        title={t(
                          resource.liked_by_me
                            ? "resources.detail.unlike"
                            : "resources.detail.like",
                        )}
                      >
                        <LikeIcon className={`h-5 w-5 ${likeIconClass}`} />
                        <span className="text-xs">
                          {formatStarCount(resource.likes_count)}
                        </span>
                      </Button>
                    </>
                  )}
                </div>
                {resource.description && (
                  <p className="mt-6 max-w-3xl text-muted-foreground text-sm">
                    {resource.description}
                  </p>
                )}
              </div>

              <div className="hidden lg:flex lg:flex-wrap lg:gap-2">
                <a
                  href={resource.destination_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="cursor-pointer">
                    <TbExternalLink className="h-3 w-3 mr-1" />
                    {t("resources.detail.visitResource")}
                  </Button>
                </a>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleShare}
                >
                  <TbShare className="h-3 w-3 mr-1" />
                  {t("resources.detail.share")}
                </Button>
                {user && (
                  <>
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() => favoriteMutation.mutate()}
                      disabled={favoriteMutation.isPending}
                    >
                      <FavoriteIcon
                        className={`h-3 w-3 mr-1 ${favoriteIconClass}`}
                      />
                      {t(
                        resource.favorited_by_me
                          ? "resources.detail.favorited"
                          : "resources.detail.favorite",
                      )}
                    </Button>
                    <div className="flex items-center -space-x-px">
                      <Button
                        variant="outline"
                        className="cursor-pointer rounded-r-none relative z-10 focus:z-20"
                        onClick={() => likeMutation.mutate()}
                        disabled={likeMutation.isPending}
                      >
                        <LikeIcon className={`h-3 w-3 mr-1 ${likeIconClass}`} />
                        {t(
                          resource.liked_by_me
                            ? "resources.detail.liked"
                            : "resources.detail.like",
                        )}
                      </Button>
                      <div className="flex h-9 items-center justify-center rounded-r-md border bg-background px-3 text-sm font-medium tabular-nums">
                        {formatStarCount(resource.likes_count)}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <LiaComments className="h-5 w-5" />
              {t("resources.detail.comments", { count: comments.count })}
            </CardTitle>
            <CardDescription>
              {t("resources.detail.commentsDescription")}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {user ? (
              <div className="flex gap-3">
                <div className="pt-0.5">
                  <Avatar className="size-8">
                    <AvatarFallback className="text-[11px] font-semibold">
                      {initialsFromText(
                        user.full_name ?? user.email ?? user.id,
                      )}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <form
                  onSubmit={handleSubmitComment}
                  className="flex-1 space-y-2"
                >
                  <Textarea
                    placeholder={t("resources.detail.commentPlaceholder")}
                    value={newComment}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setNewComment(e.target.value)
                    }
                    rows={3}
                    className="resize-y text-sm placeholder:text-muted-foreground/70"
                  />
                  <div className="flex items-center justify-end">
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!newComment.trim() || commentMutation.isPending}
                    >
                      <PiPaperPlaneTiltBold className="h-4 w-4 mr-1" />
                      {t("resources.detail.postComment")}
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                <Link to="/login" className="text-primary hover:underline">
                  {t("auth.signIn")}
                </Link>{" "}
                {t("resources.detail.toLeaveComment")}
              </p>
            )}

            <Separator />

            {comments.data.length > 0 ? (
              <div className="space-y-4">
                {comments.data.map((comment) => (
                  <CommentItem
                    key={comment.id}
                    comment={comment}
                    onCopyLink={handleCopyCommentLink}
                    onCopyText={handleCopyText}
                    t={t}
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                {t("resources.detail.noComments")}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

const COMMENT_SKELETON_ITEMS = 3

function ResourceDetailSkeleton(): ReactElement {
  return (
    <div className="flex flex-col gap-6">
      <Skeleton className="h-4 w-32" />
      <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-6 md:p-8">
        <div className="pointer-events-none absolute -right-20 -top-24 size-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 -bottom-24 size-72 rounded-full bg-primary/5 blur-3xl" />
        <div className="relative flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-6 w-20" />
            </div>
            <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="mt-2 flex items-center gap-2 lg:hidden">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-8 w-20" />
              <Skeleton className="h-8 w-20" />
            </div>
            <div className="mt-6 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
          <div className="hidden lg:flex lg:flex-wrap lg:gap-2">
            <Skeleton className="h-9 w-32" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
            <div className="flex items-center -space-x-px">
              <Skeleton className="h-9 w-28 rounded-r-none" />
              <Skeleton className="h-9 w-16 rounded-l-none" />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-5 w-36" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-64" />
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Skeleton className="h-8 w-8 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-20 w-full" />
                <div className="flex justify-end">
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </div>
            <Separator />
            <div className="space-y-4">
              {Array.from({ length: COMMENT_SKELETON_ITEMS }, (_, index) => (
                <div key={`comment-skeleton-${index}`} className="flex gap-3">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <Skeleton className="h-24 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function ResourceDetailPage() {
  const { resourceId } = Route.useParams()
  useDocumentTitle("resources.detailPageTitle")

  return (
    <Suspense fallback={<ResourceDetailSkeleton />}>
      <ResourceDetailContent resourceId={resourceId} />
    </Suspense>
  )
}
