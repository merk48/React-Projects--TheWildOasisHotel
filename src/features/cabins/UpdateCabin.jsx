import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";
import { HiPencil } from "react-icons/hi2";

function UpdateCabin({ cabin, disabled }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="edit-cabin-form">
          <button disabled={disabled}>
            <HiPencil />
          </button>
        </Modal.Open>
        <Modal.Window name="edit-cabin-form">
          <CreateUpdateCabinForm cabinToEdit={cabin} />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UpdateCabin;
