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

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

const Backdrop = styled.div`
  @media (max-width: 640px) {
    display: block;
    position: fixed;
    inset: 0; /* top/right/bottom/left: 0 */
    background: rgba(0, 0, 0, 0.3);
    z-index: 40;
  }
`;

function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <StyledAppLayout>
      <Header
        isSidebarOpen={isSidebarOpen}
        onToggleSidebar={setIsSidebarOpen}
      />
      <Sidebar isOpen={isSidebarOpen} />
      {isSidebarOpen && <Backdrop onClick={() => setIsSidebarOpen(false)} />}
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
