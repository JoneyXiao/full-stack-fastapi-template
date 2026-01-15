import { Link } from "@tanstack/react-router"
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

export function AppNavbar({ className }: AppNavbarProps) {
  const { user } = useAuth()
  const [searchOpen, setSearchOpen] = useState(false)
  const [chatOpen, setChatOpen] = useState(false)
  const chatButtonRef = useRef<HTMLButtonElement>(null)
  const wasChatOpenRef = useRef(false)

  const navItems = getNavItems(!!user, user?.is_superuser ?? false)

  // Keyboard shortcut: ⌘+K or Ctrl+K to open search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
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
          <div className="flex h-16 items-center justify-between">
            {/* Left: Logo + Mobile Menu */}
            <div className="flex items-center gap-2">
              <MobileMenuSheet items={navItems} />
              <Link to="/" data-testid="nav-logo">
                <Logo variant="full" asLink={false} />
              </Link>
            </div>

            {/* Center: Search + Chat triggers */}
            <NavPrimaryActions
              onSearchClick={() => setSearchOpen(true)}
              onChatClick={() => setChatOpen(true)}
              chatButtonRef={chatButtonRef}
            />

            {/* Right: Locale, Theme, Auth */}
            <div className="flex items-center gap-1">
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
