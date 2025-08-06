import styled from "styled-components";
import { useState } from "react";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "./../../utils/helpers";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";

export const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;
  min-width: 600px;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media (max-width: 1024px) {
    grid-template-columns: 0.8fr 2fr 2fr 1fr 1fr 0.8fr;
    padding: 1rem 1.6rem;
  }

  @media (max-width: 640px) {
    padding: 0.8rem 1.2rem;
  }
`;
export const Img = styled.img`
  display: block;
  min-width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

export const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

export const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
`;

export const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);

  @media (max-width: 640px) {
    font-size: 1.4rem;
  }
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
