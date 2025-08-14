import { useCabins } from "./hooks/useCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import AddCabin from "./AddCabin";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE } from "../../utils/constants/uiConstants";

function CabinTable() {
  const { isLoading, cabins, count, error } = useCabins();
  console.log(cabins);
  console.log(count);
  if (isLoading) return <Spinner />;

  if (!cabins) return <Empty resource="cabins" />;

  return (
    <Menus>
      <Table
        columns="0.6fr 1.8fr 1fr 1fr 1fr 0.2fr"
        columnsSm="0.8fr 1.6fr 0.8fr 0.8fr 0.8fr 0.2fr"
      >
        <Table.Header>
          <Table.HeaderCell></Table.HeaderCell>
          <Table.HeaderCell>Cabin</Table.HeaderCell>
          <Table.HeaderCell>Capacity</Table.HeaderCell>
          <Table.HeaderCell>Price</Table.HeaderCell>
          <Table.HeaderCell>Discount</Table.HeaderCell>
          <Table.HeaderCell></Table.HeaderCell>
        </Table.Header>

        <Table.Body
          data={cabins}
          render={(cabin) => <CabinRow key={cabin.id} cabin={cabin} />}
        />

        <Table.Footer>
          <Pagination count={count} pageSize={PAGE_SIZE} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default CabinTable;
