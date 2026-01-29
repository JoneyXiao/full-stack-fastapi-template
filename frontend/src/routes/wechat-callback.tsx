/**
 * WeChat OAuth Callback Route
 *
 * Handles the callback from WeChat OAuth authorization.
 * Receives code and state parameters, completes the login/link flow.
 *
 * Query params:
 * - code: OAuth authorization code from WeChat
 * - state: CSRF protection token
 * - action: "login" (default) or "link" to indicate intent
 * - from: Safe relative path for post-callback redirect (validated via allowlist)
 */

import { useQueryClient } from "@tanstack/react-query"
import { createFileRoute, useNavigate } from "@tanstack/react-router"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"

import { WechatLoginService } from "@/client/sdk.gen"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useAuth from "@/hooks/useAuth"
import { getSafeRedirectPath } from "@/utils"

type ErrorCategory =
  | "missing_code"
  | "missing_state"
  | "state_error"
  | "code_error"
  | "provider_unavailable"
  | "already_linked_other"
  | "already_linked_self"
  | "network_error"
  | "unknown"

interface CallbackSearchParams {
  code?: string
  state?: string
  action?: "link" | "login"
  from?: string
}

export const Route = createFileRoute("/wechat-callback")({
  component: WeChatCallbackPage,
  validateSearch: (search: Record<string, unknown>): CallbackSearchParams => ({
    code: search.code as string | undefined,
    state: search.state as string | undefined,
    action: search.action as "link" | "login" | undefined,
    from: search.from as string | undefined,
  }),
})

function categorizeError(error: unknown): ErrorCategory {
  const httpError = error as {
    body?: { detail?: string }
    status?: number
  }
  const detail = httpError?.body?.detail?.toLowerCase() ?? ""
  const statusCode = httpError?.status

  if (detail.includes("state")) return "state_error"
  if (detail.includes("code")) return "code_error"
  if (statusCode === 409) {
    return detail.includes("already linked to another")
      ? "already_linked_other"
      : "already_linked_self"
  }
  if (statusCode === 502 || detail.includes("unavailable"))
    return "provider_unavailable"
  if (statusCode === 0 || detail.includes("network")) return "network_error"

  return "unknown"
}

const ERROR_MESSAGE_MAP: Record<ErrorCategory, string> = {
  missing_code: "auth.wechat.missingCode",
  missing_state: "auth.wechat.missingState",
  state_error: "auth.wechat.stateError",
  code_error: "auth.wechat.codeError",
  provider_unavailable: "auth.wechat.providerUnavailable",
  already_linked_other: "auth.wechat.alreadyLinkedOther",
  already_linked_self: "auth.wechat.alreadyLinkedSelf",
  network_error: "auth.wechat.networkError",
  unknown: "auth.wechat.loginError",
}

function WeChatCallbackPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { storeToken, invalidateCurrentUser } = useAuth()

  const { code, state, action, from } = Route.useSearch()
  const isLinkFlow = action === "link"

  // Determine safe redirect destinations based on action and from param
  const linkSuccessRedirect = getSafeRedirectPath(from, "/settings")
  const loginSuccessRedirect = getSafeRedirectPath(from, "/")

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  )
  const [errorCategory, setErrorCategory] = useState<ErrorCategory | null>(null)
  const processedRef = useRef(false)

  const handleSuccess = useCallback(
    async (redirectTo: string) => {
      await invalidateCurrentUser()
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      if (isLinkFlow) {
        queryClient.invalidateQueries({ queryKey: ["wechat-link-status"] })
      }
      setStatus("success")
      setTimeout(() => navigate({ to: redirectTo }), 1500)
    },
    [invalidateCurrentUser, queryClient, navigate, isLinkFlow],
  )

  const handleError = useCallback((error: unknown) => {
    setStatus("error")
    setErrorCategory(categorizeError(error))
  }, [])

  const processCallback = useCallback(
    async (authCode: string, authState: string) => {
      try {
        if (isLinkFlow) {
          await WechatLoginService.wechatLink({
            requestBody: { code: authCode, state: authState },
          })
          await handleSuccess(linkSuccessRedirect)
        } else {
          const response = await WechatLoginService.wechatLoginComplete({
            requestBody: { code: authCode, state: authState },
          })
          storeToken(response.access_token)
          await handleSuccess(loginSuccessRedirect)
        }
      } catch (error) {
        handleError(error)
      }
    },
    [
      isLinkFlow,
      storeToken,
      handleSuccess,
      handleError,
      linkSuccessRedirect,
      loginSuccessRedirect,
    ],
  )

  useEffect(() => {
    if (processedRef.current) return
    processedRef.current = true

    // Distinguish between missing code and missing state for clearer error messages
    if (!code && !state) {
      setStatus("error")
      setErrorCategory("missing_code") // Both missing - show code error as primary
      return
    }
    if (!code) {
      setStatus("error")
      setErrorCategory("missing_code")
      return
    }
    if (!state) {
      setStatus("error")
      setErrorCategory("missing_state")
      return
    }

    processCallback(code, state)
  }, [code, state, processCallback])

  function handleRetry() {
    navigate({ to: isLinkFlow ? "/settings" : "/login" })
  }

  function getStatusDescription(): string {
    if (status === "loading") {
      return t("auth.wechat.pleaseWait")
    }
    if (status === "error") {
      return t("auth.wechat.loginFailed")
    }
    if (isLinkFlow) {
      return t("auth.wechat.linkSuccess")
    }
    return t("auth.wechat.loginSuccess")
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>
            {isLinkFlow
              ? t("auth.wechat.linkingAccount")
              : t("auth.wechat.loggingIn")}
          </CardTitle>
          <CardDescription>{getStatusDescription()}</CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center gap-4">
          {status === "loading" && (
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          )}

          {status === "success" && (
            <>
              <CheckCircle2 className="h-12 w-12 text-green-600" />
              <p className="text-sm text-muted-foreground">
                {t("auth.wechat.redirecting")}
              </p>
            </>
          )}

          {status === "error" && errorCategory && (
            <>
              <AlertCircle className="h-12 w-12 text-destructive" />
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("common.error")}</AlertTitle>
                <AlertDescription>
                  {t(ERROR_MESSAGE_MAP[errorCategory])}
                </AlertDescription>
              </Alert>

              {errorCategory === "already_linked_other" && (
                <Alert>
                  <AlertDescription>
                    {t("auth.wechat.linkConflictGuidance")}
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleRetry}>
                  {t("common.tryAgain")}
                </Button>
                <Button variant="ghost" onClick={() => navigate({ to: "/" })}>
                  {t("common.goHome")}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
