import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 20rem 1fr;
  }

  @media (max-width: 640px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
      />
      <Sidebar isOpen={isSidebarOpen} />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
