/**
 * Browser Detection Utility
 *
 * Dependency-free User-Agent parser for browser compatibility checking.
 * Used by the bootstrap module to gate React app boot.
 *
 * Supported browsers and minimum versions:
 * - Chrome >= 107
 * - Edge >= 107
 * - Firefox >= 104
 * - Safari >= 16
 *
 * Policy: If browser family/version cannot be determined, treat as unsupported.
 *
 * NOTE: UA parsing logic is duplicated in index.html (inline script) for flash
 * prevention on supported browsers. Keep thresholds in sync when updating.
 */

interface BrowserInfo {
  name: string
  version: number
}

/**
 * Minimum supported browser versions
 */
export const MINIMUM_VERSIONS: Record<string, number> = {
  Chrome: 107,
  Edge: 107,
  Firefox: 104,
  Safari: 16,
}

/**
 * Parse browser family and major version from User-Agent string.
 * Returns null if the browser cannot be identified.
 *
 * Detection order matters:
 * 1. Edge (Edg/) - Must check before Chrome since Edge contains "Chrome"
 * 2. Firefox (Firefox/)
 * 3. Safari (Version/...Safari) - Must check before Chrome since Safari doesn't contain "Chrome"
 * 4. Chrome (Chrome/) - Check last among Chromium-based browsers
 */
export function parseBrowser(userAgent: string): BrowserInfo | null {
  if (!userAgent) {
    return null
  }

  const edgeMatch = userAgent.match(/Edg\/(\d+)/)
  if (edgeMatch) {
    return { name: "Edge", version: parseInt(edgeMatch[1], 10) }
  }

  const firefoxMatch = userAgent.match(/Firefox\/(\d+)/)
  if (firefoxMatch) {
    return { name: "Firefox", version: parseInt(firefoxMatch[1], 10) }
  }

  const isSafari =
    userAgent.includes("Safari") &&
    !userAgent.includes("Chrome") &&
    !userAgent.includes("Chromium")
  if (isSafari) {
    const safariMatch = userAgent.match(/Version\/(\d+)/)
    if (safariMatch) {
      return { name: "Safari", version: parseInt(safariMatch[1], 10) }
    }
  }

  const chromeMatch = userAgent.match(/Chrome\/(\d+)/)
  if (chromeMatch) {
    return { name: "Chrome", version: parseInt(chromeMatch[1], 10) }
  }

  return null
}

/**
 * Check if the given browser info meets minimum version requirements.
 */
export function meetsMinimumVersion(browser: BrowserInfo): boolean {
  const minVersion = MINIMUM_VERSIONS[browser.name]
  return minVersion !== undefined && browser.version >= minVersion
}

/**
 * Check if the current browser is supported.
 * Uses navigator.userAgent to detect browser.
 *
 * Returns true if:
 * - Browser can be identified AND
 * - Browser meets minimum version requirements
 *
 * Returns false if:
 * - Browser cannot be identified (unknown UA) OR
 * - Browser is below minimum version
 */
export function isBrowserSupported(): boolean {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent : ""
  const browser = parseBrowser(userAgent)
  return browser !== null && meetsMinimumVersion(browser)
}
