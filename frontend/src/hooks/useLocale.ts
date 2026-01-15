import { useCallback, useEffect, useState } from "react"
import {
  getStoredLocale,
  type SupportedLocale,
  setStoredLocale,
} from "@/lib/locale"

/**
 * Hook for reading and updating the user's locale preference.
 * Persists to localStorage and updates document.lang attribute.
 */
export function useLocale() {
  const [locale, setLocaleState] = useState<SupportedLocale>(() =>
    getStoredLocale(),
  )

  // Initialize document.lang on mount
  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const setLocale = useCallback((newLocale: SupportedLocale) => {
    setStoredLocale(newLocale)
    setLocaleState(newLocale)
  }, [])

  return {
    locale,
    setLocale,
  }
}
