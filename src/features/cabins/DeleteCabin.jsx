import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { HiTrash } from "react-icons/hi2";
import Menus from "../../ui/Menus";

function DeleteCabin({ disabled, onConfirm, id }) {
  return (
    <>
      <Modal.Open opens={`delete-cabin-form-${id}`}>
        {/* // context menu component */}
        <Menus.Button icon={<HiTrash />} disabled={disabled}>
          Delete
        </Menus.Button>
      </Modal.Open>
      <Modal.Window name={`delete-cabin-form-${id}`}>
        <ConfirmDelete
          resourceName="cabin"
          onConfirm={onConfirm}
          disabled={disabled}
        />
      </Modal.Window>
    </>
  );
}

export default DeleteCabin;
