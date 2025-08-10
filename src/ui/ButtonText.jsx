// ButtonText.jsx
import styled from "styled-components";

const ButtonText = styled.button`
  color: var(--color-brand-600);
  font-weight: 500;
  text-align: center;
  transition: all 0.3s;
  background: none;
  border: none;
  border-radius: var(--border-radius-sm);
  padding: 0.2rem 0.4rem;

  &:hover,
  &:active {
    color: var(--color-brand-700);
  }

  @media (max-width: 640px) {
    padding: 0.25rem 0.5rem;
    align-self: flex-start; /* if placed in a stacked heading group */
  }
`;

export default ButtonText;
