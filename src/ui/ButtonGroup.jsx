import styled from "styled-components";

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.2rem;
  justify-content: flex-end;

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0.8rem;
  }
`;

export default ButtonGroup;
