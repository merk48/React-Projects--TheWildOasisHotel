import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginKey, readUserKey } from "../../../utils/constants/queryConstants";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isLogging, mutate: login } = useMutation({
    mutationKey: [loginKey],
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess(data) {
      toast.success("Successfully Logged in");

      if (data?.user) {
        queryClient.setQueryData([readUserKey], data.user);
      }

      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLogging, login };
}
