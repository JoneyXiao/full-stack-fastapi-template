import { Link } from "@tanstack/react-router"
import type { ReactElement } from "react"
import { useEffect, useRef, useState } from "react"

import { Appearance } from "@/components/Common/Appearance"
import { Logo } from "@/components/Common/Logo"
import useAuth from "@/hooks/useAuth"
import { cn } from "@/lib/utils"
import { AuthControls } from "./AuthControls"
import { ChatDialog } from "./ChatDialog"
import { LocaleSwitcher } from "./LocaleSwitcher"
import { LowerNav } from "./LowerNav"
import { MobileMenuSheet } from "./MobileMenuSheet"
import { NavPrimaryActions } from "./NavPrimaryActions"
import { getNavItems } from "./navItems"
import { SearchDialog } from "./SearchDialog"

interface AppNavbarProps {
  className?: string
}

export function AppNavbar({ className }: AppNavbarProps): ReactElement {
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const searchTriggerRef = useRef<HTMLDivElement>(null)
  const chatButtonRef = useRef<HTMLButtonElement>(null)
  const wasSearchOpenRef = useRef(false)
  const wasChatOpenRef = useRef(false)

  const navItems = getNavItems(!!user, user?.is_superuser ?? false)

  // Keyboard shortcut: ⌘+K or Ctrl+K to open search
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [])

  // Restore focus to the chat trigger when the dialog closes (accessibility + tests).
  useEffect(() => {
    if (wasChatOpenRef.current && !chatOpen) {
      // Defer to next frame so Radix can finish unmounting.
      requestAnimationFrame(() => chatButtonRef.current?.focus())
    }
    wasChatOpenRef.current = chatOpen
  }, [chatOpen])

  // Restore focus to the search trigger when the dialog closes (accessibility + tests).
  useEffect(() => {
    if (wasSearchOpenRef.current && !searchOpen) {
      requestAnimationFrame(() => searchTriggerRef.current?.focus())
    }
    wasSearchOpenRef.current = searchOpen
  }, [searchOpen])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
      data-testid="app-navbar"
    >
      {/* Upper Row */}
      <div className="px-6 md:px-8">
        <div className="mx-auto max-w-7xl md:border-b">
          <div className="flex flex-wrap items-center justify-between gap-y-2 py-3 md:h-16 md:py-0">
            {/* Left: Logo + Mobile Menu */}
            <div className="order-1 flex flex-1 items-center gap-2 md:flex-none">
              <MobileMenuSheet items={navItems} />
            </div>

            {/* Center: Logo (centered on small screens) */}
            <div className="order-2 flex items-center justify-center md:order-1 md:ml-2">
              <Link to="/" data-testid="nav-logo">
                <Logo variant="full" asLink={false} className="p-2" />
              </Link>
            </div>

            {/* Center: Search + Chat triggers */}
            <div className="order-4 w-full md:order-2 md:w-auto md:flex-1 md:flex md:justify-center">
              <NavPrimaryActions
                onSearchClick={() => setSearchOpen(true)}
                onChatClick={() => setChatOpen(true)}
                chatButtonRef={chatButtonRef}
                searchTriggerRef={searchTriggerRef}
              />
            </div>

            {/* Right: Locale, Theme, Auth */}
            <div className="order-3 flex flex-1 items-center justify-end gap-2 md:order-3 md:flex-none">
              <div className="hidden md:flex items-center gap-1">
                <LocaleSwitcher />
                <div data-testid="nav-theme-switcher">
                  <Appearance />
                </div>
              </div>
              <AuthControls />
            </div>
          </div>
        </div>
      </div>

      {/* Lower Row - Desktop only */}
      <div className="px-6 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="hidden md:flex h-12 items-center">
            <LowerNav items={navItems} />
          </div>
        </div>
      </div>

      {/* Search Dialog */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />

      {/* Chat Dialog */}
      <ChatDialog open={chatOpen} onOpenChange={setChatOpen} />
    </header>
  )
}
