import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings";
import Spinner from "./../../ui/Spinner";
import useRecentStays from "./hooks/useRecentStays";
import Status from "./Status";
import SalesChart from "./SalesChart";
import useCabins from "../../features/cabins/hooks/useCabins";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.2rem;
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
      <TodayActivity />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
