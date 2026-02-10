/**
 * Bootstrap Entry Module
 *
 * This module gates React app boot based on browser support.
 * If the browser is unsupported, the HTML-first notice remains visible.
 * If the browser is supported, the notice is hidden and the app loads.
 */

import { isBrowserSupported } from "./lib/unsupportedBrowser"

function bootstrap(): void {
  const noticeElement = document.getElementById("unsupported-browser-notice")
  const rootElement = document.getElementById("root")

  if (isBrowserSupported()) {
    // Supported browser: hide notice, show root, load app
    if (noticeElement) {
      noticeElement.style.display = "none"
    }
    if (rootElement) {
      rootElement.style.display = "block"
    }
    // Dynamically import the main app entry
    import("./main")
  } else {
    // Unsupported browser: keep notice visible, hide root
    if (noticeElement) {
      noticeElement.style.display = "flex"
    }
    if (rootElement) {
      rootElement.style.display = "none"
    }
  }
}

bootstrap()
