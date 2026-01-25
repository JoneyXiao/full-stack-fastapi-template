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
