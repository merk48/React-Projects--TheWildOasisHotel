import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBookingDetails } from "./hooks/useBookingDetails";
import Spinner from "../../ui/Spinner";
import { BOOKING_CONFIG } from "../../utils/configs/bookingConfig";
import { useNavigate } from "react-router-dom";
import useCheckout from "../check-in-out/hooks/useCheckout";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import { HiTrash } from "react-icons/hi2";
import { useDeleteBooking } from "./hooks/useDeleteBooking";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.8rem;
    width: 100%;
  }
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { isLoading, booking } = useBookingDetails();

  const { isCheckingOut, checkOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const isWorking = isCheckingOut || isDeleting;

  const moveBack = useMoveBack();

  if (isLoading) return <Spinner />;
  const { status, id } = booking;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{id}</Heading>
          <Tag type={BOOKING_CONFIG.ui.statusTagColors[status]}>
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

        {status === BOOKING_CONFIG.statusOptions.UNCONFIRMED && (
          <Button
            variation="secondary"
            onClick={() => navigate(`/checkin/${id}`)}
            disabled={isWorking}
          >
            Check In
          </Button>
        )}

        {status === BOOKING_CONFIG.statusOptions.CHECKED_IN && (
          <Button onClick={() => checkOut(id)} disabled={isWorking}>
            Check out
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
            />
          </Modal.Window>
        </Modal>
        <Button variation="danger" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
