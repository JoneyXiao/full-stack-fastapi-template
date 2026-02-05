import { AxiosError } from "axios"
import type { ComponentType } from "react"
import { GiFox } from "react-icons/gi"
import { PiGithubLogoDuotone } from "react-icons/pi"

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

export function isExternalUrl(url: string | null | undefined): boolean {
  return Boolean(url?.startsWith("http://") || url?.startsWith("https://"))
}

export function resolveApiUrl(
  path: string | null | undefined,
): string | undefined {
  if (!path) return undefined
  if (isExternalUrl(path)) return path
  const base = OpenAPI.BASE?.replace(/\/$/, "")
  if (!base) return path
  const normalizedPath = path.startsWith("/") ? path : `/${path}`
  return `${base}${normalizedPath}`
}

export const DEFAULT_AVATAR = "/assets/images/default_avatar.webp"

/**
 * Determines optimal image fit based on aspect ratio.
 * Very wide/tall images (logos) use "contain", standard images use "cover".
 */
export function calculateImageFit(
  width: number,
  height: number,
): "cover" | "contain" {
  if (!width || !height) return "cover"
  const ratio = width / height
  return ratio > 2.3 || ratio < 0.75 ? "contain" : "cover"
}

/**
 * Extracts hostname from URL, removing "www." prefix.
 */
export function safeHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return undefined
  }
}

/**
 * Returns appropriate icon component based on resource destination URL.
 */
export function getResourceIcon(
  destinationUrl?: string | null,
): ComponentType<{ className?: string }> {
  const host = destinationUrl ? safeHostname(destinationUrl) : undefined
  return host === "github.com" ? PiGithubLogoDuotone : GiFox
}
