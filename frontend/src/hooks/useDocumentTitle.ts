import { useEffect } from "react"
import { useTranslation } from "react-i18next"

/**
 * Sets the document title using an i18n translation key.
 * Updates automatically when language changes.
 */
function useDocumentTitle(titleKey: string): void {
  const { t } = useTranslation()

  useEffect(() => {
    document.title = t(titleKey)
  }, [t, titleKey])
}

export default useDocumentTitle
