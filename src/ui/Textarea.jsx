// Textarea.js
import styled from "styled-components";

const Textarea = styled.textarea`
  padding: 0.8rem 1.2rem;
  border: 1px solid var(--color-grey-300);
  border-radius: 5px;
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  width: 100%;
  height: 8rem;

  @media (max-width: 768px) {
    padding: 0.6rem 1rem;
    height: 6rem;
  }

  @media (max-width: 640px) {
    padding: 0.5rem 0.8rem;
    height: 5rem;
  }
`;

export default Textarea;
