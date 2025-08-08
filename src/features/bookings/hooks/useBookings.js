import { useQuery } from "@tanstack/react-query";
import { readBookings } from "../../../services/apiBookings";
import { readBookingsKey } from "../../../utils/queryConstants";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

  const filterValue = searchParams.get("status");

  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: [readBookingsKey, filter],
    queryFn: () => readBookings({ filter }),
  });

  return { isLoading, bookings, error };
}

export default useBookings;
