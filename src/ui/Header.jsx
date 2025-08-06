import styled from "styled-components";
import { HiBars3BottomRight, HiBars3 } from "react-icons/hi2";

const StyledHeader = styled.header`
  padding: 1.2rem 4.8rem;
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .toggle-button {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;

    @media (min-width: 640px) {
      display: none;
    }
  }
`;

function Header({ isSidebarOpen, onToggleSidebar }) {
  return (
    <StyledHeader>
      <span>header</span>
      <button onClick={onToggleSidebar} className="toggle-button">
        {isSidebarOpen ? <HiBars3BottomRight /> : <HiBars3 />}
      </button>
    </StyledHeader>
  );
}

export default Header;
