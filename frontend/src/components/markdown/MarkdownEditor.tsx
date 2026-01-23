import MDEditor, { commands, type ICommand } from "@uiw/react-md-editor"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { useTheme } from "@/components/theme-provider"

/**
 * Default toolbar commands for the editor.
 */
const TOOLBAR_COMMANDS: ICommand[] = [
  commands.bold,
  commands.italic,
  commands.strikethrough,
  commands.divider,
  commands.title,
  commands.quote,
  commands.code,
  commands.codeBlock,
  commands.divider,
  commands.link,
  commands.image,
  commands.divider,
  commands.unorderedListCommand,
  commands.orderedListCommand,
  commands.checkedListCommand,
]

const EXTRA_COMMANDS: ICommand[] = [
  commands.codeEdit,
  commands.codeLive,
  commands.codePreview,
]

export interface MarkdownEditorProps {
  /**
   * Current value of the editor.
   */
  value: string
  /**
   * Callback when the value changes.
   */
  onChange: (value: string) => void
  /**
   * Optional placeholder text.
   */
  placeholder?: string
  /**
   * Optional minimum height in pixels.
   * @default 200
   */
  minHeight?: number
  /**
   * Optional maximum character length.
   */
  maxLength?: number
  /**
   * Optional ID for the editor (for accessibility).
   */
  id?: string
  /**
   * Optional aria-label for the editor.
   */
  "aria-label"?: string
  /**
   * Optional aria-describedby for the editor.
   */
  "aria-describedby"?: string
}

/**
 * Markdown editor component with GitHub-style Write/Preview tabs.
 *
 * Features:
 * - Toolbar with formatting commands (bold, italic, lists, links, images, etc.)
 * - Write/Preview toggle (keyboard accessible)
 * - Controlled value/onChange interface
 * - Character count and validation support
 * - Accessible labels and focus management
 *
 * @example
 * ```tsx
 * const [value, setValue] = useState("")
 *
 * <MarkdownEditor
 *   value={value}
 *   onChange={setValue}
 *   placeholder="Enter your description..."
 *   maxLength={10000}
 *   id="description"
 *   aria-label="Description"
 * />
 * ```
 */
export function MarkdownEditor({
  value,
  onChange,
  placeholder,
  minHeight = 200,
  maxLength,
  id,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedby,
}: MarkdownEditorProps) {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [colorMode, setColorMode] = useState<"light" | "dark">("light")

  useEffect(() => {
    // For explicit theme, use it directly
    if (theme === "dark" || theme === "light") {
      setColorMode(theme)
      return
    }

    // For "system" theme, detect from media query and listen for changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    setColorMode(mediaQuery.matches ? "dark" : "light")

    function handleChange(e: MediaQueryListEvent): void {
      setColorMode(e.matches ? "dark" : "light")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  function handleEditorChange(val: string | undefined): void {
    onChange(val || "")
  }

  const isOverLimit = maxLength !== undefined && value.length > maxLength
  const charCountText = maxLength
    ? t("common.charCount", {
        current: value.length,
        max: maxLength,
        defaultValue: `${value.length} / ${maxLength}`,
      })
    : null

  return (
    <div className="space-y-2" data-color-mode={colorMode}>
      <MDEditor
        value={value}
        onChange={handleEditorChange}
        preview="edit"
        height={minHeight}
        commands={TOOLBAR_COMMANDS}
        extraCommands={EXTRA_COMMANDS}
        textareaProps={{
          id,
          placeholder,
          "aria-label": ariaLabel,
          "aria-describedby": ariaDescribedby,
          "aria-invalid": isOverLimit ? "true" : undefined,
        }}
      />
      {charCountText && (
        <div
          className={`text-xs text-right ${isOverLimit ? "text-destructive font-medium" : "text-muted-foreground"}`}
          aria-live="polite"
        >
          {charCountText}
        </div>
      )}
    </div>
  )
}
