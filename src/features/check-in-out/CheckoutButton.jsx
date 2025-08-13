import Button from "../../ui/Button";
import useCheckout from "./hooks/useCheckout";

function CheckoutButton({ bookingId }) {
  const { isCheckingOut, checkOut } = useCheckout();

  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => checkOut(bookingId)}
      disabled={isCheckingOut}
    >
      Check out
    </Button>
  );
}

export default CheckoutButton;
