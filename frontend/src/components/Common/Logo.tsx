import { Link } from "@tanstack/react-router"
import type { ReactElement } from "react"
import { useTranslation } from "react-i18next"
import { GiFox } from "react-icons/gi"
import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "icon" | "responsive"
  className?: string
  asLink?: boolean
}

export function Logo({
  variant = "full",
  className,
  asLink = true,
}: LogoProps): ReactElement {
  let content: ReactElement
  const { t } = useTranslation()
  switch (variant) {
    case "responsive":
      content = (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <GiFox className="shrink-0 size-[2em]" aria-hidden="true" />
          <span className="text-lg font-medium leading-none group-data-[collapsible=icon]:hidden">
            {t("landing.logo.title")}
          </span>
        </span>
      )
      break
    case "icon":
      content = (
        <span className={cn("inline-flex items-center", className)}>
          <GiFox className="size-[2em]" aria-hidden="true" />
          <span className="sr-only">{t("landing.logo.title")}</span>
        </span>
      )
      break
    default:
      content = (
        <span className={cn("inline-flex items-center gap-2 pr-2", className)}>
          <GiFox
            className="shrink-0 size-[2em] text-primary"
            aria-hidden="true"
          />
          <span className="text-lg font-medium leading-none text-primary">
            {t("landing.logo.title")}
          </span>
        </span>
      )
  }

  if (!asLink) {
    return content
  }

  return <Link to="/">{content}</Link>
}
