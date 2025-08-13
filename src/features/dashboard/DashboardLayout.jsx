import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings";
import Spinner from "./../../ui/Spinner";
import useRecentStays from "./hooks/useRecentStays";
import Status from "./Status";
import SalesChart from "./SalesChart";
import useCabins from "../../features/cabins/hooks/useCabins";
import DurationChart from "./DurationChart";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoadingBooks, bookings, errorBooks } = useRecentBookings();

  const { isLoadingStays, stays, confirmedStays, errorStays, numDays } =
    useRecentStays();

  const { isLoading: isLoadingCabins, cabins } = useCabins();

  const isLoading = isLoadingBooks || isLoadingStays || isLoadingCabins;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <Status
        bookings={bookings}
        confirmedStays={confirmedStays}
        numDays={numDays}
        cabinCount={cabins.length}
      ></Status>
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
