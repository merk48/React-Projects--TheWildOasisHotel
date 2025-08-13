import { useMutation, useQueryClient } from "@tanstack/react-query";
import { checkOutBookingKey } from "../../../utils/queryConstants";
import { updateBooking } from "../../../services/apiBookings";
import toast from "react-hot-toast";
import { BOOKING_CONFIG } from "../../../utils/configs/bookingConfig";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { isPending: isCheckingOut, mutate: checkOut } = useMutation({
    mutationKey: [checkOutBookingKey],
    mutationFn: (id) =>
      updateBooking(id, {
        status: BOOKING_CONFIG.STATUS.CHECKED_OUT,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out`);

      // for all active data
      queryClient.invalidateQueries({
        active: true,
      });
    },
    onError: (err) => toast.error(err.message),
  });
  return { isCheckingOut, checkOut };
}
