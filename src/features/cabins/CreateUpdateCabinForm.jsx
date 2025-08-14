import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useUpdateCabin } from "./hooks/useUpdateCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import SpinnerMini from "../../ui/SpinnerMini";
import { cabinSchema } from "../../utils/validations/schemas";

function CreateUpdateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isEditing;

  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(cabinSchema),
    context: { isEditSession },
    defaultValues: isEditSession ? editValues : {},
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isEditSession)
      updateCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
  }

  function onError(errors) {
    // log error
  }

  function handleReset() {
    if (isEditSession && Object.keys(editValues).length > 0) {
      reset(editValues); // update the form with edit values
    }
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      type={onCloseModal ? "moda" : "regular"}
    >
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name")}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity")}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          defaultValue={0}
          {...register("regularPrice")}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount")}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isWorking}
          id="description"
          defaultValue=""
          {...register("description")}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isWorking}
          type="file"
          accept="image/*"
          {...register("image")}
        />
      </FormRow>

      <FormRow>
        <Button
          variation="secondary"
          onClick={onCloseModal}
          disabled={isWorking}
        >
          Cancel
        </Button>
        <Button
          onClick={handleReset}
          variation="secondary"
          type="button"
          disabled={isWorking}
        >
          Reset
        </Button>
        <Button disabled={isWorking}>
          {isWorking ? (
            <SpinnerMini />
          ) : isEditSession ? (
            "Edit cabin"
          ) : (
            "Create new cabin"
          )}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateUpdateCabinForm;
