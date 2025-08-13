import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readBookings } from "../../../services/apiBookings";
import { readBookingsKey } from "../../../utils/constants/queryConstants";
import { useSearchParams } from "react-router-dom";
import { useMemo, useEffect } from "react";
import { PAGE_SIZE } from "../../../utils/constants/uiConstants";
import {
  buildSortFromParam,
  buildPaginationFromParams,
} from "../../../utils/helpers/tableUrlHelpers";

import {
  getTotalPages,
  prefetchPage,
} from "../../../utils/helpers/paginationHelpers";
import useBookingFilters from "../hooks/useBookingFilters";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // [1] FILTERS
  const { filters, status: statusParam } = useBookingFilters();

  // [2] SORT
  const { field, direction } = useMemo(
    () =>
      buildSortFromParam(searchParams, {
        defaultSort: BOOKING_CONFIG.SORT.DEFAULT,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams.toString()]
  );
  const sortField = field;
  const sortDirection = direction;

  // [3] PAGINaTION
  const pagination = useMemo(
    () => buildPaginationFromParams(searchParams, { size: PAGE_SIZE }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [searchParams.toString()]
  );
  const pageParam = Number(pagination.page || 1);
  const pageSize = Number(pagination.size);

  const filtersKey = useMemo(() => JSON.stringify(filters || []), [filters]);

  // [4] main query
  const { isLoading, data, error, isFetching } = useQuery({
    queryKey: [
      readBookingsKey,
      filtersKey,
      statusParam,
      sortField,
      sortDirection,
      pageParam,
    ],
    queryFn: () =>
      readBookings({
        filters,
        sortBy: { field: sortField, direction: sortDirection },
        pagination,
      }),
    // keepPreviousData: true, // smoother UX when paginating
  });

  const bookings = data?.data ?? [];
  const count = Number(data?.count ?? 0);

  // [5] prefetch next page when there is one
  useEffect(() => {
    const totalPages = getTotalPages(count, pageSize);
    const nextPage = pageParam + 1;

    if (nextPage <= totalPages) {
      const nextKey = [
        readBookingsKey,
        filtersKey,
        statusParam,
        sortField,
        sortDirection,
        nextPage,
      ];

      prefetchPage(queryClient, nextKey, () =>
        readBookings({
          filters,
          sortBy: { field: sortField, direction: sortDirection },
          pagination: { ...pagination, page: nextPage },
        })
      );
    }
  }, [
    queryClient,
    count,
    pageParam,
    pageSize,
    filtersKey,
    statusParam,
    sortField,
    sortDirection,
    filters,
    pagination,
  ]);

  return { isLoading, isFetching, bookings, count, error };
}
