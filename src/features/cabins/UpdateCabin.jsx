import { HiPencil } from "react-icons/hi2";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";

function UpdateCabin({ cabin, id }) {
  return (
    <>
      <Modal.Open opens={`edit-cabin-form-${id}`}>
        {/* // context menu component */}
        <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
      </Modal.Open>
      <Modal.Window name={`edit-cabin-form-${id}`}>
        <CreateUpdateCabinForm cabinToEdit={cabin} />
      </Modal.Window>
    </>
  );
}

export default UpdateCabin;
