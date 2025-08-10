import styled from "styled-components";
import { useUser } from "../features/authentication/hooks/useUser";
import Spinner from "./Spinner";
import { Navigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  // [1] Load the authenticated user
  const { isLoading, isFetching, isAuthenticated } = useUser();

  // [2] show the spinner
  if (isLoading || isFetching)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // [3] if not there , redirect to the /login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // [4] if there is a user, render the app
  return children;
}

export default ProtectedRoute;
