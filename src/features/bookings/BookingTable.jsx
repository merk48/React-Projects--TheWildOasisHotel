import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import useBookings from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../config";

function BookingTable() {
  const { isLoading, bookings, count } = useBookings();
  if (isLoading) return <Spinner />;
  console.log(bookings);
  console.log(count);

  if (!bookings) return <Empty resource="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2fr 0.8fr 1fr">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
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
