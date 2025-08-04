import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  //TODO create custom hook
  const { isPending: isCreating, mutate } = useMutation({
    //TODO create constants for strings keys
    mutationKey: ["create-cabin"],
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("New cabin successfully created");

      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        //TODO create constants for strings keys
        queryKey: ["cabins"],
      });

      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate(data);
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
          disabled={isCreating}
          {...register("name", {
            ...basicValidations,
          })}
        />
      </FormRow>
      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          id="description"
          defaultValue=""
          {...register("description", {
            ...basicValidations,
          })}
        />
      </FormRow>
      <FormRow label="Cabin photo" error={errors?.image?.message}>
        <FileInput id="image" disabled={isCreating} accept="image/*" />
      </FormRow>

      <div>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Reset
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
