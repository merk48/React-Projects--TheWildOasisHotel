import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import { useSidebar } from "../contexts/SidebarContext";
import ButtonIcon from "./ButtonIcon";
import { HiBars3, HiBars3BottomRight } from "react-icons/hi2";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2.4rem;

  @media (max-width: 1024px) {
    padding: 1rem 2.4rem;
    gap: 1.6rem;
  }

  @media (max-width: 640px) {
    padding: 0.8rem 1.2rem;
    justify-content: space-between; /* allow toggle to sit left and avatar right */
    gap: 1rem;
  }

  @media (max-width: 420px) {
    padding: 0.6rem 0.8rem;
  }

  .toggle-button {
    outline: none;
    border: none;
    cursor: pointer;
    margin-right: auto;
    display: inline-flex;
    @media (min-width: 768px) {
      display: none;
    }
  }
`;

function Header() {
  const { isSidebarOpen, setIsSidebarOpen, isDesktop } = useSidebar();

  return (
    <StyledHeader>
      {!isDesktop && (
        <ButtonIcon
          onClick={() => setIsSidebarOpen(true)}
          className="toggle-button"
        >
          {isSidebarOpen ? <HiBars3BottomRight /> : <HiBars3 />}
        </ButtonIcon>
      )}
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
