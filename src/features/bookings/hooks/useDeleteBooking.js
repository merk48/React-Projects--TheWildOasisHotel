import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {
  deleteBookingKey,
  readBookingsKey,
} from "../../../utils/constants/queryConstants";
import { deleteBooking as deleteBookingApi } from "../../../services/apiBookings";

export const useDeleteBooking = function () {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationKey: [deleteBookingKey],
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("Booking successfully deleted");

      // refetch data => invalidating cache => stale
      queryClient.invalidateQueries({
        queryKey: [readBookingsKey],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteBooking };
};
