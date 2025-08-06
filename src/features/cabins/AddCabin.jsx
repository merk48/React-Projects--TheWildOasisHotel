import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open opens="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>
      <Modal.Window name="cabin-form">
        <CreateUpdateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

// <Modal>
//   <Modal.Open opens="table">
//     <Button>Show table</Button>
//   </Modal.Open>
//   <Modal.Window name="table">
//     <CabinTable />
//   </Modal.Window>
// </Modal>

export default AddCabin;
