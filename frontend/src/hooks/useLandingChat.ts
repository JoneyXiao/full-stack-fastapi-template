import { useMutation } from "@tanstack/react-query"
import { type LandingChatRequest, LandingChatService } from "@/client"
import useCustomToast from "./useCustomToast"

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
}

export function useLandingChat() {
  const { showErrorToast } = useCustomToast()

  const chatMutation = useMutation({
    mutationFn: (message: string) =>
      LandingChatService.recommendResources({
        requestBody: { message } as LandingChatRequest,
      }),
    onError: (error) => {
      // Check for 503 (chat unavailable)
      const apiError = error as { status?: number }
      if (apiError.status === 503) {
        showErrorToast(
          "Chat is currently unavailable. Please try keyword search instead.",
        )
      } else {
        showErrorToast("Failed to get recommendations. Please try again.")
      }
    },
  })

  return {
    sendMessage: chatMutation.mutate,
    sendMessageAsync: chatMutation.mutateAsync,
    isLoading: chatMutation.isPending,
    isError: chatMutation.isError,
    error: chatMutation.error,
    data: chatMutation.data,
    reset: chatMutation.reset,
  }
}
