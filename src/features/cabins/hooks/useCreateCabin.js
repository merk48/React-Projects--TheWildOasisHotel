import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createCabinKey, readCabinsKey } from "../../../utils/constants/queryConstants";
import { createCabin as createCabinApi } from "../../../services/apiCabins";

export const useCreateCabin = function () {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createCabin } = useMutation({
    mutationKey: [createCabinKey],
    mutationFn: createCabinApi,
    onSuccess: () => {
      toast.success("New cabin successfully created");
      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        queryKey: [readCabinsKey],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
};
