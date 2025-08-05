import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const useCreateCabin = function () {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
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

  return { isCreating, createCabin };
};
