import styled from "styled-components";
import { useState } from "react";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "./../../utils/helpers";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const [showForm, setShowForm] = useState(false);

  const { id, name, maxCapacity, image, discount, regularPrice } = cabin;

  const isWorking = isDeleting || isCreating;

  function handleDuplicate() {
    createCabin(
      { maxCapacity, name: `${name}Copy`, image, discount, regularPrice },
      true
    );
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Cabin>{maxCapacity}</Cabin>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <spam>-</spam>
        )}
        <div>
          <button onClick={handleDuplicate} disabled={isWorking}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => deleteCabin(id)} disabled={isWorking}>
            <HiTrash />
          </button>
          <button
            onClick={() => setShowForm((show) => !show)}
            disabled={isWorking}
          >
            <HiPencil />
          </button>
        </div>
      </TableRow>
      {showForm && <CreateUpdateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
