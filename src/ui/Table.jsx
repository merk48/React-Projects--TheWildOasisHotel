import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  display: block; /* ensure it can scroll */
  overflow-x: auto;

  @media (max-width: 640px) {
    margin: 0 -1.2rem;
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.columns};
  column-gap: 2.4rem;
  align-items: center;
  min-width: 550px;

  @media (max-width: 1024px) {
    grid-template-columns: ${(p) => p.columnsMd || p.columns};
    column-gap: 1.6rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: ${(p) => p.columnsSm || p.columnsMd || p.columns};
    column-gap: 1.2rem;
    padding: 0.8rem 1.2rem;
    min-width: 600px;
  }
`;

export const StyledHeader = styled(CommonRow)`
  /* background, text styles… */
  padding: 1.6rem 2.4rem;
  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  font-size: 2rem;

  @media (max-width: 1024px) {
    padding: 1.2rem 1.6rem;
    font-size: 1.8rem;
  }

  @media (max-width: 640px) {
    padding: 1rem 1.2rem;
    font-size: 1.6rem;
  }
`;

export const StyledRow = styled(CommonRow)`
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
  font-size: 1.6rem;

  @media (max-width: 1024px) {
    padding: 1rem 1.6rem;
    font-size: 1.4rem;
  }

  @media (max-width: 640px) {
    padding: 0.8rem 1.2rem;
    font-size: 1.2rem;
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

// 1.
const TableContext = createContext();

// 2.
function Table({ children, columns, columnsMd, columnsSm }) {
  return (
    <TableContext.Provider value={{ columns, columnsMd, columnsSm }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns, columnsMd, columnsSm } = useContext(TableContext);

  return (
    <StyledHeader
      as="header"
      role="row"
      columns={columns}
      columnsMd={columnsMd}
      columnsSm={columnsSm}
    >
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns, columnsMd, columnsSm } = useContext(TableContext);

  return (
    <StyledRow
      role="row"
      columns={columns}
      columnsMd={columnsMd}
      columnsSm={columnsSm}
    >
      {children}
    </StyledRow>
  );
}
function Body({ children }) {}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
