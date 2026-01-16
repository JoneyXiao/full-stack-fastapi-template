import type { ReactElement, ReactNode } from "react"

import { Appearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
import { LocaleSwitcher } from "@/components/Nav/LocaleSwitcher"
import { Footer } from "./Footer"

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps): ReactElement {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted dark:bg-zinc-900 relative hidden lg:flex lg:items-center lg:justify-center">
        <Logo variant="full" className="text-6xl" asLink={false} />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        {/* Theme + locale controls for auth pages */}
        <div className="flex justify-end gap-2">
          <LocaleSwitcher />
          <Appearance />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
        <Footer />
      </div>
    </div>
  )
}
