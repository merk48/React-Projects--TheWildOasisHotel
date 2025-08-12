import Filter from "./../../ui/Filter";

function DashboardFilter() {
  const filterOptions = [
    { value: "7", label: "Last 7 days" },
    { value: "30", label: "Last 30 days" },
    { value: "90", label: "Last 90 days" },
  ];
  return (
    <Filter filterField="last" defaultValue={filterOptions[0].value}>
      <Filter.Group options={filterOptions} />
    </Filter>
  );
}

export default DashboardFilter;
