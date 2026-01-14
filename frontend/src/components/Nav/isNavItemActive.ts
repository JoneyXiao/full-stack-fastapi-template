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
  // Exact match for root/dashboard
  if (itemPath === "/" || itemPath === "/dashboard") {
    return currentPath === "/" || currentPath === "/dashboard"
  }

  // For other paths, check if currentPath starts with itemPath
  // This handles sub-routes like /resources/123
  return currentPath === itemPath || currentPath.startsWith(`${itemPath}/`)
}
