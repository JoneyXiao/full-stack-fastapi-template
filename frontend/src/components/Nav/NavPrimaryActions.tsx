import { MessageSquare, Search } from "lucide-react"

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
}

export function NavPrimaryActions({
  onSearchClick,
  onChatClick,
}: NavPrimaryActionsProps) {
  return (
    <div className="flex items-center gap-2">
      {/* Search Input - Neon style */}
      <InputGroup
        className="w-48 cursor-pointer sm:w-64 lg:w-80"
        onClick={onSearchClick}
        data-testid="nav-search-trigger"
      >
        <InputGroupAddon>
          <Search className="h-4 w-4" />
        </InputGroupAddon>
        <InputGroupInput
          placeholder="Search..."
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
        data-testid="nav-chat-trigger"
        className="gap-2"
      >
        <MessageSquare className="h-4 w-4" />
        <span className="hidden sm:inline">Ask AI</span>
      </Button>
    </div>
  )
}
