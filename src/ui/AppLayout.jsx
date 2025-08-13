import styled from "styled-components";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import SidebarProvider from "../contexts/sidebarContext";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-rows: auto 1fr;
  grid-template-columns: 26rem 1fr;

  @media (max-width: 1024px) {
    grid-template-columns: 20rem 1fr;
  }

  @media (max-width: 768px) {
    grid-template-rows: auto 1fr;
    grid-template-columns: 1fr;
  }
`;

const Container = styled.div`
  /* max-width: 120rem; */
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media (max-width: 768px) {
    gap: 2.5rem;
  }

  @media (max-width: 640px) {
    gap: 1.8rem;
  }
`;

function AppLayout() {
  return (
    <StyledAppLayout>
      <SidebarProvider>
        <Header />
        <Sidebar />
      </SidebarProvider>
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
