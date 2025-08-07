import { useQuery } from "@tanstack/react-query";
import { readBookings } from "../../../services/apiBookings";
import { readBookingsKey } from "../../../utils/queryConstants";

function useBookings() {
  const {
    isLoading,
    data: bookings,
    error,
  } = useQuery({
    queryKey: [readBookingsKey],
    queryFn: readBookings,
  });

  return { isLoading, bookings, error };
}

export default useBookings;
