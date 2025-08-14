import { useForm } from "react-hook-form";
import { useSignUp } from "./hooks/useSignUp";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {
    register,
    reset,
    formState: { errors },
    getValues,
    handleSubmit,
  } = useForm();

  const { isSigningUp, SignUp } = useSignUp();

  const basicValidations = (fieldName) => {
    return {
      required: `${fieldName} field is required`,
    };
  };

  function onSubmit({ email, password, fullName }) {
    SignUp(
      { email, password, fullName, avatar: "" },
      {
        onSettled: () => reset(),
      }
    );
  }
  function onError(errors) {
    // log error
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          {...register("fullName", {
            ...basicValidations("fullName"),
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          {...register("email", {
            ...basicValidations("email"),
            patters: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
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
          {...register("password", {
            ...basicValidations("password"),
            minLength: {
              value: 8,
              message: "Password needs a minimun of 8 characters",
            },
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          {...register("passwordConfirm", {
            ...basicValidations("passwordConfirm"),
            validate: (value) => value === getValues().password,
          })}
          disabled={isSigningUp}
        />
      </FormRow>

      <FormRow>
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button>{isSigningUp ? <SpinnerMini /> : "Create new user"}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
