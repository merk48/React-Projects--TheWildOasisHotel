import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";
import { CABIN_CONFIG } from "../../utils/configs/cabinConfig";

function CabinTableOperations() {
  const discountConfig = CABIN_CONFIG.FILTERS.DISCOUNT;
  const priceConfig = CABIN_CONFIG.FILTERS.PRICE;
  const sortConfig = CABIN_CONFIG.SORT;

  return (
    <TableOperations>
      <Filter
        filterField={discountConfig.PARAM}
        defaultValue={discountConfig.DEFAULT}
      >
        <Filter.Group options={discountConfig.OPTIONS} />
      </Filter>
      <Filter
        filterField={priceConfig.PARAM}
        defaultValue={priceConfig.DEFAULT}
      >
        <Filter.Group options={priceConfig.OPTIONS} />
      </Filter>

      <Sort.Select
        options={sortConfig.OPTIONS}
        defaultValue={sortConfig.DEFAULT}
        type="white"
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
