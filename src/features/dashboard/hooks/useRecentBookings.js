import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { readRecentBookingsKey } from "../../../utils/constants/queryConstants";
import { useUrl } from "../../../hooks/useUrl";
import { DASHBOARD_CONFIG } from "../../../utils/configs/dashboardConfig";

export function useRecentBookings() {
  const [numDays] = useUrl(DASHBOARD_CONFIG.FILTERS.LAST.PARAM, {
    defaultValue: DASHBOARD_CONFIG.FILTERS.LAST.DEFAULT,
  });

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading: isLoadingBooks,
    data: bookings,
    error: errorBooks,
  } = useQuery({
    queryKey: [
      readRecentBookingsKey,
      `${DASHBOARD_CONFIG.FILTERS.LAST.PARAM}-${numDays}`,
    ],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoadingBooks, bookings, errorBooks, numDays };
}
