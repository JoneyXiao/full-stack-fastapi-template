import { Link } from "@tanstack/react-router"
import {
  History,
  Loader2,
  MessageSquare,
  Save,
  Send,
  Trash2,
} from "lucide-react"
import { type FormEvent, type KeyboardEvent, useRef, useState } from "react"
import type { ResourcePreview } from "@/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useChatTranscripts } from "@/hooks/useChatTranscripts"
import { useLandingChat } from "@/hooks/useLandingChat"
import { ChatMessageList } from "./ChatMessageList"
import { SavedTranscriptsDialog } from "./SavedTranscriptsDialog"

interface LandingChatProps {
  className?: string
  isAuthenticated: boolean
}

interface DisplayMessage {
  role: "user" | "assistant"
  content: string
  resources?: ResourcePreview[]
}

export function LandingChat({ className, isAuthenticated }: LandingChatProps) {
  const [inputValue, setInputValue] = useState("")
  const [messages, setMessages] = useState<DisplayMessage[]>([])
  const [showTranscripts, setShowTranscripts] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const { sendMessageAsync, isLoading, isError, reset } = useLandingChat()
  const { saveTranscript, isSaving } = useChatTranscripts()

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
      // Add assistant response with resources
      const assistantMessage: DisplayMessage = {
        role: "assistant",
        content: response.assistant_message,
        resources: response.recommendations,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch {
      // Error is handled by the hook's toast, but we show a fallback message
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

  const handleSave = () => {
    if (messages.length === 0) return

    // Generate title from first user message
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

  // Show sign-in prompt for unauthenticated users
  if (!isAuthenticated) {
    return (
      <section className={className} data-testid="landing-chat-section">
        <div className="rounded-lg border bg-card p-6 text-center">
          <h2 className="flex items-center justify-center gap-2 text-lg font-semibold">
            <MessageSquare className="h-5 w-5" />
            Get AI-Powered Recommendations
          </h2>
          <p className="mt-2 text-muted-foreground">
            Sign in to ask our AI assistant for personalized resource
            recommendations.
          </p>
          <div className="mt-4" data-testid="chat-signin-cta">
            <Link to="/login">
              <Button>Sign in to Chat</Button>
            </Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className={className} data-testid="landing-chat-section">
      <div className="rounded-lg border bg-card p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <MessageSquare className="h-5 w-5" />
            Ask for Recommendations
          </h2>
          <div className="flex gap-2">
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
                  data-testid="landing-chat-save"
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
                  data-testid="landing-chat-clear"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="mb-4 max-h-96 overflow-y-auto">
          <ChatMessageList messages={messages} />

          {/* Loading indicator */}
          {isLoading && (
            <div
              className="mt-4 flex items-center justify-center"
              data-testid="landing-chat-loading"
            >
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="ml-2 text-sm text-muted-foreground">
                Thinking...
              </span>
            </div>
          )}

          {/* Response marker for tests */}
          {messages.length > 0 && !isLoading && (
            <div data-testid="landing-chat-response" className="hidden" />
          )}

          {/* Error marker for tests */}
          {isError && !isLoading && (
            <div data-testid="landing-chat-error" className="hidden" />
          )}
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about tutorials, tools, datasets..."
            aria-label="Chat message"
            data-testid="landing-chat-input"
            disabled={isLoading}
          />
          <Button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            data-testid="landing-chat-send"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>

        <p className="mt-2 text-xs text-muted-foreground">
          Recommendations are based on our curated resource catalog.
        </p>
      </div>

      <SavedTranscriptsDialog
        open={showTranscripts}
        onOpenChange={setShowTranscripts}
        onLoadTranscript={(transcript) => {
          setMessages(
            transcript.messages.map((m) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            })),
          )
          setShowTranscripts(false)
        }}
      />
    </section>
  )
}
