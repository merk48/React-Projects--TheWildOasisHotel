import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { logoutKey } from "../../../utils/queryConstants";
import toast from "react-hot-toast";
import { logout as logoutApi } from "../../../services/apiAuth";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLoggingOut, mutate: logout } = useMutation({
    mutationKey: [logoutKey],
    mutationFn: logoutApi,
    onSuccess() {
      queryClient.removeQueries();

      navigate("/login", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { logout, isLoggingOut };
}
