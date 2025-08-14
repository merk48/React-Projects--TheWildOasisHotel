import { yupResolver } from "@hookform/resolvers/yup";
import { useUser } from "./hooks/useUser";
import { useUpdateUser } from "./hooks/useUpdateUser";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { useForm } from "react-hook-form";
import { userSchema } from "../../utils/validations/schemas";

function UpdateUserDataForm() {
  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = useUser();

  const { updateUser, isUpdating } = useUpdateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      fullName: currentFullName || "",
      avatar: null,
    },
  });

  const onSubmit = (data) => {
    const avatarFile =
      typeof data.avatar === "string" ? data.avatar : data.avatar?.[0] || null;

    // Only update if something changed
    if (data.fullName !== currentFullName || avatarFile) {
      updateUser(
        { fullName: data.fullName, avatar: avatarFile },
        {
          onSuccess: () => reset({ fullName: data.fullName, avatar: null }),
        }
      );
    }
  };

  const handleCancel = () => {
    reset({ fullName: currentFullName, avatar: null });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>

      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isUpdating}
          {...register("fullName")}
        />
      </FormRow>

      <FormRow label="Avatar image" error={errors?.avatar?.message}>
        <FileInput
          id="avatar"
          accept="image/*"
          disabled={isUpdating}
          {...register("avatar")}
        />
      </FormRow>

      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Reset
        </Button>

        <Button disabled={isUpdating}>
          {isUpdating ? <SpinnerMini /> : "Update account"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;
