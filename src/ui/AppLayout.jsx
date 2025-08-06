import styled from "styled-components";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import Overlay from "./Overlay";
import ModalProvider from "../contexts/modalContext";

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
  padding: 0 2.4rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
  }

  @media (max-width: 640px) {
    gap: 1.8rem;
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
      <Sidebar isOpen={isSidebarOpen} onClose={setIsSidebarOpen} />
      {isSidebarOpen && <Overlay />}
      <Main>
        <Container>
          <ModalProvider>
            <Outlet />
          </ModalProvider>
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
