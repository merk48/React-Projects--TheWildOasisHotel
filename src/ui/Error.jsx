// ui/Error.js
import styled from "styled-components";

const ErrorContainer = styled.div`
  text-align: center;
  padding: 2.4rem;
  color: var(--color-red-700);
  background-color: var(--color-red-100);
  border: 1px solid var(--color-red-300);
  border-radius: var(--border-radius-md);
  max-width: 50rem;
  margin: 2.4rem auto;
  font-size: 1.6rem;

  @media (max-width: 768px) {
    font-size: 1.4rem;
    padding: 1.6rem;
  }

  @media (max-width: 420px) {
    font-size: 1.2rem;
    padding: 1rem;
  }
`;

function Error({ error, fallback = "Something went wrong." }) {
  // Accepts either an Error object or a string
  const message =
    typeof error === "string" ? error : error?.message || fallback;

  return <ErrorContainer>{message}</ErrorContainer>;
}

export default Error;
