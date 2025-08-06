import styled from "styled-components";
import { useDeleteCabin } from "./hooks/useDeleteCabin";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import { formatCurrency } from "./../../utils/helpers";
import UpdateCabin from "./UpdateCabin";
import DeleteCabin from "./DeleteCabin";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";

export const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);

  @media (max-width: 640px) {
    width: 5rem;
  }
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

  const { id, name, maxCapacity, image, discount, regularPrice } = cabin;

  const isWorking = isDeleting || isCreating;

  function handleDuplicate() {
    createCabin(
      { maxCapacity, name: `${name}Copy`, image, discount, regularPrice },
      true
    );
  }

  return (
    <Modal>
      <Table.Row>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <Cabin>{maxCapacity}</Cabin>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>-</span>
        )}
        <Menus.Menu>
          <Menus.Toggle id={id} />
          <Menus.List id={id}>
            <Menus.Button
              disabled={isWorking}
              icon={<HiSquare2Stack />}
              onClick={handleDuplicate}
            >
              Duplicate
            </Menus.Button>
            <Modal.Open opens={`edit-cabin-form-${id}`}>
              {/* // context menu component */}
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens={`delete-cabin-form-${id}`}>
              {/* // context menu component */}
              <Menus.Button icon={<HiTrash />} disabled={isWorking}>
                Delete
              </Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name={`edit-cabin-form-${id}`}>
            <CreateUpdateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name={`delete-cabin-form-${id}`}>
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteCabin(id)}
              disabled={isWorking}
            />
          </Modal.Window>
        </Menus.Menu>
      </Table.Row>
    </Modal>
  );
}

export default CabinRow;
//             <UpdateCabin id={id} disabled={isWorking} cabin={cabin} />

// <DeleteCabin
//               id={id}
//               disabled={isWorking}
//               onConfirm={() => deleteCabin(id)}
//             />
