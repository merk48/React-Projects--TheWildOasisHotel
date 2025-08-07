import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";
import { useUrl } from "../hooks/useUrl";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
  @media (max-width: 768px) {
    gap: 0.3rem;
    padding: 0.3rem;
  }

  @media (max-width: 640px) {
    flex-wrap: wrap;
    gap: 0.2rem;
    padding: 0.2rem;
  }
`;

const StyledFilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const FilterContext = createContext();

export function Filter({ children, filterField }) {
  const [current, handleClick] = useUrl(filterField);

  return (
    <FilterContext.Provider value={{ handleClick, current }}>
      <StyledFilter role="group">{children}</StyledFilter>
    </FilterContext.Provider>
  );
}

export function Group({ filterField, options }) {
  return (
    <>
      {options.map((opt) => (
        <FilterButton key={opt.value} value={opt.value}>
          {opt.label}
        </FilterButton>
      ))}
    </>
  );
}

export function FilterButton({ value, children }) {
  const { handleClick, current } = useContext(FilterContext);
  const isActive = current === value;

  return (
    <StyledFilterButton
      onClick={() => handleClick(value)}
      active={isActive}
      disabled={isActive}
    >
      {children}
    </StyledFilterButton>
  );
}

Filter.Group = Group;
export default Filter;
