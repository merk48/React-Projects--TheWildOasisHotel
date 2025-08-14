import { useForm } from "react-hook-form";
import { useSignUp } from "./hooks/useSignUp";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { yupResolver } from "@hookform/resolvers/yup";
import { signupSchema } from "../../utils/validations/schemas";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(signupSchema),
  });

  const { isSigningUp, SignUp } = useSignUp();

  function onSubmit({ email, password, fullName }) {
    SignUp(
      { email, password, fullName, avatar: "" },
      {
        onSettled: () => reset(),
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName")}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email")}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          {...register("password")}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm")}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isSigningUp}>
          {isSigningUp ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
