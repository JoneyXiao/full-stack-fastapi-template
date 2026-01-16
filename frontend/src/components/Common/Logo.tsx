import { Link } from "@tanstack/react-router"
import type { ReactElement } from "react"
import { FaSkyatlas } from "react-icons/fa"

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

  switch (variant) {
    case "responsive":
      content = (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <FaSkyatlas className="shrink-0 size-[2em]" aria-hidden="true" />
          <span className="text-lg font-semibold leading-none group-data-[collapsible=icon]:hidden">
            Yunxi AI
          </span>
        </span>
      )
      break
    case "icon":
      content = (
        <span className={cn("inline-flex items-center", className)}>
          <FaSkyatlas className="size-[2em]" aria-hidden="true" />
          <span className="sr-only">Yunxi AI</span>
        </span>
      )
      break
    default:
      content = (
        <span className={cn("inline-flex items-center gap-2", className)}>
          <FaSkyatlas
            className="shrink-0 size-[2em] text-primary"
            aria-hidden="true"
          />
          <span className="text-lg font-semibold leading-none text-primary">
            Yunxi AI
          </span>
        </span>
      )
  }

  if (!asLink) {
    return content
  }

  return <Link to="/">{content}</Link>
}
