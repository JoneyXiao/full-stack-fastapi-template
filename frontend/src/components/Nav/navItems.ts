import type { LucideIcon } from "lucide-react"
import { Bookmark, BookOpen, Briefcase, Home, Send, Users } from "lucide-react"

export interface NavItem {
  icon: LucideIcon
  title: string
  path: string
}

/**
 * Base navigation items visible to all users (including unauthenticated).
 */
export const baseNavItems: NavItem[] = [
  { icon: Home, title: "Dashboard", path: "/dashboard" },
  { icon: BookOpen, title: "Resources", path: "/resources" },
  { icon: Briefcase, title: "Items", path: "/items" },
]

/**
 * Additional navigation items visible only to authenticated users.
 */
export const authenticatedNavItems: NavItem[] = [
  { icon: Bookmark, title: "Favorites", path: "/favorites" },
  { icon: Send, title: "Submissions", path: "/submissions" },
]

/**
 * Admin-only navigation item.
 */
export const adminNavItem: NavItem = {
  icon: Users,
  title: "Admin",
  path: "/admin",
}

/**
 * Returns the appropriate nav items based on authentication state and role.
 */
export function getNavItems(
  isAuthenticated: boolean,
  isSuperuser: boolean,
): NavItem[] {
  if (!isAuthenticated) {
    // Unauthenticated users see only base items
    return baseNavItems
  }

  if (isSuperuser) {
    return [...baseNavItems, ...authenticatedNavItems, adminNavItem]
  }

  return [...baseNavItems, ...authenticatedNavItems]
}

// Re-export for backwards compatibility with existing code
export const navItems = baseNavItems
