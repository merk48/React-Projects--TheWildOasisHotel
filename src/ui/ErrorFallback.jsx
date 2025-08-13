// src/ui/ErrorFallback.jsx (or wherever you keep it)
import styled from "styled-components";
import Heading from "./Heading";
import GlobalStyles from "../styles/GlobalStyles";
import Button from "./Button";

const StyledErrorFallback = styled.main`
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
  width: 100%;
  max-width: 96rem;
  text-align: center;
  box-sizing: border-box;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: "Sono";
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }

  @media (max-width: 1024px) {
    padding: 3.2rem;
  }

  @media (max-width: 640px) {
    padding: 1.6rem;
  }
`;

export default function ErrorFallback({
  title = "Something went wrong",
  error,
  resetErrorBoundary,
}) {
  return (
    <>
      <GlobalStyles />
      <StyledErrorFallback>
        <Box>
          <Heading as="h1" variant="h1">
            {title}
          </Heading>

          <p>{error?.message}</p>
          <Button variant="primary" size="large" onClick={resetErrorBoundary}>
            Try again
          </Button>
        </Box>
      </StyledErrorFallback>
    </>
  );
}
