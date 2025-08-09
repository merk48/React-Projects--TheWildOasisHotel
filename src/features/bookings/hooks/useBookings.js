import { useQuery } from "@tanstack/react-query";
import { readBookings } from "../../../services/apiBookings";
import { readBookingsKey } from "../../../utils/queryConstants";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";
import { PAGE_SIZE } from "../../../config";

function useBookings() {
  const [searchParams] = useSearchParams();
  // Filters
  // Sort
  // Pagination
  const filterValue = searchParams.get("status");
  const filterValue2 = searchParams.get("totalPrice");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : //Todo
        { field: "status", value: filterValue, method: "eq" };

  const filter2 =
    !filterValue2 || filterValue2 === "all"
      ? null
      : //Todo
        { field: "totalPrice", value: filterValue2, method: "gte" };

  const currentSort = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = currentSort.split("-");
  const sortBy = useMemo(() => ({ field, direction }), [field, direction]);
  const page = searchParams.get("page") || "1";
  const pagination = useMemo(() => ({ page: +page, size: PAGE_SIZE }), [page]);

  const { isLoading, data, error } = useQuery({
    queryKey: [readBookingsKey, filter, sortBy, page],
    queryFn: () =>
      readBookings({ filters: [filter, filter2], sortBy: sortBy, pagination }),
  });

  // After loading
  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  return { isLoading, bookings, count, error };
}

export default useBookings;
