import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../../services/apiBookings";
import { readTodayActivities } from "../../../utils/constants/queryConstants";

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: [readTodayActivities],
  });

  return { activities, isLoading };
}
