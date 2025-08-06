import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";

function DeleteCabin({ disabled, onConfirm }) {
  return (
    <div>
      <Modal>
        <Modal.Open opens="delete-cabin-confirm">
          <button disabled={disabled}>
            <HiTrash />
          </button>
        </Modal.Open>
        <Modal.Window name="delete-cabin-confirm">
          <ConfirmDelete
            resourceName="cabin"
            onConfirm={onConfirm}
            disabled={disabled}
          />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default DeleteCabin;
