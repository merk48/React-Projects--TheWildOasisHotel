import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../../services/apiBookings";
import { readRecentStaysKey } from "../../../utils/queryConstants";
import { useUrl } from "../../../hooks/useUrl";
import { subDays } from "date-fns";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";

function useRecentStays() {
  const [numDays] = useUrl("last");

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading: isLoadingStays,
    data: stays,
    error: errorStays,
  } = useQuery({
    queryKey: [readRecentStaysKey, `last-${numDays}`],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) =>
      stay.status === BOOKING_CONFIG.statusOptions.CHECKED_IN ||
      stay.status === BOOKING_CONFIG.statusOptions.CHECKED_OUT
  );

  return { isLoadingStays, stays, confirmedStays, errorStays };
}

export default useRecentStays;
