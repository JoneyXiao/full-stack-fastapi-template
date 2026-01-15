/**
 * Localized API error normalization/mapping.
 *
 * Maps common API error patterns to i18n translation keys.
 * Used by toast notifications and error display components.
 */

import i18n from "i18next"

/**
 * Common API error patterns and their translation keys.
 */
const ERROR_PATTERNS: Array<{
  pattern: RegExp | string
  key: string
}> = [
  // Authentication errors
  { pattern: /incorrect password/i, key: "auth.invalidCredentials" },
  { pattern: /invalid credentials/i, key: "auth.invalidCredentials" },
  { pattern: /user not found/i, key: "auth.invalidCredentials" },
  { pattern: /email already exists/i, key: "auth.emailInUse" },
  { pattern: /user with this email already exists/i, key: "auth.emailInUse" },

  // Validation errors
  { pattern: /field required/i, key: "errors.validationError" },
  { pattern: /invalid email/i, key: "auth.invalidEmail" },
  { pattern: /password.*short/i, key: "auth.passwordTooShort" },
  { pattern: /passwords.*match/i, key: "auth.passwordsDoNotMatch" },

  // Authorization errors
  { pattern: /not authorized/i, key: "errors.unauthorized" },
  { pattern: /unauthorized/i, key: "errors.unauthorized" },
  { pattern: /forbidden/i, key: "errors.forbidden" },
  { pattern: /access denied/i, key: "errors.forbidden" },

  // Session errors
  { pattern: /token.*expired/i, key: "errors.sessionExpired" },
  { pattern: /session.*expired/i, key: "errors.sessionExpired" },
  { pattern: /invalid token/i, key: "errors.sessionExpired" },

  // Network/Server errors
  { pattern: /network error/i, key: "errors.networkError" },
  { pattern: /server error/i, key: "errors.serverError" },
  { pattern: /internal server/i, key: "errors.serverError" },
]

/**
 * Attempts to map an API error message to a localized translation.
 * Returns the original message if no mapping is found.
 *
 * @param errorMessage - The raw error message from the API
 * @returns Localized error message or the original if no mapping found
 */
export function localizeError(errorMessage: string): string {
  if (!errorMessage) {
    return i18n.t("errors.somethingWentWrong")
  }

  for (const { pattern, key } of ERROR_PATTERNS) {
    const matches =
      typeof pattern === "string"
        ? errorMessage.toLowerCase().includes(pattern.toLowerCase())
        : pattern.test(errorMessage)

    if (matches) {
      return i18n.t(key)
    }
  }

  // Return original message if no pattern matches
  // This preserves specific error details from the API
  return errorMessage
}

/**
 * Wraps localizeError for use in error handlers.
 * Can be extended to add additional context or formatting.
 */
export function getLocalizedErrorMessage(error: unknown): string {
  if (typeof error === "string") {
    return localizeError(error)
  }

  if (error instanceof Error) {
    return localizeError(error.message)
  }

  return i18n.t("errors.somethingWentWrong")
}
