import { zodResolver } from "@hookform/resolvers/zod"
import {
  createFileRoute,
  Link as RouterLink,
  redirect,
} from "@tanstack/react-router"
import { X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useTranslation } from "react-i18next"
import { SiWechat } from "react-icons/si"
import { z } from "zod"

import type { Body_login_login_access_token as AccessToken } from "@/client"
import { WeChatQrLogin } from "@/components/Auth"
import { AuthLayout } from "@/components/Common/AuthLayout"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoadingButton } from "@/components/ui/loading-button"
import { PasswordInput } from "@/components/ui/password-input"
import { Separator } from "@/components/ui/separator"
import useAuth, { isLoggedIn } from "@/hooks/useAuth"
import useCustomToast from "@/hooks/useCustomToast"
import useDocumentTitle from "@/hooks/useDocumentTitle"

const formSchema = z.object({
  username: z.email(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(8, { message: "Password must be at least 8 characters" }),
}) satisfies z.ZodType<AccessToken>

type FormData = z.infer<typeof formSchema>

export const Route = createFileRoute("/login")({
  component: Login,
  beforeLoad: async () => {
    if (isLoggedIn()) {
      throw redirect({
        to: "/resources",
      })
    }
  },
})

function Login() {
  const { t } = useTranslation()
  const { loginMutation } = useAuth()
  const { showWarningToast } = useCustomToast()
  useDocumentTitle("auth.loginTitle")
  const [wechatDisabled, setWechatDisabled] = useState(false)
  const [isWeChatQrOpen, setIsWeChatQrOpen] = useState(false)
  const wechatContainerRef = useRef<HTMLDivElement>(null)

  /** Rate-limit window in ms for the "provider unavailable" toast */
  const WECHAT_TOAST_DEBOUNCE_MS = 2000

  /**
   * Show the "provider unavailable" warning toast with rate limiting.
   */
  const showWechatUnavailableToast = () => {
    showWarningToast(t("auth.wechat.providerUnavailable"), {
      debounceMs: WECHAT_TOAST_DEBOUNCE_MS,
      rateLimitKey: "wechat-unavailable",
    })
  }

  /**
   * Handler when the WeChat button is clicked.
   * If provider is disabled, shows a toast and does not open the QR popup.
   */
  const handleWechatClick = () => {
    if (wechatDisabled) {
      showWechatUnavailableToast()
      return
    }
    setIsWeChatQrOpen((prev) => !prev)
  }

  /**
   * Callback fired by WeChatQrLogin when the backend reports the provider is
   * unavailable (e.g., HTTP 403). Closes the QR popup and marks provider disabled.
   */
  const handleWechatDisabled = () => {
    setWechatDisabled(true)
    setIsWeChatQrOpen(false)
    showWechatUnavailableToast()
  }

  // Close QR popup when clicking outside or pressing Escape
  useEffect(() => {
    if (!isWeChatQrOpen) return

    function handleClickOutside(event: MouseEvent): void {
      if (
        wechatContainerRef.current &&
        !wechatContainerRef.current.contains(event.target as Node)
      ) {
        setIsWeChatQrOpen(false)
      }
    }

    function handleEscapeKey(event: KeyboardEvent): void {
      if (event.key === "Escape") {
        setIsWeChatQrOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscapeKey)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscapeKey)
    }
  }, [isWeChatQrOpen])

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues: {
      username: "",
      password: "",
    },
  })

  function onSubmit(data: FormData): void {
    if (loginMutation.isPending) return
    loginMutation.mutate(data)
  }

  return (
    <AuthLayout>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col items-center gap-2 text-center">
            <h1 className="text-2xl font-bold">{t("auth.welcomeBack")}</h1>
          </div>

          <div className="grid gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("auth.email")}</FormLabel>
                  <FormControl>
                    <Input
                      data-testid="email-input"
                      placeholder="user@example.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>{t("auth.password")}</FormLabel>
                    <RouterLink
                      to="/recover-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {t("auth.forgotPassword")}
                    </RouterLink>
                  </div>
                  <FormControl>
                    <PasswordInput
                      data-testid="password-input"
                      placeholder={t("auth.password")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <LoadingButton type="submit" loading={loginMutation.isPending}>
              {t("auth.login")}
            </LoadingButton>
          </div>

          {/* WeChat Login Section - always visible per FR-006 */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {t("auth.or")}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <div ref={wechatContainerRef} className="relative">
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="size-10 rounded-full border-muted-foreground/20 bg-background shadow-xs transition-colors hover:border-emerald-500/40 hover:bg-emerald-500/10"
                aria-label="WeChat"
                aria-expanded={isWeChatQrOpen}
                aria-controls="wechat-login-qr"
                data-testid="wechat-login-button"
                onClick={handleWechatClick}
              >
                <SiWechat className="size-5 text-emerald-600 dark:text-emerald-400" />
              </Button>

              {isWeChatQrOpen && !wechatDisabled && (
                <section
                  id="wechat-login-qr"
                  aria-label="WeChat QR login"
                  className="absolute bottom-[calc(100%+1rem)] left-1/2 z-50 w-[min(22rem,calc(100vw-2rem))] -translate-x-1/2 rounded-lg border bg-background p-4 shadow-lg animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2 motion-reduce:animate-none"
                >
                  {/* Close button */}
                  <button
                    type="button"
                    className="absolute right-2 top-2 rounded-sm p-1 text-muted-foreground opacity-70 transition-opacity hover:opacity-100"
                    onClick={() => setIsWeChatQrOpen(false)}
                    aria-label={t("common.close")}
                  >
                    <X className="size-4" />
                  </button>

                  <WeChatQrLogin
                    className="p-0"
                    onDisabled={handleWechatDisabled}
                  />

                  {/* Arrow indicator */}
                  <div className="absolute -bottom-2 left-1/2 size-4 -translate-x-1/2 rotate-45 border-b border-r border-border bg-background" />
                </section>
              )}
            </div>
          </div>

          <div className="text-center text-sm">
            {t("auth.dontHaveAccount")}{" "}
            <RouterLink to="/signup" className="underline underline-offset-4">
              {t("auth.signUpNow")}
            </RouterLink>
          </div>
        </form>
      </Form>
    </AuthLayout>
  )
}
