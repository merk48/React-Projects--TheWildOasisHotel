import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";
import Sort from "../../ui/Sort";

function BookingTableOperations() {
  const statusOptions = [
    { value: "all", label: "All" },
    { value: "checked-out", label: "Checked out" },
    { value: "checked-in", label: "Checked in" },
    { value: "unconfirmed", label: "Unconfirmed" },
  ];
  const sortOptions = [
    { value: "startDate-desc", label: "Sort by date (recent first)" },
    { value: "startDate-asc", label: "Sort by date (earlier first)" },
    {
      value: "totalPrice-desc",
      label: "Sort by amount (high first)",
    },
    { value: "totalPrice-asc", label: "Sort by amount (low first)" },
  ];

  return (
    <TableOperations>
      <Filter filterField="status" defaultValue={statusOptions[0].value}>
        <Filter.Group options={statusOptions} />
      </Filter>

      <Sort.Select
        options={sortOptions}
        defaultValue={sortOptions[0].value}
        type="white"
      />
    </TableOperations>
  );
}

export default BookingTableOperations;
