import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import { useCabins } from "./hooks/useCabins";

export const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow-x: auto;

  @media (max-width: 640px) {
    margin: 0 -1.2rem;
  }
`;

export const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
  font-size: 2rem !important;

  @media (max-width: 1024px) {
    grid-template-columns: 0.8fr 2fr 2fr 1fr 1fr 0.8fr;
    padding: 1.2rem 1.6rem;
    font-size: 1.8rem !important;
  }

  @media (max-width: 640px) {
    min-width: 600px;
    padding: 1rem 1.2rem;
    font-size: 1.6rem !important;
  }
`;

function CabinTable() {
  const { isLoading, cabins } = useCabins();

  if (isLoading) return <Spinner />;

  return (
    <Table role="table">
      <TableHeader>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
