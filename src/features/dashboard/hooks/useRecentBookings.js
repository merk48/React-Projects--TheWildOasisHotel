import { useQuery } from "@tanstack/react-query";
import { getBookingsAfterDate } from "../../../services/apiBookings";
import { readRecentBookingsKey } from "../../../utils/queryConstants";
import { useUrl } from "../../../hooks/useUrl";
import { subDays } from "date-fns";

function useRecentBookings() {
  const [numDays] = useUrl("last", {
    defaultValue: "7",
  });

  const queryDate = subDays(new Date(), numDays).toISOString();

  const {
    isLoading: isLoadingBooks,
    data: bookings,
    error: errorBooks,
  } = useQuery({
    queryKey: [readRecentBookingsKey, `last-${numDays}`],
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isLoadingBooks, bookings, errorBooks, numDays };
}

export default useRecentBookings;
