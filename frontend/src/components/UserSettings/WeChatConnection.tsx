/**
 * WeChat Connection Settings Component
 *
 * Displays WeChat link status and allows users to link/unlink their WeChat account.
 */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  AlertCircle,
  CheckCircle2,
  Link2,
  LinkIcon,
  Loader2,
} from "lucide-react"
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
import { LoadingButton } from "@/components/ui/loading-button"
import useAuth from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"

const WECHAT_LOGIN_JS_URL =
  "https://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"
const QR_IFRAME_HEIGHT = "300px"

function setIframeHeight(
  container: HTMLDivElement | null,
  height: string,
): void {
  const iframe = container?.querySelector("iframe")
  if (iframe) {
    iframe.style.height = height
    iframe.setAttribute("height", height)
  }
}

function isWeChatPlaceholderEmail(email: string | undefined): boolean {
  return (
    !!email &&
    email.startsWith("wechat_") &&
    email.endsWith("@placeholder.local")
  )
}

function WeChatConnection() {
  const { t } = useTranslation()
  const queryClient = useQueryClient()
  const { showSuccessToast, showErrorToast } = useCustomToast()
  const { user: currentUser, invalidateCurrentUser } = useAuth()

  const [isLinking, setIsLinking] = useState(false)
  const [linkError, setLinkError] = useState<string | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const qrContainerRef = useRef<HTMLDivElement>(null)

  const { data: wechatLinkData, isLoading: isLoadingLinkStatus } = useQuery({
    queryKey: ["wechat-link-status"],
    queryFn: () => WechatLoginService.wechatLinkStatus(),
    retry: false,
    staleTime: 30 * 1000,
  })

  const hasWeChatLink = !!wechatLinkData
  const isPlaceholderEmail = isWeChatPlaceholderEmail(currentUser?.email)

  const {
    data: startData,
    isLoading: isLoadingStart,
    error: startError,
    refetch: refetchStart,
  } = useQuery({
    queryKey: ["wechat-link-start"],
    queryFn: () =>
      WechatLoginService.wechatLoginStart({
        requestBody: {
          action: "link",
          return_to: "/settings",
        },
      }),
    enabled: isLinking,
    retry: false,
    staleTime: 5 * 60 * 1000,
  })

  useEffect(() => {
    if (!startError) return

    const httpError = startError as { status?: number }
    const isDisabled = httpError.status === 403 || httpError.status === 404

    setLinkError(
      t(
        isDisabled
          ? "auth.wechat.featureDisabled"
          : "auth.wechat.providerUnavailable",
      ),
    )
    setIsLinking(false)
  }, [startError, t])

  const loadWxLoginScript = useCallback(() => {
    if (window.WxLogin) {
      setScriptLoaded(true)
      return
    }

    const script = document.createElement("script")
    script.src = WECHAT_LOGIN_JS_URL
    script.async = true
    script.onload = () => setScriptLoaded(true)
    script.onerror = () => {
      setLinkError(t("auth.wechat.providerUnavailable"))
      setIsLinking(false)
    }
    document.head.appendChild(script)
  }, [t])

  useEffect(() => {
    if (
      !isLinking ||
      !scriptLoaded ||
      !startData ||
      !qrContainerRef.current ||
      !window.WxLogin
    ) {
      return
    }

    // Use the redirect_uri provided by the backend (already contains action=link and from params)
    const redirectUri = startData.redirect_uri

    new window.WxLogin({
      id: "wechat-link-qr-container",
      appid: startData.appid,
      scope: startData.scope,
      redirect_uri: encodeURIComponent(redirectUri),
      state: startData.state,
      self_redirect: false,
      style: "black",
      onReady: (isReady: boolean) => {
        if (!isReady) {
          setLinkError(t("auth.wechat.providerUnavailable"))
          setIsLinking(false)
        }
      },
    })

    setTimeout(
      () => setIframeHeight(qrContainerRef.current, QR_IFRAME_HEIGHT),
      0,
    )
  }, [isLinking, scriptLoaded, startData, t])

  function handleStartLink() {
    setLinkError(null)
    setIsLinking(true)
    loadWxLoginScript()
    refetchStart()
  }

  function handleCancelLink() {
    setIsLinking(false)
    setLinkError(null)
  }

  const unlinkMutation = useMutation({
    mutationFn: () => WechatLoginService.wechatUnlink(),
    onSuccess: () => {
      showSuccessToast(t("auth.wechat.unlinkSuccess"))
      invalidateCurrentUser()
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
      queryClient.invalidateQueries({ queryKey: ["wechat-link-status"] })
    },
    onError: (error: unknown) => {
      const httpError = error as { body?: { detail?: string }; status?: number }
      const detail = httpError?.body?.detail?.toLowerCase() ?? ""

      if (httpError?.status === 400 && detail.includes("cannot unlink")) {
        showErrorToast(t("auth.wechat.unlinkBlocked"))
      } else if (httpError?.status === 404) {
        showErrorToast(t("auth.wechat.loginError"))
      } else {
        showErrorToast(t("errors.somethingWentWrong"))
      }
    },
  })

  function handleUnlink() {
    if (window.confirm(t("settings.connectedAccounts.unlinkConfirm"))) {
      unlinkMutation.mutate()
    }
  }

  if (isLoadingLinkStatus) {
    return (
      <div className="max-w-md">
        <h3 className="text-lg font-semibold py-4">
          {t("settings.connectedAccounts.title")}
        </h3>
        <Card>
          <CardContent className="flex items-center justify-center p-8">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-md" data-testid="wechat-connection-section">
      <h3 className="text-lg font-semibold py-4">
        {t("settings.connectedAccounts.title")}
      </h3>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LinkIcon className="h-5 w-5" />
            {t("settings.connectedAccounts.wechat")}
          </CardTitle>
          <CardDescription>
            {t(
              hasWeChatLink
                ? "settings.connectedAccounts.wechatConnected"
                : "settings.connectedAccounts.wechatNotConnected",
            )}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {linkError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>{t("common.error")}</AlertTitle>
              <AlertDescription>{linkError}</AlertDescription>
            </Alert>
          )}

          {isLinking ? (
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                {t("auth.wechat.scanQrCode")}
              </p>
              {isLoadingStart ? (
                <div className="flex items-center justify-center p-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div
                  ref={qrContainerRef}
                  id="wechat-link-qr-container"
                  className="flex items-center justify-center min-h-[300px]"
                  data-testid="wechat-qr-container"
                />
              )}
              <Button
                variant="outline"
                onClick={handleCancelLink}
                data-testid="wechat-cancel-link-btn"
              >
                {t("common.cancel")}
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {hasWeChatLink ? (
                <>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    <span
                      className="text-sm"
                      data-testid="wechat-linked-status"
                    >
                      {t("settings.connectedAccounts.linked")}
                    </span>
                  </div>
                  <LoadingButton
                    variant="outline"
                    size="sm"
                    onClick={handleUnlink}
                    loading={unlinkMutation.isPending}
                    disabled={unlinkMutation.isPending}
                    data-testid="wechat-unlink-btn"
                  >
                    {t("settings.connectedAccounts.unlink")}
                  </LoadingButton>
                </>
              ) : (
                <Button
                  variant="outline"
                  onClick={handleStartLink}
                  data-testid="wechat-link-btn"
                >
                  <Link2 className="mr-2 h-4 w-4" />
                  {t("settings.connectedAccounts.linkWechat")}
                </Button>
              )}
            </div>
          )}

          {isPlaceholderEmail && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>
                {t("settings.connectedAccounts.wechatOnlyAccount")}
              </AlertDescription>
            </Alert>
          )}

          {hasWeChatLink && wechatLinkData?.nickname && (
            <div className="mt-4 text-sm text-muted-foreground">
              <span>{t("settings.connectedAccounts.wechat")}: </span>
              <span className="font-medium">{wechatLinkData.nickname}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default WeChatConnection
