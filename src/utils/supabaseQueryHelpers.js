// src/utils/configs/supabaseMethods.js
export const SUPABASE_METHODS = {
  EQ: "eq",
  NEQ: "neq",
  GT: "gt",
  GTE: "gte",
  LT: "lt",
  LTE: "lte",
  LIKE: "like",
  ILIKE: "ilike",
  IN: "in",
  IS: "is",
  CONTAINS: "contains",
};

export function applyFiltersToQuery(query, filters = []) {
  filters.filter(Boolean).forEach((filter) => {
    const method = filter.method || SUPABASE_METHODS.EQ;
    const { field, value } = filter;

    if (method === SUPABASE_METHODS.IN && Array.isArray(value)) {
      query = query.in(field, value);
    } else if (
      (method === SUPABASE_METHODS.LIKE || method === SUPABASE_METHODS.ILIKE) &&
      typeof value === "string"
    ) {
      if (
        method === SUPABASE_METHODS.ILIKE &&
        typeof query.ilike === "function"
      ) {
        query = query.ilike(field, value);
      } else {
        query = query.like(field, value);
      }
    } else {
      if (typeof query[method] === "function") {
        query = query[method](field, value);
      } else {
        query = query.eq(field, value);
      }
    }
  });

  return query;
}

export function applySortToQuery(query, sortBy) {
  if (sortBy && sortBy.field) {
    const ascending =
      String(sortBy.direction || "desc").toLowerCase() === "asc";
    return query.order(sortBy.field, { ascending });
  }
  return query;
}

export function applyPaginationToQuery(query, pagination) {
  if (!pagination) return query;
  const page = Math.max(1, Number(pagination.page) || 1);
  const size = Math.max(1, Number(pagination.size) || 10);
  const from = (page - 1) * size;
  const to = from + size - 1;
  return query.range(from, to);
}
