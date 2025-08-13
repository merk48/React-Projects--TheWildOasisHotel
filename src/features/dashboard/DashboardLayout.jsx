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
  /* fluid columns that auto-fit; min column is 280px (adjust if you want narrower) */
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2.2rem;
  grid-auto-rows: auto; /* don't force row heights */

  /* keep the "desktop" composition you had on wide screens */
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
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
      />
      <TodayActivity />

      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
