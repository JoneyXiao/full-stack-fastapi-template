import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from "@tanstack/react-router"
import { CheckCircle, EllipsisVertical, Eye, XCircle } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { type ResourceSubmissionPublic, SubmissionsService } from "@/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useCustomToast from "@/hooks/useCustomToast"

interface SubmissionActionsMenuProps {
  submission: ResourceSubmissionPublic
}

export function SubmissionActionsMenu({
  submission,
}: SubmissionActionsMenuProps) {
  const { t } = useTranslation()
  const [menuOpen, setMenuOpen] = useState(false)
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()

  const approveMutation = useMutation({
    mutationFn: (id: string) => SubmissionsService.approveSubmission({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-submissions"] })
      queryClient.invalidateQueries({ queryKey: ["admin-resources"] })
      showSuccessToast(t("admin.submissions.approveSuccess"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || "Failed to approve"
      showErrorToast(detail)
    },
  })

  const rejectMutation = useMutation({
    mutationFn: (id: string) => SubmissionsService.rejectSubmission({ id }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-submissions"] })
      showSuccessToast(t("admin.submissions.rejectSuccess"))
    },
    onError: (error: Error & { body?: { detail?: string } }) => {
      const detail = error.body?.detail || "Failed to reject"
      showErrorToast(detail)
    },
  })

  const isLoading = approveMutation.isPending || rejectMutation.isPending

  return (
    <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <EllipsisVertical className="h-4 w-4" />
          <span className="sr-only">{t("common.actions")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link
            to="/submissions/$submissionId"
            params={{ submissionId: submission.id }}
          >
            <Eye className="h-4 w-4" />
            {t("resources.viewDetails")}
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            approveMutation.mutate(submission.id)
            setMenuOpen(false)
          }}
          disabled={isLoading}
          className="text-green-600 focus:text-green-600"
        >
          <CheckCircle className="h-4 w-4" />
          {t("admin.submissions.approve")}
        </DropdownMenuItem>
        <DropdownMenuItem
          variant="destructive"
          onClick={() => {
            rejectMutation.mutate(submission.id)
            setMenuOpen(false)
          }}
          disabled={isLoading}
        >
          <XCircle className="h-4 w-4" />
          {t("admin.submissions.reject")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
