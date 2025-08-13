import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { signUpKey } from "../../../utils/constants/queryConstants";
import { signUp as signUpApi } from "../../../services/apiAuth";

export const useSignUp = function () {
  const navigate = useNavigate();

  const { isPending: isSigningUp, mutate: SignUp } = useMutation({
    mutationKey: [signUpKey],
    mutationFn: signUpApi,
    onSuccess: () => {
      toast.success(
        "Account successfully created, Please verity the new accout from the user email address."
      );
      // in web sign uo in here we set the active user!

      navigate("/dashboard", { replace: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isSigningUp, SignUp };
};
