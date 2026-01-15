import { Globe } from "lucide-react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "@/hooks/useLocale"
import { SUPPORTED_LOCALES } from "@/lib/locale"

export function LocaleSwitcher() {
  const { t } = useTranslation()
  const { locale, setLocale } = useLocale()
  const currentLabel =
    SUPPORTED_LOCALES.find((l) => l.value === locale)?.label ?? locale

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="nav-locale-switcher"
          aria-label={t("common.selectLanguage")}
        >
          <Globe className="h-4 w-4" />
          <span className="sr-only">
            {t("common.currentLanguage", { language: currentLabel })}
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
  )
}
