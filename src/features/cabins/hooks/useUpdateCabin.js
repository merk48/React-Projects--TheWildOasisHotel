import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  readCabinsKey,
  updateCabinKey,
} from "../../../utils/constants/queryConstants";
import { updateCabin as updateCabinApi } from "../../../services/apiCabins";

export const useUpdateCabin = function () {
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
