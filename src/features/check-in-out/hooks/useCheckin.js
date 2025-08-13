import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkInBookingKey } from "../../../utils/queryConstants";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { isPending: isCheckingIn, mutate: checkIn } = useMutation({
    mutationKey: [checkInBookingKey],
    mutationFn: ({ id, breakfast }) =>
      updateBooking(id, {
        status: BOOKING_CONFIG.STATUS.CHECKED_IN,
        isPaid: true,
        ...breakfast,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in`);

      // refetch data => invalidating cache => stale
      // queryClient.invalidateQueries({
      //   queryKey: [readCabinsKey],
      // });

      queryClient.invalidateQueries({
        active: true,
      });

      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckingIn, checkIn };
}
