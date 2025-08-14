import { useBookings } from "./hooks/useBookings";
import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants/uiConstants";

function BookingTable() {
  const { isLoading, bookings, count, error } = useBookings();

  if (isLoading) return <Spinner />;

  if (!bookings) return <Empty resource="bookings" />;
  return (
    <Menus>
      <Table
        columns="0.7fr 2fr 2fr 1.4fr 1fr .2fr"
        minWidth={700}
        minWidthSm={650}
      >
        <Table.Header>
          <Table.HeaderCell>Cabin</Table.HeaderCell>
          <Table.HeaderCell>Guest</Table.HeaderCell>
          <Table.HeaderCell>Dates</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
          <Table.HeaderCell>Amount</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />

        <Table.Footer>
          <Pagination count={count} pageSize={PAGE_SIZE} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
