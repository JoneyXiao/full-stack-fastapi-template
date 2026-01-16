import { Link, useRouterState } from "@tanstack/react-router"
import { ChevronDown, Globe, Menu, Monitor, Moon, Sun } from "lucide-react"
import { useState } from "react"
import { useTranslation } from "react-i18next"

import { type Theme, useTheme } from "@/components/theme-provider"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useLocale } from "@/hooks/useLocale"
import { SUPPORTED_LOCALES } from "@/lib/locale"
import { cn } from "@/lib/utils"
import { isNavItemActive } from "./isNavItemActive"
import type { NavItem } from "./navItems"

interface MobileMenuSheetProps {
  items: NavItem[]
}

export function MobileMenuSheet({ items }: MobileMenuSheetProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  const { locale, setLocale } = useLocale()
  const { theme, setTheme } = useTheme()

  const localeLabel =
    SUPPORTED_LOCALES.find((l) => l.value === locale)?.label ?? locale

  const themeLabels: Record<Theme, string> = {
    system: t("settings.theme.system"),
    light: t("settings.theme.light"),
    dark: t("settings.theme.dark"),
  }

  const ThemeIcon = { system: Monitor, light: Sun, dark: Moon }[theme]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden justify-start p-0 hover:bg-transparent"
          data-testid="nav-mobile-menu"
          aria-label={t("common.openMenu")}
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-72 sm:w-80 p-0"
        data-testid="nav-mobile-drawer"
      >
        <div className="flex h-full flex-col">
          <div className="sticky top-0 z-10 border-b bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <SheetHeader>
              <SheetTitle>{t("common.menu")}</SheetTitle>
            </SheetHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            <nav
              className="flex flex-col gap-1"
              aria-label={t("common.mobileNavigation")}
            >
              {items.map((item) => {
                const isActive = isNavItemActive(item.path, currentPath)
                const Icon = item.icon

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    data-testid={`nav-mobile-link-${item.path}`}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-[color,opacity]",
                      isActive
                        ? "text-foreground opacity-100 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-0.5 before:bg-primary"
                        : "text-muted-foreground opacity-90 hover:text-foreground hover:opacity-100",
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {t(item.titleKey, item.title)}
                  </Link>
                )
              })}
            </nav>

            <Separator className="my-4" />

            <Accordion type="single" collapsible defaultValue="preferences">
              <AccordionItem value="preferences">
                <AccordionTrigger className="py-3">
                  {t("settings.preferences")}
                </AccordionTrigger>
                <AccordionContent className="pb-2">
                  <div className="flex flex-col gap-2">
                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between"
                          data-testid="nav-mobile-locale-switcher"
                        >
                          <span className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            {t("settings.language")}
                          </span>
                          <span className="text-muted-foreground flex items-center gap-2">
                            {localeLabel}
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {SUPPORTED_LOCALES.map(({ value, label }) => (
                          <DropdownMenuItem
                            key={value}
                            onClick={() => setLocale(value)}
                            data-testid={`locale-${value}`}
                            className={locale === value ? "bg-accent" : ""}
                          >
                            {label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu modal={false}>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          className="w-full justify-between"
                          data-testid="nav-mobile-theme-switcher"
                        >
                          <span className="flex items-center gap-2">
                            <ThemeIcon className="h-4 w-4" />
                            {t("settings.theme.title")}
                          </span>
                          <span className="text-muted-foreground flex items-center gap-2">
                            {themeLabels[theme]}
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          data-testid="light-mode"
                          onClick={() => setTheme("light")}
                        >
                          <Sun className="mr-2 h-4 w-4" />
                          {t("settings.theme.light")}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          data-testid="dark-mode"
                          onClick={() => setTheme("dark")}
                        >
                          <Moon className="mr-2 h-4 w-4" />
                          {t("settings.theme.dark")}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setTheme("system")}>
                          <Monitor className="mr-2 h-4 w-4" />
                          {t("settings.theme.system")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="h-6" />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
