import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    padding: 2.4rem 1.6rem;
  }

  @media (max-width: 640px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    width: 20rem;
    padding: 2rem 1.2rem;
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    transition: transform 0.3s ease-in-out;
    z-index: 2000;
  }
`;

function Sidebar({ isOpen }) {
  return (
    <StyledSidebar $isOpen={isOpen}>
      <Logo />
      <MainNav />
    </StyledSidebar>
  );
}

export default Sidebar;
