/**
 * Locale preference management utilities.
 * Persists locale selection to localStorage and updates document.lang attribute.
 */

export type SupportedLocale = "en" | "zh"

const LOCALE_STORAGE_KEY = "app-locale"
const DEFAULT_LOCALE: SupportedLocale = "en"

/**
 * Supported locales with their display labels.
 */
export const SUPPORTED_LOCALES: { value: SupportedLocale; label: string }[] = [
  { value: "en", label: "English" },
  { value: "zh", label: "中文" },
]

/**
 * Gets the current locale from localStorage, falling back to browser preference or default.
 */
export function getStoredLocale(): SupportedLocale {
  if (typeof window === "undefined") {
    return DEFAULT_LOCALE
  }

  const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
  if (stored && isValidLocale(stored)) {
    return stored as SupportedLocale
  }

  // Try to detect from browser language
  const browserLang = navigator.language.split("-")[0]
  if (isValidLocale(browserLang)) {
    return browserLang as SupportedLocale
  }

  return DEFAULT_LOCALE
}

/**
 * Persists the locale preference to localStorage and updates document.lang.
 */
export function setStoredLocale(locale: SupportedLocale): void {
  if (typeof window === "undefined") {
    return
  }

  localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  document.documentElement.lang = locale
}

/**
 * Initializes the document lang attribute from stored preference.
 * Call this on app startup.
 */
export function initializeLocale(): SupportedLocale {
  const locale = getStoredLocale()
  if (typeof document !== "undefined") {
    document.documentElement.lang = locale
  }
  return locale
}

/**
 * Type guard for supported locales.
 */
function isValidLocale(value: string): value is SupportedLocale {
  return SUPPORTED_LOCALES.some((l) => l.value === value)
}
