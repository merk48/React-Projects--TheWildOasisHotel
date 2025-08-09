import { useMemo } from "react";
import { useUrl } from "../../../hooks/useUrl";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";
import { buildFiltersFromConfig } from "../../../utils/tableUrlHelpers";

export default function useBookingFilters() {
  // in here I defing the filters for the booking
  const statusConfig = BOOKING_CONFIG.filters.status;

  const [status, setStatus] = useUrl(statusConfig.param, {
    defaultValue: statusConfig.default,
  });

  const filters = useMemo(
    () =>
      buildFiltersFromConfig(
        new URLSearchParams([[statusConfig.param, status]]),
        {
          [statusConfig.param]: (v) => statusConfig.toFilter(v),
        }
      ),
    [status, statusConfig]
  );

  return { status, setStatus, filters };
}
