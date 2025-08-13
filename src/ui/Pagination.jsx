import styled from "styled-components";
import { HiChevronDoubleLeft, HiChevronDoubleRight } from "react-icons/hi2";
import { useUrl } from "../hooks/useUrl";
import { PAGE_SIZE } from "../config";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

const Info = styled.div`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }

  @media (max-width: 640px) {
    font-size: 1.2rem;
    margin-left: 0;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 3rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.active ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.active ? "var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.2s;
  cursor: pointer;
  white-space: nowrap;

  &:disabled {
    opacity: 0.5;
    cursor: default;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media (max-width: 480px) {
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;

    & span {
      display: none; /* Hide text like "Previous"/"Next" on very small screens */
    }
  }
`;

function getPageRange(current, totalPages, maxButtons = 5) {
  // clamp
  const total = Math.max(1, totalPages);
  const cur = Math.min(Math.max(1, current), total);

  const half = Math.floor(maxButtons / 2);
  let start = Math.max(1, cur - half);
  let end = Math.min(total, start + maxButtons - 1);

  // if end is at the end, push start back if possible
  start = Math.max(1, end - maxButtons + 1);

  const pages = [];
  for (let i = start; i <= end; i++) pages.push(i);
  return pages;
}

/**
 * Pagination props:
 *  - count: total items
 *  - pageSize: items per page (default 10)
 *  - pageParamName: name of page query param (default 'page')
 *  - maxButtons: how many numbered buttons to show (default 5)
 *  - onPageChange: optional callback (page) => void
 */
export default function Pagination({
  count = 0,
  pageSize = PAGE_SIZE,
  pageParamName = "page",
  maxButtons = 5,
  onPageChange,
}) {
  const totalPages = Math.max(1, Math.ceil((Number(count) || 0) / pageSize));

  // uses useUrl for 'page' param and ensures a numeric default of 1
  const [currentPage, setPage] = useUrl(pageParamName, {
    type: "number",
    defaultValue: 1,
    pageParamName,
    resetPageOnChange: true,
  });

  // ensure currentPage exists and is within range
  const current = Math.min(Math.max(1, Number(currentPage) || 1), totalPages);

  const goTo = (p) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
    if (typeof onPageChange === "function") onPageChange(next);
  };

  const nextPage = () => goTo(current + 1);
  const prevPage = () => goTo(current - 1);

  const pages = getPageRange(current, totalPages, maxButtons);

  const startIndex = (current - 1) * pageSize + 1;
  const endIndex = Math.min(count, current * pageSize);

  return (
    <StyledPagination>
      <Info>
        {count === 0 ? (
          <>No results</>
        ) : (
          <>
            Showing <span>{startIndex}</span> to <span>{endIndex}</span> of{" "}
            <span>{count}</span> results
          </>
        )}
      </Info>

      <Buttons>
        <PaginationButton
          onClick={prevPage}
          disabled={current <= 1}
          aria-label="Previous"
        >
          <HiChevronDoubleLeft />
          <span>Previous</span>
        </PaginationButton>

        {pages[0] > 1 && (
          <>
            <PaginationButton onClick={() => goTo(1)}>1</PaginationButton>
            {pages[0] > 2 && <span style={{ padding: "0 0.6rem" }}>…</span>}
          </>
        )}

        {pages.map((p) => (
          <PaginationButton
            key={p}
            onClick={() => goTo(p)}
            active={p === current}
            aria-current={p === current ? "page" : undefined}
          >
            {p}
          </PaginationButton>
        ))}

        {pages[pages.length - 1] < totalPages && (
          <>
            {pages[pages.length - 1] < totalPages - 1 && (
              <span style={{ padding: "0 0.6rem" }}>…</span>
            )}
            <PaginationButton onClick={() => goTo(totalPages)}>
              {totalPages}
            </PaginationButton>
          </>
        )}

        <PaginationButton
          onClick={nextPage}
          disabled={current >= totalPages}
          aria-label="Next"
        >
          <span>Next</span>
          <HiChevronDoubleRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}
