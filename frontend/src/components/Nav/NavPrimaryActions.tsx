import { MessageSquare, Search } from "lucide-react"
import type { KeyboardEvent, Ref } from "react"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"

interface NavPrimaryActionsProps {
  onSearchClick: () => void
  onChatClick: () => void
  chatButtonRef?: Ref<HTMLButtonElement>
  searchTriggerRef?: Ref<HTMLDivElement>
}

export function NavPrimaryActions({
  onSearchClick,
  onChatClick,
  chatButtonRef,
  searchTriggerRef,
}: NavPrimaryActionsProps) {
  const { t } = useTranslation()

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSearchClick()
    }
  }

  return (
    <div className="flex items-center gap-2">
      {/* Search Input - Neon style */}
      <InputGroup
        className="w-48 cursor-pointer sm:w-64 lg:w-80"
        onClick={onSearchClick}
        onKeyDown={handleSearchKeyDown}
        role="button"
        tabIndex={0}
        aria-label={t("nav.openSearch")}
        data-testid="nav-search-trigger"
        ref={searchTriggerRef}
      >
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder={t("search.placeholder")}
          readOnly
          className="cursor-pointer"
        />
        <InputGroupAddon align="inline-end">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </InputGroupAddon>
      </InputGroup>

      {/* AI Chat Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={onChatClick}
        ref={chatButtonRef}
        data-testid="nav-chat-trigger"
        className="gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">{t("nav.askAi")}</span>
      </Button>
    </div>
  )
}
