import styled from "styled-components";
import { HiTrash } from "react-icons/hi2";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "./hooks/useBookingDetails";
import { BOOKING_CONFIG } from "../../utils/configs/bookingConfig";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import Spinner from "../../ui/Spinner";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import Empty from "../../ui/Empty";
import SpinnerMini from "../../ui/SpinnerMini";
import Error from "../../ui/Error";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  @media (max-width: 640px) {
    gap: 0.8rem;
    width: 100%;
  }
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking, error } = useBookingDetails();

  const { isCheckingOut, checkOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const isWorking = isLoading || isCheckingOut || isDeleting;

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  if (error) return <Error error={error} />;
  if (!booking) return <Empty resource="Booking" />;

  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={BOOKING_CONFIG.UI.STATUS_TAG_COLORS[status]}>
            {booking.status.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>

        {status === BOOKING_CONFIG.STATUS.UNCONFIRMED && (
          <Button
            variation="secondary"
            onClick={() => navigate(`/checkin/${id}`)}
            disabled={isWorking}
          >
            {isWorking ? <SpinnerMini /> : `Check in`}
          </Button>
        )}

        {status === BOOKING_CONFIG.STATUS.CHECKED_IN && (
          <Button onClick={() => checkOut(id)} disabled={isWorking}>
            {isWorking ? <SpinnerMini /> : `Check out`}
          </Button>
        )}
        <Modal>
          <Modal.Open opens={`delete-booking-${id}`}>
            <Button variation="danger" icon={<HiTrash />}>
              Delete booking
            </Button>
          </Modal.Open>

          <Modal.Window name={`delete-booking-${id}`}>
            <ConfirmDelete
              resourceName="booking"
              onConfirm={() => {
                deleteBooking(id, {
                  onSuccess() {
                    navigate(-1);
                  },
                });
              }}
              disabled={isWorking}
              isDeleting={isWorking}
            />
          </Modal.Window>
        </Modal>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
