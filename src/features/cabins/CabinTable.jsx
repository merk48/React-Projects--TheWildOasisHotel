import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";
import Table from "../../ui/Table";

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
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

      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
