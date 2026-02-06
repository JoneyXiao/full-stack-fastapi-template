import type { ReactElement, ReactNode } from "react"
import { useTranslation } from "react-i18next"
import { GiFox } from "react-icons/gi"

import { Appearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
import { LocaleSwitcher } from "@/components/Nav/LocaleSwitcher"
import { Footer } from "./Footer"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps): ReactElement {
  const { t } = useTranslation()

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      {/* ── Left panel: Branded showcase ─────────────────────────── */}
      <div className="relative hidden overflow-hidden bg-muted dark:bg-zinc-950 lg:flex lg:flex-col lg:items-center lg:justify-center">
        {/* Ambient glow orbs */}
        <div
          className="absolute -top-20 -left-20 h-[28rem] w-[28rem] rounded-full bg-primary/15 dark:bg-primary/20 blur-[120px]"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-primary/10 dark:bg-primary/15 blur-[100px]"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/3 right-1/4 h-48 w-48 rounded-full bg-primary/8 dark:bg-primary/10 blur-[80px]"
          aria-hidden="true"
        />

        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem]"
          aria-hidden="true"
        />

        {/* Main content */}
        <div className="relative z-10 flex max-w-md flex-col items-center gap-8 px-12 text-center">
          {/* Fox icon with ambient glow */}
          <div className="relative">
            <div
              className="absolute inset-0 scale-150 rounded-full bg-primary/20 blur-2xl"
              aria-hidden="true"
            />
            <GiFox
              className="relative size-20 text-primary drop-shadow-lg"
              aria-hidden="true"
            />
          </div>

          {/* Brand text */}
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground dark:text-white">
              {t("landing.logo.title")}
            </h1>
            <p className="truncate text-base text-muted-foreground dark:text-zinc-400">
              {t("landing.heroDescription")}
            </p>
          </div>

          {/* Feature indicators */}
          <div className="flex flex-col items-start gap-3 text-sm text-muted-foreground dark:text-zinc-500">
            {(
              [
                "landing.heroFeatures.guided",
                "landing.heroFeatures.fastSearch",
                "landing.heroFeatures.community",
              ] as const
            ).map((key) => (
              <div key={key} className="flex items-center gap-2.5">
                <div className="size-1.5 rounded-full bg-primary/70" />
                <span>{t(key)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom gradient fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-muted dark:from-zinc-950 to-transparent"
          aria-hidden="true"
        />
      </div>

      {/* ── Right panel: Form area ───────────────────────────────── */}
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Top bar: mobile logo + controls */}
        <div className="flex items-center justify-between">
          <div className="lg:hidden">
            <Logo variant="full" className="text-xl" />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <LocaleSwitcher />
            <Appearance />
          </div>
        </div>

        {/* Form container */}
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>

        <Footer />
      </div>
    </div>
  )
}
