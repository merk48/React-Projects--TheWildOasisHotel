import styled from "styled-components";
import { useUrl } from "../hooks/useUrl";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);

  @media (max-width: 768px) {
    font-size: 1.3rem;
    padding: 0.6rem 1rem;
  }

  @media (max-width: 640px) {
    font-size: 1.2rem;
    padding: 0.4rem 0.8rem;
  }
`;

function SortSelect({
  options,
  sortField = "sortBy",
  // eslint-disable-next-line no-unused-vars
  placeholder = "Sort by...",
  defaultValue = "",
  writeDefaultToUrl = false,
  ...props
}) {
  const [current, setSort] = useUrl(sortField, {
    type: "string",
    defaultValue,
    writeDefaultToUrl,
  });

  return (
    <StyledSelect
      value={current ?? ""}
      onChange={(e) => setSort(e.target.value)}
      {...props}
    >
      {options.map((opt) => (
        <SortOption key={opt.value} value={opt.value}>
          {opt.label}
        </SortOption>
      ))}
    </StyledSelect>
  );
}

function SortOption({ value, disabled, children }) {
  return (
    <option value={value} disabled={disabled}>
      {children}
    </option>
  );
}

const Sort = {
  Select: SortSelect,
  Option: SortOption,
};

export default Sort;
