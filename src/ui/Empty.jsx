import styled from "styled-components";

const EmptyMsg = styled.p`
  text-align: center;
  font-size: 1.6rem;
  color: var(--color-grey-500);
  margin: 2.4rem 0;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    margin: 1.6rem 0;
  }

  @media (max-width: 420px) {
    font-size: 1.2rem;
    margin: 1rem 0;
    padding: 0 1.2rem;
  }
`;

function Empty({ resource = "items" }) {
  return <EmptyMsg>No {resource} could be found.</EmptyMsg>;
}

export default Empty;
