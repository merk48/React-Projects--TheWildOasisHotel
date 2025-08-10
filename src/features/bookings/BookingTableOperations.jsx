import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Sort from "../../ui/Sort";
import { BOOKING_CONFIG } from "../../utils/configs/bookingConfig";

function BookingTableOperations() {
  const statusConfig = BOOKING_CONFIG.filters.status;
  const sortConfig = BOOKING_CONFIG.sort;

  return (
    <TableOperations>
      <Filter
        filterField={statusConfig.param}
        defaultValue={statusConfig.default}
      >
        <Filter.Group options={statusConfig.options} />
      </Filter>

      <Sort.Select
        options={sortConfig.options}
        placeholder={sortConfig.param}
        defaultValue={sortConfig.default}
        type="white"
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
