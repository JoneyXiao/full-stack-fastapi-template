import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useCallback, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { UsersService } from "@/client"
import {
  getStoredLocale,
  type SupportedLocale,
  setStoredLocale,
} from "@/lib/locale"

/**
 * Hook for reading and updating the user's locale preference.
 * Persists to localStorage, updates document.lang attribute, syncs i18next,
 * and for signed-in users, persists to the backend.
 */
export function useLocale() {
  const { i18n } = useTranslation()
  const queryClient = useQueryClient()
  const [locale, setLocaleState] = useState<SupportedLocale>(() =>
    getStoredLocale(),
  )

  // Mutation to persist locale to backend for signed-in users
  const updateLocaleMutation = useMutation({
    mutationFn: (newLocale: SupportedLocale) =>
      UsersService.updateUserMe({ requestBody: { locale: newLocale } }),
    onSuccess: () => {
      // Invalidate user query to refresh cached user data
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
  })

  // Initialize document.lang on mount
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback(
    (newLocale: SupportedLocale) => {
      // Always update local state and localStorage
      setStoredLocale(newLocale)
      setLocaleState(newLocale)
      // Sync i18next language
      i18n.changeLanguage(newLocale)

      // Persist to backend if user is signed in (has access token)
      const isSignedIn = localStorage.getItem("access_token") !== null
      if (isSignedIn) {
        updateLocaleMutation.mutate(newLocale)
      }
    },
    [i18n, updateLocaleMutation],
  )

  return {
    locale,
    setLocale,
  }
}
