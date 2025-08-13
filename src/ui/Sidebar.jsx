import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
// import Uploader from "../data/Uploader";
import { useOutsideClick } from "../hooks/useOutsideClick";
import Overlay from "./Overlay";
import { useSidebar } from "../contexts/SidebarContext";

const StyledSidebar = styled.aside`
  padding: 3.2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    padding: 2.4rem 1.6rem;
    transform: translateX(${(props) => (props.$isOpen ? "0" : "-100%")});
    transition: transform 0.3s ease-in-out;
    z-index: 2000;
  }

  @media (max-width: 640px) {
    width: 20rem;
    padding: 2rem 1.2rem;
  }
`;

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen, isDesktop } = useSidebar();
  const { ref } = useOutsideClick(() => setIsSidebarOpen(false), true);

  return (
    <>
      <StyledSidebar ref={ref} $isOpen={isSidebarOpen}>
        <Logo />
        <MainNav />
        {/* <Uploader /> */}
      </StyledSidebar>
      {isSidebarOpen && !isDesktop && <Overlay />}
    </>
  );
}

export default Sidebar;
