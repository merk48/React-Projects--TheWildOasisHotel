import { DASHBOARD_CONFIG } from "../../utils/configs/dashboardConfig";
import Filter from "./../../ui/Filter";

function DashboardFilter() {
  return (
    <Filter
      filterField={DASHBOARD_CONFIG.FILTERS.LAST.PARAM}
      defaultValue={DASHBOARD_CONFIG.FILTERS.LAST.DEFAULT}
      resetPageOnChange={false}
    >
      <Filter.Group options={DASHBOARD_CONFIG.FILTERS.LAST.OPTIONS} />
    </Filter>
  );
}

export default DashboardFilter;
