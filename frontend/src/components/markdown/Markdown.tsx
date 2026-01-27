import { ImageOff } from "lucide-react"
import {
  type AnchorHTMLAttributes,
  type ImgHTMLAttributes,
  type ReactElement,
  type ReactNode,
  useState,
} from "react"
import ReactMarkdown, { type Components, type ExtraProps } from "react-markdown"
import remarkBreaks from "remark-breaks"
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
    const url = new URL(href, "https://placeholder.com")
    const protocol = url.protocol.toLowerCase()
    return ALLOWED_PROTOCOLS.includes(protocol) ? href : undefined
  } catch {
    return undefined
  }
}

function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === "boolean")
    return ""
  if (typeof node === "string" || typeof node === "number") return String(node)
  if (Array.isArray(node)) return node.map(extractText).join("")
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props
    return extractText(props?.children)
  }
  return ""
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
}: AnchorHTMLAttributes<HTMLAnchorElement> & ExtraProps): ReactElement {
  const safeHref = getSafeUrl(href)
  const linkText = extractText(children).trim()
  const isCitation = /^\d{1,3}$/.test(linkText)

  if (!safeHref) {
    return <span className="text-muted-foreground">{children}</span>
  }

  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noopener noreferrer"
      className={
        isCitation
          ? "markdown-link markdown-link--citation"
          : "markdown-link markdown-link--default"
      }
      title={safeHref}
      aria-label={isCitation ? `Open citation link: ${safeHref}` : undefined}
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
}: ImgHTMLAttributes<HTMLImageElement> & ExtraProps): ReactElement {
  const [hasError, setHasError] = useState(false)
  const safeSrc = getSafeUrl(src)

  if (!safeSrc || hasError) {
    return (
      <span className="inline-flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
        <ImageOff className="h-4 w-4" aria-hidden="true" />
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
export function Markdown({
  children,
  className = "",
}: MarkdownProps): ReactElement | null {
  if (!children) {
    return null
  }

  const containerClass = className
    ? `markdown-body ${className}`
    : "markdown-body"

  return (
    <div className={containerClass}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        skipHtml
        components={markdownComponents}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}
