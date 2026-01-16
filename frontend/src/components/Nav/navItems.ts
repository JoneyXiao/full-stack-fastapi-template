import type { LucideIcon } from "lucide-react"
import { Bookmark, BookOpen, Briefcase, Home, Send, Users } from "lucide-react"

export interface NavItem {
  icon: LucideIcon
  /** Translation key for the nav item title (e.g., "nav.dashboard") */
  titleKey: string
  /** Fallback English title (used as display if translation not available) */
  title: string
  path: string
}

/**
 * Base navigation items visible to all users (including unauthenticated).
 */
export const baseNavItems: NavItem[] = [
  {
    icon: Home,
    titleKey: "nav.dashboard",
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: BookOpen,
    titleKey: "nav.resources",
    title: "Resources",
    path: "/resources",
  },
  { icon: Briefcase, titleKey: "nav.items", title: "Items", path: "/items" },
]

/**
 * Additional navigation items visible only to authenticated users.
 */
export const authenticatedNavItems: NavItem[] = [
  {
    icon: Bookmark,
    titleKey: "nav.favorites",
    title: "Favorites",
    path: "/favorites",
  },
  {
    icon: Send,
    titleKey: "nav.submissions",
    title: "Submissions",
    path: "/submissions",
  },
]

/**
 * Admin-only navigation item.
 */
export const adminNavItem: NavItem = {
  icon: Users,
  titleKey: "nav.admin",
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
