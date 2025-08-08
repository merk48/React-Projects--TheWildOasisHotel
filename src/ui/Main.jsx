import styled from "styled-components";

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 6rem;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 3rem 5rem;
  }

  @media (max-width: 640px) {
    padding: 2rem 4rem;
  }
`;

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
