// Tag.jsx
import styled from "styled-components";

const Tag = styled.span`
  width: fit-content;
  text-transform: uppercase;
  font-size: 1.1rem;
  font-weight: 600;
  padding: 0.4rem 1.2rem;
  border-radius: 100px;

  color: ${(p) => `var(--color-${p.type}-700)`};
  background-color: ${(p) => `var(--color-${p.type}-100)`};

  @media (max-width: 1024px) {
    font-size: 1rem;
    padding: 0.36rem 1rem;
  }

  @media (max-width: 640px) {
    font-size: 0.95rem;
    padding: 0.3rem 0.8rem;
  }
`;

export default Tag;
