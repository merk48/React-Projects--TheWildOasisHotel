import styled from "styled-components";

const StyledMain = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;

function Main({ children }) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
