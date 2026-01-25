import { Link } from "@tanstack/react-router"
import { LogOut, Settings, User } from "lucide-react"
import { useTranslation } from "react-i18next"

import type { UserPublic } from "@/client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/hooks/useAuth"
import { DEFAULT_AVATAR, getInitials, resolveApiUrl } from "@/utils"

interface AccountMenuProps {
  user: UserPublic
}

export function AccountMenu({ user }: AccountMenuProps) {
  const { t } = useTranslation()
  const { logout } = useAuth()
  const initials = getInitials(user.full_name || user.email)
  const avatarUrl = resolveApiUrl(user.avatar_url) ?? DEFAULT_AVATAR

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          data-testid="user-menu"
          aria-label={t("common.menu")}
          className="relative h-8 w-8 rounded-full"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={user.full_name || user.email} />
            <AvatarFallback className="text-sm">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center gap-2 p-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={avatarUrl} alt={user.full_name || user.email} />
            <AvatarFallback className="text-sm">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col space-y-0.5">
            {user.full_name && (
              <p className="text-sm font-medium">{user.full_name}</p>
            )}
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            {t("settings.title")}
          </Link>
        </DropdownMenuItem>
        {/* <DropdownMenuItem asChild>
          <Link to="/settings" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            {t("settings.myProfile")}
          </Link>
        </DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => logout()}
          className="flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          {t("auth.logout")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
