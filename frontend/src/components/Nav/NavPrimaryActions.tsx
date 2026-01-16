import { Search } from "lucide-react"
import type { KeyboardEvent, ReactElement, Ref } from "react"
import { useTranslation } from "react-i18next"
import { RiChatSmileAiLine } from "react-icons/ri"

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
}: NavPrimaryActionsProps): ReactElement {
  const { t } = useTranslation()

  function handleSearchKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
    if (event.key !== "Enter" && event.key !== " ") return
    event.preventDefault()
    onSearchClick()
  }

  return (
    <div className="flex w-full items-center justify-center gap-2">
      {/* Search Input - Neon style */}
      <InputGroup
        className="w-full max-w-xs cursor-pointer sm:max-w-md lg:max-w-lg"
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
          className="cursor-pointer text-xs font-normal text-muted-foreground"
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
        <RiChatSmileAiLine className="h-4 w-4 text-muted-foreground" />
        <span className="hidden sm:inline font-normal text-muted-foreground">
          {t("nav.askAi")}
        </span>
      </Button>
    </div>
  )
}
