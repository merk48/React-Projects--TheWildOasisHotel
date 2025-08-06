import Button from "../../ui/Button";
import CreateUpdateCabinForm from "./CreateUpdateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="add-cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Open>
        <Modal.Window name="add-cabin-form">
          <CreateUpdateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
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
