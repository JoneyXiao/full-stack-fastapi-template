import { Loader2, Trash2 } from "lucide-react"
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
  const { transcripts, isLoading, deleteTranscript, isDeleting } =
    useChatTranscripts()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-md"
        data-testid="saved-transcripts-dialog"
      >
        <DialogHeader>
          <DialogTitle>Saved Chats</DialogTitle>
        </DialogHeader>

        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        )}

        {!isLoading && transcripts.length === 0 && (
          <div className="py-8 text-center text-muted-foreground">
            <p>No saved chats yet.</p>
            <p className="mt-1 text-sm">
              Click the save button during a chat to save it here.
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
                      {transcript.messages.length} messages •{" "}
                      {new Date(transcript.created_at).toLocaleDateString()}
                    </p>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon-sm"
                    onClick={() => deleteTranscript(transcript.id)}
                    disabled={isDeleting}
                    title="Delete chat"
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
