import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import TableOperations from "../../ui/TableOperations";

function CabinTableOperations() {
  const discountOptions = [
    { value: "all", label: "All" },
    { value: "no-discount", label: "No discount" },
    { value: "with-discount", label: "With discount" },
  ];
  const priceOptions = [
    { value: "all", label: "All" },
    { value: "<100", label: "under 100$" },
    { value: "<200", label: "under 200$" },
    { value: "<400", label: "under 400$" },
  ];
  const sortOptions = [
    { value: "name-asc", label: "Name (A → Z)" },
    { value: "name-desc", label: "Name (Z → A)" },
    { value: "price-asc", label: "Price (Low → High)" },
    { value: "price-desc", label: "Price (High → Low)" },
    { value: "capacity-asc", label: "Capacity (Low → High)" },
    { value: "capacity-desc", label: "Capacity (High → Low)" },
  ];
  return (
    <TableOperations>
      <Filter filterField="discount">
        <Filter.Group options={discountOptions} />
      </Filter>
      <Filter filterField="price">
        <Filter.Group options={priceOptions} />
      </Filter>

      <Sort.Select options={sortOptions} type="white" />
    </TableOperations>
  );
}

export default CabinTableOperations;
