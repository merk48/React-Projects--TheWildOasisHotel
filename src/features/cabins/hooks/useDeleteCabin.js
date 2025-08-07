import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCabin as deleteCabinApi } from "../../../services/apiCabins";
import { deleteCabinKey, readCabinsKey } from "../../../utils/queryConstants";

export const useDeleteCabin = function () {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteCabin } = useMutation({
    mutationKey: [deleteCabinKey],
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      toast.success("Cabin successfully deleted");

      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        queryKey: [readCabinsKey],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteCabin };
};
