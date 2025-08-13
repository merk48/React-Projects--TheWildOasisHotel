import { useMemo } from "react";
import { useUrl } from "../../../hooks/useUrl";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";
import { buildFiltersFromConfig } from "../../../utils/helpers/tableUrlHelpers";

export function useBookingFilters() {
  const [status, setStatus] = useUrl(BOOKING_CONFIG.FILTERS.STATUS.PARAM, {
    defaultValue: BOOKING_CONFIG.FILTERS.STATUS.DEFAULT,
  });

  const filters = useMemo(
    () =>
      buildFiltersFromConfig(
        new URLSearchParams([[BOOKING_CONFIG.FILTERS.STATUS.PARAM, status]]),
        {
          [BOOKING_CONFIG.FILTERS.STATUS.PARAM]: (v) =>
            BOOKING_CONFIG.FILTERS.STATUS.ToFilter(v),
        }
      ),
    [status]
  );

  return { status, setStatus, filters };
}
