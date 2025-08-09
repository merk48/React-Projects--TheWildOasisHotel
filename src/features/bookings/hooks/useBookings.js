// src/hooks/useBookings.js
import { useQuery } from "@tanstack/react-query";
import { readBookings } from "../../../services/apiBookings";
import { readBookingsKey } from "../../../utils/queryConstants";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { PAGE_SIZE } from "../../../config";
import {
  buildFiltersFromConfig,
  buildSortFromParam,
  buildPaginationFromParams,
} from "../../../utils/tableUrlHelpers";

function useBookings() {
  const [searchParams] = useSearchParams();

  // centralized mapping for filter params -> filter objects
  const filtersConfig = {
    status: (v) =>
      !v || v === "all" ? null : { field: "status", value: v, method: "eq" },
    totalPrice: (v) =>
      !v || v === "all"
        ? null
        : { field: "totalPrice", value: Number(v), method: "gte" },
  };

  const filters = useMemo(
    () => buildFiltersFromConfig(searchParams, filtersConfig),
    [searchParams.toString()]
  );
  const { field, direction } = useMemo(
    () => buildSortFromParam(searchParams, { defaultSort: "startDate-desc" }),
    [searchParams.toString()]
  );
  const sortBy = useMemo(() => ({ field, direction }), [field, direction]);
  const pagination = useMemo(
    () => buildPaginationFromParams(searchParams, { size: PAGE_SIZE }),
    [searchParams.toString()]
  );

  const statusParam = searchParams.get("status") || null;
  const priceParam = searchParams.get("totalPrice") || null;
  const pageParam = pagination.page;

  const { isLoading, data, error } = useQuery({
    queryKey: [
      readBookingsKey,
      statusParam,
      priceParam,
      field,
      direction,
      pageParam,
    ],
    queryFn: () =>
      readBookings({
        filters,
        sortBy,
        pagination,
      }),
    keepPreviousData: true,
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  return { isLoading, bookings, count, error };
}

export default useBookings;
