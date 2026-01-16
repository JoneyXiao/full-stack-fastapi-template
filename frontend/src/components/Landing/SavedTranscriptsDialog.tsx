import { Loader2, Trash2 } from "lucide-react"
import { useTranslation } from "react-i18next"
import type { ChatTranscriptPublic } from "@/client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useChatTranscripts } from "@/hooks/useChatTranscripts"

interface SavedTranscriptsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onLoadTranscript: (transcript: ChatTranscriptPublic) => void
}

export function SavedTranscriptsDialog({
  open,
  onOpenChange,
  onLoadTranscript,
}: SavedTranscriptsDialogProps) {
  const { t } = useTranslation()
  const { transcripts, isLoading, deleteTranscript, isDeleting } =
    useChatTranscripts()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        data-testid="saved-transcripts-dialog"
      >
        <DialogHeader>
          <DialogTitle>{t("chat.savedTranscripts.title")}</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && transcripts.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p>{t("chat.savedTranscripts.emptyTitle")}</p>
            <p className="mt-1 text-sm">
              {t("chat.savedTranscripts.emptyHint")}
            </p>
          </div>
        )}

        {!isLoading && transcripts.length > 0 && (
          <div className="max-h-96 overflow-y-auto">
            <div className="flex flex-col gap-2 pr-2">
              {transcripts.map((transcript) => (
                <div
                  key={transcript.id}
                  className="flex items-center justify-between rounded-lg border p-3"
                >
                  <button
                    type="button"
                    onClick={() => onLoadTranscript(transcript)}
                    className="flex-1 text-left"
                  >
                    <p className="font-medium line-clamp-1">
                      {transcript.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t("chat.savedTranscripts.messagesCount", {
                        count: transcript.messages.length,
                      })}{" "}
                      • {new Date(transcript.created_at).toLocaleDateString()}
                    </p>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => deleteTranscript(transcript.id)}
                    disabled={isDeleting}
                    title={t("chat.savedTranscripts.deleteTitle")}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
