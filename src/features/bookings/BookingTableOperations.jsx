import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Sort from "../../ui/Sort";
import { BOOKING_CONFIG } from "../../utils/configs/bookingConfig";

function BookingTableOperations() {
  const statusConfig = BOOKING_CONFIG.FILTERS.STATUS;
  const sortConfig = BOOKING_CONFIG.SORT;

  return (
    <TableOperations>
      <Filter
        filterField={statusConfig.PARAM}
        defaultValue={statusConfig.DEFAULT}
      >
        <Filter.Group options={statusConfig.OPTIONS} />
      </Filter>

      <Sort.Select
        options={sortConfig.OPTIONS}
        placeholder={sortConfig.PARAM}
        defaultValue={sortConfig.DEFAULT}
        type="white"
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
