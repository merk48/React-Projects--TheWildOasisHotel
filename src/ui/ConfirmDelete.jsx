import styled from "styled-components";
import Button from "./Button";
import Heading from "./Heading";

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding: 2rem;

  @media (max-width: 768px) {
    width: 32rem;
    gap: 1rem;
  }

  @media (max-width: 640px) {
    width: 100%;
    gap: 0.8rem;
    padding: 0rem;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
    font-size: 1.5rem;

    @media (max-width: 640px) {
      font-size: 1.2rem;
    }
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;

    @media (max-width: 640px) {
      flex-direction: column-reverse;
      gap: 0.8rem;
    }
  }
`;

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading as="h3">Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      <div>
        <Button
          variation="secondary"
          disabled={disabled}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button variation="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
