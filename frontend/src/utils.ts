import { AxiosError } from "axios"
import type { ApiError } from "./client"
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

export const handleError = function (
  this: (msg: string) => void,
  err: ApiError,
) {
  const errorMessage = extractErrorMessage(err)
  this(errorMessage)
}

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}
