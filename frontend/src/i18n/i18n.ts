/**
 * i18n initialization for the application.
 *
 * - Uses i18next + react-i18next.
 * - Bundles English and Chinese translations as JSON resources.
 * - Falls back to English when a translation key is missing.
 * - Logs missing keys in development mode only.
 */

import i18n from "i18next"
import { initReactI18next } from "react-i18next"

import { getStoredLocale } from "@/lib/locale"

import en from "./locales/en.json"
import zh from "./locales/zh.json"

const isDev = import.meta.env.DEV

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    zh: { translation: zh },
  },
  lng: getStoredLocale(),
  fallbackLng: "en",
  supportedLngs: ["en", "zh"],
  defaultNS: "translation",
  interpolation: {
    escapeValue: false, // React already escapes
  },
  // Dev-only: log missing keys to help catch incomplete translations
  saveMissing: isDev,
  missingKeyHandler: isDev
    ? (_lngs, _ns, key, fallbackValue) => {
        console.warn(
          `[i18n] Missing translation key: "${key}" (fallback: "${fallbackValue}")`,
        )
      }
    : undefined,
})

export default i18n
