import { useQuery } from "@tanstack/react-query";
import { readBookingByIdKey } from "../../../utils/queryConstants";
import { readBookingById } from "../../../services/apiBookings";
import { useParams } from "react-router-dom";

export function useBookingDetails() {
  const { id } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    queryKey: [readBookingByIdKey, id],
    queryFn: () => readBookingById(id),
    retry: false,
  });

  return { isLoading, booking, error };
}
