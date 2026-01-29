import { AxiosError } from "axios"
import { type ApiError, OpenAPI } from "./client"
import { localizeError } from "./i18n/errors"

function extractErrorMessage(err: ApiError): string {
  if (err instanceof AxiosError) {
    return localizeError(err.message)
  }

  const errDetail = (err.body as any)?.detail
  if (Array.isArray(errDetail) && errDetail.length > 0) {
    return localizeError(errDetail[0].msg)
  }
  return localizeError(errDetail || "Something went wrong.")
}

export function handleError(this: (msg: string) => void, err: ApiError): void {
  const errorMessage = extractErrorMessage(err)
  this(errorMessage)
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

export function resolveApiUrl(
  path: string | null | undefined,
): string | undefined {
  if (!path) return undefined
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path
  }
  const base = OpenAPI.BASE?.replace(/\/$/, "")
  if (!base) return path
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export const DEFAULT_AVATAR = "/assets/images/default_avatar.webp"

/**
 * Allowlist of safe relative paths for the "from" redirect parameter.
 * Only paths in this list are allowed for post-callback redirects.
 * Full URLs (http://, https://) are always rejected.
 */
const SAFE_REDIRECT_PATHS = ["/", "/settings", "/dashboard", "/items", "/admin"]

/**
 * Validate and sanitize a redirect path from the "from" query parameter.
 *
 * Security rules:
 * - Full URLs (http://, https://, //) are rejected
 * - Only paths in SAFE_REDIRECT_PATHS allowlist are accepted
 * - Anything else falls back to the default path
 *
 * @param fromParam - The "from" query parameter value
 * @param fallback - Default path if validation fails (default: "/")
 * @returns A safe relative path for redirection
 */
export function getSafeRedirectPath(
  fromParam: string | null | undefined,
  fallback = "/",
): string {
  // No param provided
  if (!fromParam) {
    return fallback
  }

  // Reject full URLs (security: prevent open redirect attacks)
  const unsafeProtocols = ["http://", "https://", "//"]
  if (unsafeProtocols.some((protocol) => fromParam.startsWith(protocol))) {
    console.warn("Rejected unsafe redirect URL:", fromParam)
    return fallback
  }

  // Normalize: ensure path starts with /
  const normalizedPath = fromParam.startsWith("/") ? fromParam : `/${fromParam}`

  // Check against allowlist (exact match or prefix match for dynamic routes)
  const isAllowed = SAFE_REDIRECT_PATHS.some(
    (safePath) =>
      normalizedPath === safePath || normalizedPath.startsWith(`${safePath}/`),
  )

  if (isAllowed) {
    return normalizedPath
  }

  console.warn("Redirect path not in allowlist:", normalizedPath)
  return fallback
}
