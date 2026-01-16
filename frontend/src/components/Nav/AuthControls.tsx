import { Link } from "@tanstack/react-router"
import { useTranslation } from "react-i18next"

import { Button } from "@/components/ui/button"
import useAuth from "@/hooks/useAuth"
import { AccountMenu } from "./AccountMenu"

export function AuthControls() {
  const { t } = useTranslation()
  const { user } = useAuth()

  if (user) {
    return <AccountMenu user={user} />
  }

  return (
    <div className="flex items-center gap-2">
      <Link to="/login">
        <Button variant="ghost" size="sm" data-testid="nav-login">
          {t("nav.login")}
        </Button>
      </Link>
      <Link to="/signup">
        <Button size="sm" data-testid="nav-signup">
          {t("nav.signup")}
        </Button>
      </Link>
    </div>
  )
}
