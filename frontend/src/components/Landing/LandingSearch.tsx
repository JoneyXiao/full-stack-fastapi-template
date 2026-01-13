import { useQuery } from "@tanstack/react-query"
import { Loader2, Search } from "lucide-react"
import { type FormEvent, type KeyboardEvent, useState } from "react"
import { ResourcesService } from "@/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ResourceResultCard } from "./ResourceResultCard"

interface LandingSearchProps {
  className?: string
}

export function LandingSearch({ className }: LandingSearchProps) {
  const [query, setQuery] = useState("")
  const [submittedQuery, setSubmittedQuery] = useState<string | null>(null)

  // Only fetch when a query has been submitted
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["landing-search", submittedQuery],
    queryFn: () =>
      ResourcesService.listResources({
        q: submittedQuery || undefined,
        limit: 12,
      }),
    enabled: submittedQuery !== null,
    staleTime: 1000 * 60 * 5, // 5 minutes
  })

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault()
    // Trim the query to avoid accidental empty submissions
    const trimmed = query.trim()
    if (trimmed === "") {
      // Show guidance for empty queries
      setSubmittedQuery("")
      return
    }
    setSubmittedQuery(trimmed)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit()
    }
  }

  const hasSubmitted = submittedQuery !== null
  const isEmptyQuery = submittedQuery === ""
  const hasResults = data && data.data.length > 0
  const hasNoResults =
    hasSubmitted && !isEmptyQuery && data && data.data.length === 0

  return (
    <section className={className}>
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for tutorials, tools, papers..."
            aria-label="Search resources"
            data-testid="landing-search-input"
            className="pl-10"
          />
        </div>
        <Button type="submit" data-testid="landing-search-button">
          <Search className="mr-2 h-4 w-4" />
          Search
        </Button>
      </form>

      {/* Loading State */}
      {isLoading && (
        <div
          className="mt-8 flex items-center justify-center"
          data-testid="landing-search-loading"
        >
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">
            Searching resources...
          </span>
        </div>
      )}

      {/* Empty Query Guidance */}
      {isEmptyQuery && !isLoading && (
        <div
          className="mt-8 text-center"
          data-testid="landing-search-empty-guidance"
        >
          <p className="text-muted-foreground">
            Enter a keyword to search for AI resources.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try "machine learning", "GPT", "tutorial", or "dataset".
          </p>
        </div>
      )}

      {/* Error State */}
      {isError && !isLoading && (
        <div className="mt-8 text-center" data-testid="landing-search-error">
          <p className="text-destructive">
            Something went wrong while searching.
          </p>
          <Button variant="outline" onClick={() => refetch()} className="mt-4">
            Try again
          </Button>
        </div>
      )}

      {/* No Results */}
      {hasNoResults && !isLoading && (
        <div className="mt-8 text-center" data-testid="landing-search-empty">
          <p className="text-muted-foreground">
            No results match "{submittedQuery}"
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Try a different keyword or ask the AI assistant below.
          </p>
        </div>
      )}

      {/* Results Grid */}
      {hasResults && !isLoading && (
        <div
          className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          data-testid="landing-search-results"
        >
          {data.data.map((resource) => (
            <ResourceResultCard key={resource.id} resource={resource} />
          ))}
        </div>
      )}

      {/* Results count */}
      {hasResults && !isLoading && (
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Found {data.count} resource{data.count !== 1 ? "s" : ""}
        </p>
      )}
    </section>
  )
}
