import { useQuery } from "@tanstack/react-query";
import { getStaysAfterDate } from "../../../services/apiBookings";
import { readRecentStaysKey } from "../../../utils/constants/queryConstants";
import { useUrl } from "../../../hooks/useUrl";
import { subDays } from "date-fns";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";
import { DASHBOARD_CONFIG } from "../../../utils/configs/dashboardConfig";

export function useRecentStays() {
  const [numDays] = useUrl(DASHBOARD_CONFIG.FILTERS.LAST.PARAM, {
    defaultValue: DASHBOARD_CONFIG.FILTERS.LAST.DEFAULT,
  });

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading: isLoadingStays,
    data: stays,
    error: errorStays,
  } = useQuery({
    queryKey: [
      readRecentStaysKey,
      `${DASHBOARD_CONFIG.FILTERS.LAST.PARAM}-${numDays}`,
    ],
    queryFn: () => getStaysAfterDate(queryDate),
  });

  const confirmedStays = stays?.filter(
    (stay) =>
      stay.status === BOOKING_CONFIG.STATUS.CHECKED_IN ||
      stay.status === BOOKING_CONFIG.STATUS.CHECKED_OUT
  );

  return { isLoadingStays, stays, confirmedStays, errorStays, numDays };
}
