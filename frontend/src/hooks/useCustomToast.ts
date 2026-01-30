import { useCallback, useRef } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "sonner"

interface ToastOptions {
  /**
   * Optional debounce/rate-limit in milliseconds.
   * If set, subsequent calls within this window are ignored.
   * Rate-limit is scoped per browser tab (component instance).
   */
  debounceMs?: number
  /**
   * Optional unique key for rate-limiting scope.
   * Defaults to toast type (success/error/warning).
   * Use this to isolate rate-limiting between different features.
   */
  rateLimitKey?: string
}

type ShowToast = (description: string, options?: ToastOptions) => void

interface UseCustomToastReturn {
  showSuccessToast: ShowToast
  showErrorToast: ShowToast
  showWarningToast: ShowToast
}

function useCustomToast(): UseCustomToastReturn {
  const { t } = useTranslation()
  const lastToastRef = useRef<Record<string, number>>({})

  const isRateLimited = useCallback(
    (key: string, debounceMs: number | undefined): boolean => {
      if (!debounceMs || debounceMs <= 0) return false
      const now = Date.now()
      const last = lastToastRef.current[key] ?? 0
      if (now - last < debounceMs) return true
      lastToastRef.current[key] = now
      return false
    },
    [],
  )

  const showSuccessToast = useCallback(
    (description: string, options?: ToastOptions) => {
      if (
        isRateLimited(options?.rateLimitKey ?? "success", options?.debounceMs)
      )
        return
      toast.success(t("toast.success"), { description })
    },
    [t, isRateLimited],
  )

  const showErrorToast = useCallback(
    (description: string, options?: ToastOptions) => {
      if (isRateLimited(options?.rateLimitKey ?? "error", options?.debounceMs))
        return
      toast.error(t("errors.somethingWentWrong"), { description })
    },
    [t, isRateLimited],
  )

  const showWarningToast = useCallback(
    (description: string, options?: ToastOptions) => {
      if (
        isRateLimited(options?.rateLimitKey ?? "warning", options?.debounceMs)
      )
        return
      toast.warning(t("toast.warning"), { description })
    },
    [t, isRateLimited],
  )

  return { showSuccessToast, showErrorToast, showWarningToast }
}

export default useCustomToast
