import { Link, useRouterState } from "@tanstack/react-router"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { isNavItemActive } from "./isNavItemActive"
import type { NavItem } from "./navItems"

interface LowerNavProps {
  items: NavItem[]
}

export function LowerNav({ items }: LowerNavProps) {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <NavigationMenu className="hidden md:flex" data-testid="nav-lower-row">
      <NavigationMenuList className="gap-6 justify-start">
        {items.map((item) => {
          const isActive = isNavItemActive(item.path, currentPath)
          const Icon = item.icon

          return (
            <NavigationMenuItem key={item.path}>
              <NavigationMenuLink
                asChild
                className={cn(
                  // Layout
                  "!flex !h-12 !flex-row !items-center !gap-2 !rounded-none !p-0 px-3",
                  // Typography
                  "text-sm font-medium",
                  // Border indicator
                  "border-b-2 border-transparent",
                  // Override shadcn defaults: transparent background in all states
                  "!bg-transparent hover:!bg-transparent focus:!bg-transparent",
                  "data-[active=true]:!bg-transparent data-[active=true]:hover:!bg-transparent data-[active=true]:focus:!bg-transparent",
                  // Opacity-only hover effect
                  "transition-opacity duration-200",
                  isActive
                    ? "text-foreground hover:!text-foreground opacity-100 border-primary"
                    : "text-muted-foreground hover:!text-muted-foreground opacity-80 hover:opacity-100",
                )}
              >
                <Link to={item.path} data-testid={`nav-link-${item.path}`}>
                  <Icon className="h-4 w-4" />
                  <span>{item.title}</span>
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
