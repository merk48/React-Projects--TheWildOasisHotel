import styled from "styled-components";
import useRecentBookings from "./hooks/useRecentBookings";
import Spinner from "./../../ui/Spinner";
import useRecentStays from "./hooks/useRecentStays";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoadingBooks, books, errorBooks } = useRecentBookings();

  const { isLoadingStays, stays, confirmedStays, errorStays } =
    useRecentStays();

  const isLoading = isLoadingBooks || isLoadingStays;

  if (isLoading) return <Spinner />;

  return (
    <StyledDashboardLayout>
      <div>Statistics</div>
      <div>Todays activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
