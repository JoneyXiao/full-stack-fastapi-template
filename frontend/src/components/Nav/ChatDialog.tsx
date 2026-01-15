import { Link } from "@tanstack/react-router"
import {
  History,
  Loader2,
  MessageSquare,
  Save,
  Send,
  Trash2,
} from "lucide-react"
import { type FormEvent, type KeyboardEvent, useEffect, useRef, useState } from "react"

import type { ChatTranscriptPublic, ResourcePreview } from "@/client"
import { ChatMessageList } from "@/components/Landing/ChatMessageList"
import { SavedTranscriptsDialog } from "@/components/Landing/SavedTranscriptsDialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import useAuth from "@/hooks/useAuth"
import { useChatTranscripts } from "@/hooks/useChatTranscripts"
import { useLandingChat } from "@/hooks/useLandingChat"

interface ChatDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface DisplayMessage {
  role: "user" | "assistant"
  content: string
  resources?: ResourcePreview[]
}

export function ChatDialog({ open, onOpenChange }: ChatDialogProps) {
  const { user } = useAuth()
  const isAuthenticated = !!user
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [showTranscripts, setShowTranscripts] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { sendMessageAsync, isLoading, isError, reset } = useLandingChat()
  const { saveTranscript, isSaving } = useChatTranscripts()

  // SavedTranscriptsDialog is rendered as a sibling to the main Dialog.
  // Ensure it can't remain open if the parent chat dialog closes.
  useEffect(() => {
    if (!open) {
      setShowTranscripts(false)
    }
  }, [open])

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault()
    const message = inputValue.trim()
    if (!message || isLoading) return

    // Add user message
    const userMessage: DisplayMessage = { role: "user", content: message }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    try {
      const response = await sendMessageAsync(message)
      const assistantMessage: DisplayMessage = {
        role: "assistant",
        content: response.assistant_message,
        resources: response.recommendations,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      const errorMessage: DisplayMessage = {
        role: "assistant",
        content:
          "Sorry, I couldn't process your request. Please try using keyword search instead.",
      }
      setMessages((prev) => [...prev, errorMessage])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleClear = () => {
    setMessages([])
    reset()
    inputRef.current?.focus()
  }

  const handleLoadTranscript = (transcript: ChatTranscriptPublic) => {
    // Load messages from transcript
    const loadedMessages: DisplayMessage[] = transcript.messages.map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content,
    }))
    setMessages(loadedMessages)
    setShowTranscripts(false)
  }

  const handleSave = () => {
    if (messages.length === 0) return

    const firstUserMsg = messages.find((m) => m.role === "user")
    const title = firstUserMsg
      ? firstUserMsg.content.slice(0, 50) +
        (firstUserMsg.content.length > 50 ? "..." : "")
      : "Chat transcript"

    saveTranscript({
      title,
      messages: messages.map((m) => ({
        role: m.role,
        content: m.content,
      })),
    })
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent
          className="max-w-2xl max-h-[80vh] flex flex-col"
          data-testid="chat-dialog"
        >
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              AI Chat
            </DialogTitle>
            <DialogDescription>
              Get AI-powered resource recommendations
            </DialogDescription>
          </DialogHeader>

          {/* Unauthenticated state */}
          {!isAuthenticated && (
            <div
              className="flex-1 flex flex-col items-center justify-center py-8"
              data-testid="chat-auth-prompt"
            >
              <p className="text-muted-foreground text-center mb-4">
                Sign in to ask our AI assistant for personalized resource
                recommendations.
              </p>
              <Link to="/login" onClick={() => onOpenChange(false)}>
                <Button>Sign in to Chat</Button>
              </Link>
            </div>
          )}

          {/* Authenticated state */}
          {isAuthenticated && (
            <>
              {/* Chat controls */}
              <div className="flex items-center justify-end gap-2 border-b pb-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowTranscripts(true)}
                  title="View saved chats"
                >
                  <History className="h-4 w-4" />
                </Button>
                {messages.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleSave}
                      disabled={isSaving}
                      title="Save chat"
                    >
                      {isSaving ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleClear}
                      title="Clear chat"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </>
                )}
              </div>

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto min-h-[200px] max-h-[400px] py-4">
                {messages.length === 0 && !isLoading && (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                    <MessageSquare className="h-8 w-8 mb-2" />
                    <p>Ask me anything about AI resources!</p>
                  </div>
                )}

                <ChatMessageList messages={messages} />

                {isLoading && (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-5 w-5 animate-spin text-primary" />
                    <span className="ml-2 text-sm text-muted-foreground">
                      Thinking...
                    </span>
                  </div>
                )}

                {isError && !isLoading && (
                  <div
                    className="text-center text-sm text-muted-foreground py-4"
                    data-testid="chat-error-state"
                  >
                    <p>Chat service is temporarily unavailable.</p>
                    <p className="mt-1 text-xs">
                      Try using keyword search instead.
                    </p>
                  </div>
                )}
              </div>

              {/* Input form */}
              <form
                onSubmit={handleSubmit}
                className="flex gap-2 pt-2 border-t"
              >
                <Input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about AI resources..."
                  disabled={isLoading}
                  data-testid="chat-dialog-input"
                />
                <Button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>

      <SavedTranscriptsDialog
        open={showTranscripts}
        onOpenChange={setShowTranscripts}
        onLoadTranscript={handleLoadTranscript}
      />
    </>
  )
}
