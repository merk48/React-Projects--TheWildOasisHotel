import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();
  // 1) Define your filter‐value → predicate mapping
  const filterFns = {
    discount: {
      all: () => true,
      "no-discount": (c) => c.discount === 0,
      "with-discount": (c) => c.discount > 0,
    },
    price: {
      all: () => true,
      "<100": (c) => c.regularPrice < 100,
      "<200": (c) => c.regularPrice < 200,
      "<400": (c) => c.regularPrice < 400,
    },
  };

  // --- 2) sort comparator map
  const sortFns = {
    "name-asc": (a, b) => a.name.localeCompare(b.name),
    "name-desc": (a, b) => b.name.localeCompare(a.name),
    "price-asc": (a, b) => a.regularPrice - b.regularPrice,
    "price-desc": (a, b) => b.regularPrice - a.regularPrice,
    "capacity-asc": (a, b) => a.maxCapacity - b.maxCapacity,
    "capacity-desc": (a, b) => b.maxCapacity - a.maxCapacity,
  };

  // 3) Read current filter values (with defaults)
  const currentFilters = {
    discount: searchParams.get("discount") || "all",
    price: searchParams.get("price") || "all",
  };

  const currentSort = searchParams.get("sortBy") || "";

  if (isLoading) return <Spinner />;

  // 4) Compose a single filtered array
  const filtered = cabins.filter((c) =>
    Object.entries(currentFilters).every(([field, value]) =>
      filterFns[field][value]?.(c)
    )
  );

  // --- 5) apply sorting (in-place sort on a shallow copy)
  const finalList = currentSort
    ? [...filtered].sort(sortFns[currentSort])
    : filtered;

  return (
    <Menus>
      <Table
        columns="0.6fr 1.8fr 1fr 1fr 1fr 0.2fr"
        columnsSm="0.8fr 1.6fr 0.8fr 0.8fr 0.8fr 0.2fr"
      >
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={finalList}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
