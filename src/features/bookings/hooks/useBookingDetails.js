import { useQuery } from "@tanstack/react-query";
import { readBookingByIdKey } from "../../../utils/queryConstants";
import { readBookingById } from "../../../services/apiBookings";

export function useBookingDetails() {
  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: [readBookingByIdKey],
    queryFn: readBookingById,
  });

  return { isLoading, booking, error };
}
