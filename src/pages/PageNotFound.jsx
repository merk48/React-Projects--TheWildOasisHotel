import styled from "styled-components";

import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";

const StyledPageNotFound = styled.main`
  min-height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    padding: 3.2rem;
  }

  @media (max-width: 640px) {
    padding: 2rem 1.2rem;
  }
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4.8rem;
  max-width: 96rem;
  width: 100%;
  box-sizing: border-box;
  text-align: center;

  & h1 {
    margin-bottom: 3.2rem;
  }

  @media (max-width: 1024px) {
    padding: 3.2rem;
  }

  @media (max-width: 640px) {
    padding: 2rem;
  }
`;

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <StyledPageNotFound>
      <Box>
        <Heading as="h1" variant="h1">
          The page you are looking for could not be found 😢
        </Heading>
        <button onClick={moveBack} size="large">
          &larr; Go back
        </button>
      </Box>
    </StyledPageNotFound>
  );
}

export default PageNotFound;
