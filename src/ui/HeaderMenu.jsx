import styled from "styled-components";
import Logout from "../features/authentication/Logout";
import ButtonIcon from "./ButtonIcon";
import { HiBars3, HiBars3BottomRight, HiOutlineUser } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useSidebar } from "../contexts/sidebarContext";
// import DarkModeToggle from "./DarkModeToggle";

const StyledHeaderMenu = styled.ul`
  display: flex;
  gap: 0.4rem;
`;

function HeaderMenu() {
  const navigate = useNavigate();
  const { isModalSidebarOpen, openSidebar } = useSidebar();

  return (
    <StyledHeaderMenu>
      <li>
        <ButtonIcon onClick={() => navigate("/account")}>
          <HiOutlineUser />
        </ButtonIcon>
      </li>
      {/* <li>
        <DarkModeToggle />
      </li> */}
      <li>
        <Logout />
      </li>
      <li>
        <ButtonIcon onClick={openSidebar} className="toggle-button">
          {isModalSidebarOpen ? <HiBars3BottomRight /> : <HiBars3 />}
        </ButtonIcon>
      </li>
    </StyledHeaderMenu>
  );
}

export default HeaderMenu;
