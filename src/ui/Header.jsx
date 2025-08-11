import styled from "styled-components";
import { HiBars3BottomRight, HiBars3 } from "react-icons/hi2";
import Button from "./Button";
import Logout from "../features/authentication/Logout";
import HeaderMenu from "./HeaderMenu";
import { useSidebar } from "../contexts/sidebarContext";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .toggle-button {
    font-size: 2rem;
    outline: none;
    border: none;
    cursor: pointer;

    @media (min-width: 768px) {
      display: none;
    }
  }
`;

function Header() {
  return (
    <StyledHeader>
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
