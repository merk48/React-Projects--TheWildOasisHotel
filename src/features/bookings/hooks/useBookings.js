import { useQuery } from "@tanstack/react-query";
import { readBookings } from "../../../services/apiBookings";
import { readBookingsKey } from "../../../utils/queryConstants";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

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
  const sortBy = { field, direction };
  console.log(sortBy);
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: [readBookingsKey, filter, sortBy],
    queryFn: () => readBookings({ filters: [filter, filter2], sortBy: sortBy }),
  });

  return { isLoading, bookings, error };
}

export default useBookings;
