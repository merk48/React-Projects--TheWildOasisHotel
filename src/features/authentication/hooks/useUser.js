import { useQuery } from "@tanstack/react-query";
import { readLoggedInUser } from "../../../services/apiAuth";
import { readUserKey } from "../../../utils/constants/queryConstants";
import { AUTHENTICATED_KEYWORD } from "../../../utils/helpers/supabaseQueryHelpers";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
    isFetching,
  } = useQuery({
    queryKey: [readUserKey],
    queryFn: readLoggedInUser,
    onSuccess() {},
    onError: (err) => console.error(err.message),
    staleTime: 1000 * 60 * 5,
  });

  const isAuthenticated = Boolean(
    user?.role === AUTHENTICATED_KEYWORD || user?.id
  );

  return {
    isFetching,
    isLoading,
    user,
    error,
    isAuthenticated,
  };
}
