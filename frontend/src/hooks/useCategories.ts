/**
 * React Query hooks for category listing using generated client.
 */

import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query"
import { CategoriesService } from "@/client"

/**
 * Query key factory for categories
 */
export const categoriesKeys = {
  all: ["categories"] as const,
  lists: () => [...categoriesKeys.all, "list"] as const,
  list: (params?: { skip?: number; limit?: number }) =>
    [...categoriesKeys.lists(), params] as const,
  admin: () => [...categoriesKeys.all, "admin"] as const,
  adminList: (params?: { skip?: number; limit?: number }) =>
    [...categoriesKeys.admin(), params] as const,
}

type PaginationParams = { skip?: number; limit?: number }

/**
 * Query options for fetching public categories list
 */
export function getCategoriesQueryOptions(params?: PaginationParams) {
  return {
    queryKey: categoriesKeys.list(params),
    queryFn: () => CategoriesService.listCategories(params ?? {}),
  }
}

/**
 * Hook to fetch public categories list (for filtering and selection)
 */
export function useCategories(params?: PaginationParams) {
  return useSuspenseQuery(getCategoriesQueryOptions(params))
}

/**
 * Query options for fetching admin categories list with usage info
 */
export function getCategoriesAdminQueryOptions(params?: PaginationParams) {
  return {
    queryKey: categoriesKeys.adminList(params),
    queryFn: () => CategoriesService.listCategoriesAdmin(params ?? {}),
  }
}

/**
 * Hook to fetch admin categories list with usage info
 */
export function useCategoriesAdmin(params?: PaginationParams) {
  return useSuspenseQuery(getCategoriesAdminQueryOptions(params))
}

/**
 * Hook to create a new category
 */
export function useCreateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (name: string) =>
      CategoriesService.createCategory({ requestBody: { name } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all }),
  })
}

/**
 * Hook to update/rename a category
 */
export function useUpdateCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      CategoriesService.updateCategory({ id, requestBody: { name } }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all }),
  })
}

/**
 * Hook to delete a category
 */
export function useDeleteCategory() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => CategoriesService.deleteCategory({ id }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: categoriesKeys.all }),
  })
}
