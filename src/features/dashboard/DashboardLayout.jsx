import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings";
import Spinner from "./../../ui/Spinner";
import useRecentStays from "./hooks/useRecentStays";
import Status from "./Status";
import useCabins from "../../features/cabins/hooks/useCabins";

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
      <div>Todays activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
