import Heading from "../ui/Heading";
import Row from "../ui/Row";
import BookingTable from "../features/bookings/BookingTable";

function Bookings() {
  return (
    <>
      <Row type="mix">
        <Heading as="h1">All Bookings</Heading>
        {/* <BookingsTableOperations /> */}
      </Row>
      <BookingTable />
      {/* <AddBooking /> */}
    </>
  );
}

export default Bookings;
