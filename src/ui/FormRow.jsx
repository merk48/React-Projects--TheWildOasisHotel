import styled from "styled-components";

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;
  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    padding-bottom: 0;
  }
  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 1.2rem;
  }

  @media (max-width: 640px) {
    display: flex;
    flex-direction: ${(p) =>
      p.$direction === "reverse" ? "column-reverse" : "column"};
    align-items: stretch;
    gap: 0.8rem;
    border: none;
    padding: 0.8rem 0;

    &:not(:last-child) {
      border-bottom: 1px solid var(--color-grey-100);
    }
  }
`;

const Label = styled.label`
  font-weight: 500;
  @media (max-width: 640px) {
    margin-bottom: 0.4rem;
  }
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);

  @media (max-width: 768px) {
    grid-column: 1 / -1; /* Span all columns in grid */
  }

  @media (max-width: 640px) {
    margin-top: 0.4rem;
    width: 100%; /* Ensure it fills full width in flex layout */
  }
`;

function FormRow({ children, label, error, direction }) {
  return (
    <StyledFormRow $direction={direction}>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
