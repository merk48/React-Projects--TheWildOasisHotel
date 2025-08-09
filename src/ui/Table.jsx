import { createContext, useContext } from "react";
import styled from "styled-components";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  display: block;
  min-width: ${(p) =>
    typeof p.$minWidth === "number"
      ? `${p.$minWidth}px`
      : p.$minWidth || "700px"};
  height: 100%;
  height: 100%;

  @media (max-width: 640px) {
    min-width: ${(p) =>
      typeof p.$minWidthSm === "number"
        ? `${p.$minWidthSm}px`
        : p.$minWidthSm ?? "600px"};
  }
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(p) => p.columns};
  column-gap: 2.4rem;
  align-items: center;

  @media (max-width: 1024px) {
    grid-template-columns: ${(p) => p.columnsMd || p.columns};
    column-gap: 1.8rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: ${(p) => p.columnsSm || p.columnsMd || p.columns};
    column-gap: 1.4rem;
    padding: 0.8rem 1.2rem;
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

const CellBase = styled.div`
  min-width: 0; /* allows the column to shrink instead of expanding grid */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

/* header cell reuses same layout but with header styles */
export const HeaderCell = styled(CellBase)`
  /* header cell-specific styling is applied at header row level,
     but you can add here if needed */
`;

/* body cell */
export const Cell = styled(CellBase)`
  /* body cell specific styles (font-size etc can be inherited from StyledRow) */
`;

const StyledBody = styled.section`
  flex: 1; /* take all remaining space */
  min-height: 300px; /* good height even if few rows */
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  border-top: 1px solid var(--color-grey-200);
  padding: 1rem;
  background-color: var(--color-grey-50);
  display: flex;
  padding: 1.2rem;
  min-width: 100%;

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
function Table({
  children,
  columns,
  columnsMd,
  columnsSm,
  minWidth,
  minWidthSm,
}) {
  return (
    <TableContext.Provider value={{ columns, columnsMd, columnsSm }}>
      <StyledTable role="table" $minWidth={minWidth} $minWidthSm={minWidthSm}>
        {children}
      </StyledTable>
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
function Body({ data, render }) {
  if (!data.length) return <Empty>No data to show at the moment</Empty>;
  return <StyledBody>{data.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;
Table.Cell = Cell;
Table.HeaderCell = HeaderCell;

export default Table;
