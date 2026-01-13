import { Link } from "@tanstack/react-router"
import { BookOpen } from "lucide-react"
import type { ResourcePreview } from "@/client"
import { cn } from "@/lib/utils"

interface ChatMessageListProps {
  messages: Array<{
    role: "user" | "assistant"
    content: string
    resources?: ResourcePreview[]
  }>
  className?: string
}

export function ChatMessageList({ messages, className }: ChatMessageListProps) {
  if (messages.length === 0) {
    return null
  }

  return (
    <div
      className={cn("flex flex-col gap-4", className)}
      data-testid="landing-chat-messages"
    >
      {messages.map((message, index) => (
        <ChatMessage key={index} message={message} />
      ))}
    </div>
  )
}

interface ChatMessageProps {
  message: {
    role: "user" | "assistant"
    content: string
    resources?: ResourcePreview[]
  }
}

function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user"

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-lg p-4",
        isUser
          ? "ml-auto max-w-[80%] bg-primary text-primary-foreground"
          : "mr-auto max-w-[90%] bg-muted",
      )}
      data-testid="chat-message"
      data-role={message.role}
    >
      <p className="text-sm whitespace-pre-wrap">{message.content}</p>

      {/* Resource recommendations from assistant */}
      {!isUser && message.resources && message.resources.length > 0 && (
        <div className="mt-2 flex flex-col gap-2">
          <p className="text-xs font-medium opacity-70">
            Recommended resources:
          </p>
          <div className="flex flex-col gap-1">
            {message.resources.map((resource) => (
              <Link
                key={resource.id}
                to="/resources/$resourceId"
                params={{ resourceId: resource.id }}
                className="flex items-center gap-1 text-sm underline underline-offset-2 hover:opacity-80"
              >
                <BookOpen className="h-3 w-3 shrink-0" />
                {resource.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
