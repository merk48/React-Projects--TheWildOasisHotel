// FileInput.js
import styled from "styled-components";

const FileInput = styled.input.attrs({ type: "file" })`
  font-size: 1.4rem;
  border-radius: var(--border-radius-sm);

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }

  @media (max-width: 640px) {
    font-size: 1.2rem;
  }

  &::file-selector-button {
    font: inherit;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    margin-right: 1.2rem;
    border-radius: var(--border-radius-sm);
    border: none;
    color: var(--color-brand-50);
    background-color: var(--color-brand-600);
    cursor: pointer;
    transition: color 0.2s, background-color 0.2s;

    @media (max-width: 768px) {
      padding: 0.6rem 1rem;
    }

    @media (max-width: 640px) {
      padding: 0.5rem 0.8rem;
    }

    &:hover {
      background-color: var(--color-brand-700);
    }
  }
`;

export default FileInput;
