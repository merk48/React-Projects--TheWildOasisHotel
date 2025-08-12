import DashboardLayout from "../features/dashboard/DashboardLayout";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardFilter from "../features/dashboard/DashboardFilter";

function Dashboard() {
  return (
    <>
      <Row type="mix">
        <Heading as="h1" variant="h1">
          Dashboard
        </Heading>
        <DashboardFilter />
      </Row>
      <Row>
        <DashboardLayout />
      </Row>
    </>
  );
}

export default Dashboard;
