import { useMutation } from "@tanstack/react-query"
import i18next from "i18next"
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
        showErrorToast(i18next.t("chat.landing.unavailable"))
      } else {
        showErrorToast(i18next.t("chat.landing.failed"))
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
