// src/utils/paginationHelpers.js
export function getTotalPages(totalItems, pageSize = 10) {
  const size = Math.max(1, Number(pageSize) || 10);
  const items = Math.max(0, Number(totalItems) || 0);
  return Math.max(1, Math.ceil(items / size));
}

/**
 * Prefetch helper centralizes how we call queryClient.prefetchQuery.
 * - queryClient: react-query client
 * - queryKey: array key
 * - queryFn: function that returns a promise
 */
export async function prefetchPage(queryClient, queryKey, queryFn) {
  await queryClient.prefetchQuery({
    queryKey,
    queryFn,
  });
}
