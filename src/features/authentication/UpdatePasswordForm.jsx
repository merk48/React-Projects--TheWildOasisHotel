import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useUpdateUser } from "./hooks/useUpdateUser";
import SpinnerMini from "../../ui/SpinnerMini";
import { passwordSchema } from "../../utils/validations/schemas";

function UpdatePasswordForm() {
  const { register, handleSubmit, formState, reset } = useForm({
    resolver: yupResolver(passwordSchema),
  });

  const { errors } = formState;

  const { updateUser, isUpdating } = useUpdateUser();

  function onSubmit({ password }) {
    updateUser({ password }, { onSuccess: () => reset() });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 8 chars)"
        error={errors?.password?.message}
      >
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password")}
        />
      </FormRow>

      <FormRow
        label="Confirm password"
        error={errors?.passwordConfirm?.message}
      >
        <Input
          type="password"
          autoComplete="new-password"
          id="passwordConfirm"
          disabled={isUpdating}
          {...register("passwordConfirm")}
        />
      </FormRow>
      <FormRow>
        <Button onClick={reset} type="reset" variation="secondary">
          Reset
        </Button>
        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Update password"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdatePasswordForm;
