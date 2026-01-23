import { useState } from "react"
import ReactMarkdown, { type Components, type ExtraProps } from "react-markdown"
import remarkGfm from "remark-gfm"

/**
 * List of allowed URL protocols.
 * Any URL not starting with these protocols will not be rendered as a clickable link.
 */
const ALLOWED_PROTOCOLS = ["http:", "https:", "mailto:"]

/**
 * Validates a URL and returns it if safe, otherwise returns undefined.
 * Blocks unsafe protocols like javascript:, data:, vbscript:, etc.
 */
function getSafeUrl(href: string | undefined): string | undefined {
  if (!href) return undefined

  try {
    // Parse the URL to check its protocol
    const url = new URL(href, "https://placeholder.com")
    const protocol = url.protocol.toLowerCase()

    if (ALLOWED_PROTOCOLS.includes(protocol)) {
      return href
    }
    // Unsafe protocol - return undefined to block
    return undefined
  } catch {
    // Malformed URL - don't render as clickable
    return undefined
  }
}

/**
 * Custom link renderer that:
 * - Opens links in new tab/window with rel="noopener noreferrer"
 * - Blocks unsafe URL protocols (javascript:, data:, etc.)
 * - Shows plain text for malformed or unsafe URLs
 */
function LinkRenderer({
  href,
  children,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps) {
  const safeHref = getSafeUrl(href)

  if (!safeHref) {
    // Render as plain text for unsafe/malformed URLs
    return <span className="text-muted-foreground">{children}</span>
  }

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline hover:text-primary/80"
      {...props}
    >
      {children}
    </a>
  )
}

/**
 * Custom image renderer with:
 * - Safe URL validation (blocks javascript:, data:, etc.)
 * - Lazy loading for performance
 * - Graceful error handling with visible fallback
 */
function ImageRenderer({
  src,
  alt,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement> & ExtraProps) {
  const [hasError, setHasError] = useState(false)
  const safeSrc = getSafeUrl(src)

  if (!safeSrc || hasError) {
    // Show fallback for unsafe URLs or load errors
    return (
      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
        <span aria-hidden="true">🖼️</span>
        <span>{alt || "Image could not be loaded"}</span>
      </span>
    )
  }

  return (
    <img
      src={safeSrc}
      alt={alt || ""}
      loading="lazy"
      onError={() => setHasError(true)}
      className="max-w-full rounded-md"
      {...props}
    />
  )
}

/**
 * Custom components for react-markdown that provide safe rendering.
 * HTML tags from user input are escaped and displayed as literal text
 * because we use `skipHtml` mode.
 */
const markdownComponents: Components = {
  a: LinkRenderer,
  img: ImageRenderer,
}

export interface MarkdownProps {
  /**
   * The Markdown content to render.
   */
  children: string
  /**
   * Optional className to apply to the container.
   */
  className?: string
}

/**
 * Safe Markdown renderer component.
 *
 * Features:
 * - GitHub Flavored Markdown (GFM) support
 * - Raw HTML is not rendered (displayed as escaped text)
 * - Links open in new tab/window with rel="noopener noreferrer"
 * - Unsafe URL protocols are blocked (javascript:, data:, etc.)
 * - Images load lazily and degrade gracefully on error
 *
 * @example
 * ```tsx
 * <Markdown>{"**Bold** and *italic* text with [links](https://example.com)"}</Markdown>
 * ```
 */
export function Markdown({ children, className = "" }: MarkdownProps) {
  if (!children) {
    return null
  }

  return (
    <div className={`markdown-body ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        skipHtml={true}
        components={markdownComponents}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
