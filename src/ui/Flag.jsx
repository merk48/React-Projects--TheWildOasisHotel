// src/ui/Flag.jsx
import styled from "styled-components";

export const Flag = styled.img`
  max-width: 2rem;
  width: 100%;
  height: auto;
  border-radius: var(--border-radius-tiny);
  display: block;
  border: 1px solid var(--color-grey-100);

  @media (max-width: 768px) {
    max-width: 1.8rem;
  }

  @media (max-width: 420px) {
    max-width: 1.6rem;
  }
`;
