import { useQuery, useQueryClient } from "@tanstack/react-query";
import { readCabins } from "../../../services/apiCabins";
import { readCabinsKey } from "../../../utils/constants/queryConstants";
import { useCabinFilters } from "./useCabinFilters";
import { useSearchParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import {
  buildPaginationFromParams,
  buildSortFromParam,
} from "../../../utils/helpers/tableUrlHelpers";
import { CABIN_CONFIG } from "../../../utils/configs/cabinConfig";
import { PAGE_SIZE } from "../../../utils/constants/uiConstants";
import {
  getTotalPages,
  prefetchPage,
} from "../../../utils/helpers/paginationHelpers";

export function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // [1] FILTERS
  const {
    filters,
    discount: discountParam,
    price: priceParam,
  } = useCabinFilters();

  // [2] SORT
  const { field, direction } = useMemo(
    () =>
      buildSortFromParam(searchParams, {
        defaultSort: CABIN_CONFIG.SORT.DEFAULT,
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
      readCabinsKey,
      filtersKey,
      discountParam,
      priceParam,
      sortField,
      sortDirection,
      pageParam,
    ],
    queryFn: () =>
      readCabins({
        filters,
        sortBy: { field: sortField, direction: sortDirection },
        pagination,
      }),
    // keepPreviousData: true, // smoother UX when paginating
  });

  const cabins = data?.data ?? [];
  const count = Number(data?.count ?? 0);

  // [5] prefetch next page when there is one
  useEffect(() => {
    const totalPages = getTotalPages(count, pageSize);
    const nextPage = pageParam + 1;

    if (nextPage <= totalPages) {
      const nextKey = [
        readCabinsKey,
        filtersKey,
        discountParam,
        priceParam,
        sortField,
        sortDirection,
        nextPage,
      ];

      prefetchPage(queryClient, nextKey, () =>
        readCabins({
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
    discountParam,
    priceParam,
    sortField,
    sortDirection,
    filters,
    pagination,
  ]);

  return { isLoading, isFetching, cabins, count, error };
}
