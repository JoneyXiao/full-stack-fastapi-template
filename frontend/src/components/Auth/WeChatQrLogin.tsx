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

interface WxLoginConfig {
  self_redirect: boolean
  id: string
  appid: string
  scope: string
  redirect_uri: string
  state: string
  style?: string
  href?: string
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
        self_redirect: false,
        id: containerId,
        appid: startData.appid,
        scope: startData.scope,
        redirect_uri: encodeURIComponent(startData.redirect_uri),
        state: startData.state,
        style: "black",
        href: "", // Custom CSS URL if needed
      })
      window.setTimeout(() => {
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

export default WeChatQrLogin
