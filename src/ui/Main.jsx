import styled from "styled-components";

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  overflow-y: scroll;
  overflow-x: hidden;

  @media (max-width: 768px) {
    padding: 3.2rem 3.2rem 5.6rem;
  }

  @media (max-width: 640px) {
    padding: 2.4rem 1.6rem 4.8rem;
  }
`;

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
