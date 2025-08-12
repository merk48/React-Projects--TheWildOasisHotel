import styled from "styled-components";

const StyledDataItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.8rem 0;

  @media (max-width: 768px) {
    gap: 1.2rem;
    padding: 0.6rem 0;
  }

  /* stack on very small screens */
  @media (max-width: 420px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.6rem;
  }
`;

const Label = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-weight: 500;

  & svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-brand-600);
  }

  @media (max-width: 768px) {
    & svg {
      width: 1.8rem;
      height: 1.8rem;
    }
  }

  @media (max-width: 420px) {
    width: 100%;
    gap: 0.6rem;
  }
`;
