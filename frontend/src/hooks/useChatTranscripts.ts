import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { type ChatTranscriptCreate, ChatTranscriptsService } from "@/client"
import { handleError } from "@/utils"
import useCustomToast from "./useCustomToast"

export function useChatTranscripts() {
  const { showErrorToast, showSuccessToast } = useCustomToast()
  const queryClient = useQueryClient()

  // List transcripts
  const transcriptsQuery = useQuery({
    queryKey: ["chat-transcripts"],
    queryFn: () => ChatTranscriptsService.listMyTranscripts({ limit: 50 }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  // Save transcript mutation
  const saveMutation = useMutation({
    mutationFn: (data: ChatTranscriptCreate) =>
      ChatTranscriptsService.saveTranscript({ requestBody: data }),
    onSuccess: () => {
      showSuccessToast("Chat saved!")
      queryClient.invalidateQueries({ queryKey: ["chat-transcripts"] })
    },
    onError: handleError.bind(showErrorToast),
  })

  // Delete transcript mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      ChatTranscriptsService.deleteMyTranscript({ id }),
    onSuccess: () => {
      showSuccessToast("Chat deleted")
      queryClient.invalidateQueries({ queryKey: ["chat-transcripts"] })
    },
    onError: handleError.bind(showErrorToast),
  })

  return {
    transcripts: transcriptsQuery.data?.data ?? [],
    count: transcriptsQuery.data?.count ?? 0,
    isLoading: transcriptsQuery.isLoading,
    isError: transcriptsQuery.isError,
    refetch: transcriptsQuery.refetch,
    // Mutations
    saveTranscript: saveMutation.mutate,
    saveTranscriptAsync: saveMutation.mutateAsync,
    isSaving: saveMutation.isPending,
    deleteTranscript: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,
  }
}

/**
 * Hook to fetch a single transcript by ID.
 * Must be called at the component top level (React hooks rules).
 */
export function useChatTranscript(id: string | undefined) {
  return useQuery({
    queryKey: ["chat-transcript", id],
    queryFn: () => ChatTranscriptsService.getMyTranscript({ id: id! }),
    enabled: !!id,
  })
}
