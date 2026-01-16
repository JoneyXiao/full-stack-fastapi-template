import { useQuery } from "@tanstack/react-query"
import { useNavigate } from "@tanstack/react-router"
import { FileText, Loader2, Search } from "lucide-react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"

import { ResourcesService } from "@/client"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [query, setQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")

  // Debounce the search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query)
    }, 300)
    return () => clearTimeout(timer)
  }, [query])

  // Reset query when dialog closes
  useEffect(() => {
    if (!open) {
      setQuery("")
      setDebouncedQuery("")
    }
  }, [open])

  // Search query
  const { data, isLoading, isError } = useQuery({
    queryKey: ["nav-search", debouncedQuery],
    queryFn: () =>
      ResourcesService.listResources({
        q: debouncedQuery || undefined,
        limit: 10,
      }),
    enabled: open && debouncedQuery.length > 0,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleSelect = (resourceId: string) => {
    onOpenChange(false)
    navigate({ to: "/resources/$resourceId", params: { resourceId } })
  }

  const handleViewAll = () => {
    onOpenChange(false)
    navigate({ to: "/resources", search: { q: query } })
  }

  const hasResults = data && data.data.length > 0
  const hasNoResults =
    debouncedQuery.length > 0 && data && data.data.length === 0
  const showLoading = isLoading && debouncedQuery.length > 0

  return (
    <CommandDialog
      open={open}
      onOpenChange={onOpenChange}
      title={t("search.title")}
      description={t("search.description")}
    >
      <div data-testid="search-dialog">
        <CommandInput
          placeholder={t("search.placeholder")}
          value={query}
          onValueChange={setQuery}
          data-testid="search-dialog-input"
        />
        <CommandList>
          {/* Loading state */}
          {showLoading && (
            <div className="flex items-center justify-center py-6">
              <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
              <span className="ml-2 text-sm text-muted-foreground">
                {t("search.searching")}
              </span>
            </div>
          )}

          {/* Error state */}
          {isError && (
            <div
              className="py-6 text-center text-sm text-muted-foreground"
              data-testid="search-error-state"
            >
              <p>{t("search.errorTitle")}</p>
              <p className="mt-1 text-xs">{t("search.errorHint")}</p>
            </div>
          )}

          {/* Empty state */}
          {hasNoResults && !isLoading && (
            <CommandEmpty data-testid="search-empty-state">
              {t("search.noResults", { query: debouncedQuery })}
            </CommandEmpty>
          )}

          {/* Results */}
          {hasResults && !isLoading && (
            <CommandGroup heading="Resources">
              {data.data.map((resource) => (
                <CommandItem
                  key={resource.id}
                  value={resource.title}
                  onSelect={() => handleSelect(resource.id)}
                  data-testid="search-result-item"
                  className="cursor-pointer"
                >
                  <FileText className="mr-2 h-4 w-4 text-muted-foreground" />
                  <div className="flex flex-col">
                    <span className="font-medium">{resource.title}</span>
                    {resource.description && (
                      <span className="text-xs text-muted-foreground line-clamp-1">
                        {resource.description}
                      </span>
                    )}
                  </div>
                </CommandItem>
              ))}
              {data.data.length >= 10 && (
                <CommandItem
                  onSelect={handleViewAll}
                  className="cursor-pointer justify-center text-primary"
                >
                  <Search className="mr-2 h-4 w-4" />
                  {t("search.viewAllResults")}
                </CommandItem>
              )}
            </CommandGroup>
          )}

          {/* Empty query prompt */}
          {!debouncedQuery && !isLoading && (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {t("search.startTyping")}
            </div>
          )}
        </CommandList>
      </div>
    </CommandDialog>
  )
}
