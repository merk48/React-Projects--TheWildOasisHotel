import { PAGE_SIZE } from "../config";

/**
 * buildFiltersFromConfig(searchParams, config)
 *
 * config is an object: { paramName: mapperFn }
 * mapperFn receives the raw param string (or null) and must return either
 *  - a filter object { field, value, method } or
 *  - null/undefined to skip the filter
 *
 * Example:
 *  const config = {
 *    status: v => (!v || v === 'all') ? null : { field: 'status', value: v, method: 'eq' }
 *  }
 */
export function buildFiltersFromConfig(searchParams, config = {}) {
  const filters = [];
  Object.entries(config).forEach(([param, mapper]) => {
    const val = searchParams.get(param);
    const f = typeof mapper === "function" ? mapper(val) : null;
    if (f) filters.push(f);
  });
  return filters;
}

/**
 * buildSortFromParam(searchParams, options)
 * options: { param = 'sortBy', defaultSort = 'startDate-desc' }
 */
export function buildSortFromParam(
  searchParams,
  { param = "sortBy", defaultSort = "" } = {}
) {
  const raw = searchParams.get(param) || defaultSort || "";
  const [field = "", direction = "desc"] = String(raw).split("-");
  return { field, direction };
}

/**
 * buildPaginationFromParams(searchParams, options)
 * options: { pageParam = 'page', defaultPage = 1, size = PAGE_SIZE }
 */
export function buildPaginationFromParams(
  searchParams,
  { pageParam = "page", defaultPage = 1, size = PAGE_SIZE } = {}
) {
  const page = Math.max(1, Number(searchParams.get(pageParam) || defaultPage));
  return { page, size: Number(size) };
}
