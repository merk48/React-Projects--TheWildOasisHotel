import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin, updateCabin } from "../../services/apiCabins";
import { useCreateCabin } from "./hooks/useCreateCabin";
import { useEditCabin } from "./hooks/useEditCabin";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();
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
    defaultValues: isEditSession ? editValues : {},
  });

  const queryClient = useQueryClient();

  const { isPending, mutate } = useMutation({
    //TODO create constants for strings keys
    mutationKey: [`${isEditSession ? "update" : "create"}-cabin`],
    mutationFn: isEditSession
      ? ({ newCabinData, id }) => updateCabin(newCabinData, id)
      : createCabin,
    onSuccess: () => {
      console.log(1);

      toast.success(
        `${isEditSession ? "Cabin" : "New cabin"} successfully ${
          isEditSession ? "edited" : "created"
        }`
      );
      console.log(2);
      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        //TODO create constants for strings keys
        queryKey: ["cabins"],
      });
      console.log(3);

      reset();
      console.log(4);
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    // isEditSession
    //   ? mutate({ newCabinData: { ...data, image }, id: editId })
    //   : mutate({ ...data, image });

    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
          },
        }
      );
  }

  function onError(errors) {
    // log error
  }

  const basicValidations = {
    required: "This field is required",
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isPending}
          {...register("name", {
            ...basicValidations,
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isPending}
          {...register("maxCapacity", {
            ...basicValidations,
            min: {
              value: 1,
              message: "Capacity should be at least 1",
            },
          })}
        />
      </FormRow>
      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isPending}
          defaultValue={0}
          {...register("regularPrice", {
            ...basicValidations,
            min: {
              value: 50,
              message: "Price should be start at least from 50",
            },
          })}
        />
      </FormRow>
      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isPending}
          defaultValue={0}
          {...register("discount", {
            ...basicValidations,
            validate: (value) =>
              value <= getValues().regularPrice ||
              "Discount should be less than resular price!",
          })}
        />
      </FormRow>
      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          disabled={isPending}
          id="description"
          defaultValue=""
          {...register("description", {
            ...basicValidations,
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput
          id="image"
          disabled={isPending}
          type="file"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required",
          })}
        />
      </FormRow>

      <div>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isPending}>
          {isEditSession ? "Edit cabin" : "Create new cabin"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
