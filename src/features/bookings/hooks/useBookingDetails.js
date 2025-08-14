import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { readBookingByIdKey } from "../../../utils/constants/queryConstants";
import { readBookingById } from "../../../services/apiBookings";

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
