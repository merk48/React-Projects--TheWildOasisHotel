import styled from "styled-components";

const StyledStat = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 1.6rem;
  display: grid;

  /* grid adapts to narrow screens:
     icon column fixed, content flexible */
  grid-template-columns: minmax(48px, 6.4rem) 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media (max-width: 640px) {
    padding: 1.2rem;
    grid-template-columns: minmax(40px, 4.8rem) 1fr;
    column-gap: 1rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* responsive icon background using color prop */
  background-color: var(--color-${(p) => p.color}-100);

  & svg {
    /* clamp makes icons scale across breakpoints */
    width: clamp(1.8rem, 2.2vw, 3.2rem);
    height: clamp(1.8rem, 2.2vw, 3.2rem);
    color: var(--color-${(p) => p.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.35px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media (max-width: 640px) {
    font-size: 1rem;
  }
`;

const Value = styled.p`
  font-size: clamp(1.4rem, 2.4vw, 2.4rem);
  line-height: 1;
  font-weight: 500;
  margin: 0;
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
