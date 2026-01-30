/**
 * WeChat QR Login Component
 *
 * Embeds the WeChat QR code login experience using the official wxLogin.js script.
 * This component:
 * 1. Calls the backend to get QR rendering parameters
 * 2. Loads the WeChat wxLogin.js script
 * 3. Renders the QR code iframe
 *
 * When user scans the QR and authorizes, WeChat redirects to our callback route
 * with code and state parameters.
 */

import { useQuery } from "@tanstack/react-query"
import { AlertCircle, Loader2 } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { WechatLoginService } from "@/client/sdk.gen"

interface WeChatQrLoginProps {
  /** Container ID for the QR code */
  containerId?: string
  /** CSS class for the container */
  className?: string
  /** Callback when QR fails to load */
  onError?: (error: Error) => void
  /** Callback when WeChat is disabled on backend */
  onDisabled?: () => void
}

declare global {
  interface Window {
    WxLogin?: new (config: WxLoginConfig) => undefined
  }
}

/**
 * WeChat WxLogin configuration parameters.
 * @see https://developers.weixin.qq.com/doc/oplatform/Website_App/WeChat_Login/Wechat_Login.html
 */
interface WxLoginConfig {
  /** Container element ID for the QR code iframe */
  id: string
  /** App ID from WeChat Open Platform */
  appid: string
  /** Authorization scope - must be "snsapi_login" for website apps */
  scope: string
  /** URL-encoded redirect URI (must match WeChat platform configuration) */
  redirect_uri: string
  /** CSRF protection token (recommended) */
  state: string
  /** If true, redirect happens in iframe; if false, in top window. Default: false */
  self_redirect?: boolean
  /** Text style: "black" or "white". Default: "black" */
  style?: string
  /** Custom CSS URL to override default styles (only when stylelite != 1) */
  href?: string
  /** Set to 1 to use new QR code style */
  stylelite?: number
  /** Set to 0 to disable fast login feature */
  fast_login?: number
  /** Theme: "light", "dark", or "auto" (follows system) */
  color_scheme?: "light" | "dark" | "auto"
  /** Callback when iframe loads. isReady=true means successful */
  onReady?: (isReady: boolean) => void
  /** Callback when QR code is ready */
  onQRcodeReady?: () => void
}

const QR_IFRAME_HEIGHT = "300px"

function setIframeHeight(
  container: HTMLDivElement | null,
  height: string,
): void {
  if (!container) return
  const iframe = container.querySelector("iframe")
  if (!iframe) return
  iframe.style.height = height
  iframe.setAttribute("height", height)
}

export function WeChatQrLogin({
  containerId = "wechat-qr-container",
  className = "",
  onError,
  onDisabled,
}: WeChatQrLoginProps) {
  const { t } = useTranslation()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState<string | null>(null)

  // Fetch QR parameters from backend
  const {
    data: startData,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["wechat-login-start"],
    queryFn: () => WechatLoginService.wechatLoginStart(),
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes (matches state TTL)
  })

  // Handle 403/404 (WeChat disabled)
  useEffect(() => {
    if (isError && error) {
      const httpError = error as { status?: number }
      if (httpError.status === 403 || httpError.status === 404) {
        onDisabled?.()
      } else {
        onError?.(error as Error)
      }
    }
  }, [isError, error, onDisabled, onError])

  // Load wxLogin.js script
  const loadWxLoginScript = useCallback(
    (scriptUrl: string) => {
      // Check if script already loaded
      if (window.WxLogin) {
        setScriptLoaded(true)
        return
      }

      const script = document.createElement("script")
      script.src = scriptUrl
      script.async = true
      script.onload = () => setScriptLoaded(true)
      script.onerror = () => {
        setScriptError(t("auth.wechat.loginError"))
        onError?.(new Error("Failed to load WeChat login script"))
      }
      document.head.appendChild(script)
    },
    [t, onError],
  )

  // Initialize QR when data and script are ready
  useEffect(() => {
    if (!startData || !scriptLoaded || !containerRef.current) return

    if (!window.WxLogin) {
      setScriptError(t("auth.wechat.loginError"))
      return
    }

    // Clear any existing content
    containerRef.current.innerHTML = ""

    // Initialize WeChat QR
    try {
      new window.WxLogin({
        id: containerId,
        appid: startData.appid,
        scope: startData.scope,
        redirect_uri: encodeURIComponent(startData.redirect_uri),
        state: startData.state,
        self_redirect: false,
        style: "black",
        onReady: (isReady: boolean) => {
          if (!isReady) {
            setScriptError(t("auth.wechat.loginError"))
            onError?.(new Error("WeChat QR iframe failed to load"))
          }
        },
      })
      setTimeout(() => {
        setIframeHeight(containerRef.current, QR_IFRAME_HEIGHT)
      }, 0)
    } catch (err) {
      setScriptError(t("auth.wechat.loginError"))
      onError?.(err as Error)
    }
  }, [startData, scriptLoaded, containerId, t, onError])

  // Load script when we have the URL
  useEffect(() => {
    if (startData?.wx_login_js_url) {
      loadWxLoginScript(startData.wx_login_js_url)
    }
  }, [startData?.wx_login_js_url, loadWxLoginScript])

  // Loading state
  if (isLoading) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 ${className}`}
      >
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        <p className="mt-2 text-sm text-muted-foreground">
          {t("auth.wechat.loginLoading")}
        </p>
      </div>
    )
  }

  // Error state (WeChat disabled handled by parent via onDisabled)
  if (scriptError || (isError && error)) {
    return (
      <div
        className={`flex flex-col items-center justify-center p-8 ${className}`}
      >
        <AlertCircle className="h-8 w-8 text-destructive" />
        <p className="mt-2 text-sm text-destructive">
          {scriptError || t("auth.wechat.loginError")}
        </p>
      </div>
    )
  }

  return (
    <div
      className={`flex flex-col items-center ${className}`}
      data-testid="wechat-qr-login"
    >
      <p className="mb-4 text-sm text-muted-foreground">
        {t("auth.wechat.scanQrCode")}
      </p>
      <div
        id={containerId}
        ref={containerRef}
        className="min-h-[200px] min-w-[200px]"
        data-testid="wechat-qr-container"
      />
    </div>
  )
}
