/**
 * Checks if a nav item should be marked as active based on the current pathname.
 *
 * @param itemPath - The path of the navigation item
 * @param currentPath - The current route pathname
 * @returns true if the item should be marked active
 */
export function isNavItemActive(
  itemPath: string,
  currentPath: string,
): boolean {
  // Root should be an exact match only; otherwise "/" would match every path.
  if (itemPath === "/") {
    return currentPath === "/"
  }

  // Exact match OR prefix match for sub-routes like /resources/123, /dashboard/settings, etc.
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}
