import BookingRow from "./BookingRow";
import Empty from "../../ui/Empty";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { TableColumns, TableColumnsSm } from "../../utils/uiConstants";
import useBookings from "./hooks/useBookings";
import Spinner from "../../ui/Spinner";

function BookingTable() {
  const { isLoading, bookings } = useBookings();
  if (isLoading) return <Spinner />;
  console.log(bookings);

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
      </Table>
    </Menus>
  );
}

export default BookingTable;
