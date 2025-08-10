import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginKey } from "../../../utils/queryConstants";

export function useLogin() {
  const navigate = useNavigate();

  const { isPending: isLogging, mutate: login } = useMutation({
    mutationKey: [loginKey],
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess(data) {
      toast.success("Booking successfully deleted");
      console.log(data);
      navigate("/dashboard");
    },
    onError: (err) => toast.error(err.message),
  });

  return { isLogging, login };
}
