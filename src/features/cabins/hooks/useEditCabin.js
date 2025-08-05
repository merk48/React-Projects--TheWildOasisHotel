import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readCabinsKey, updateCabinKey } from "../constants";
import { updateCabin as updateCabinApi } from "../../../services/apiCabins";
import toast from "react-hot-toast";

export const useEditCabin = function () {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateCabin } = useMutation({
    mutationKey: [updateCabinKey],
    mutationFn: ({ newCabinData, id }) => updateCabinApi(newCabinData, id),
    onSuccess: () => {
      toast.success("Cabin successfully edited");
      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        queryKey: [readCabinsKey],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateCabin };
};
