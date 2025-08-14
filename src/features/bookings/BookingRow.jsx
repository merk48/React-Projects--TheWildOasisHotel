import styled from "styled-components";
import { format, isToday } from "date-fns";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/hooks/useCheckout";
import { useDeleteBooking } from "./hooks/useDeleteBooking";
import {
  formatCurrency,
  formatDistanceFromNow,
} from "../../utils/helpers/commonHelpers";
import { BOOKING_CONFIG } from "../../utils/configs/bookingConfig";
import Tag from "../../ui/Tag";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();
  const { isCheckingOut, checkOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();
  const isWorking = isCheckingOut || isDeleting;

  return (
    <Table.Row>
      <Modal>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), BOOKING_CONFIG.UI.DATE_FORMAT)} &mdash;{" "}
            {format(new Date(endDate), BOOKING_CONFIG.UI.DATE_FORMAT)}
          </span>
        </Stacked>

        <Tag type={BOOKING_CONFIG.UI.STATUS_TAG_COLORS[status]}>
          {status.replace("-", " ")}
        </Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>

        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button
              icon={<HiEye />}
              onClick={() => navigate(`/bookings/${bookingId}`)}
            >
              See details
            </Menus.Button>
            {status === BOOKING_CONFIG.STATUS.UNCONFIRMED && (
              <Menus.Button
                icon={<HiArrowDownOnSquare />}
                onClick={() => navigate(`/checkin/${bookingId}`)}
              >
                Check in
              </Menus.Button>
            )}
            {status === BOOKING_CONFIG.STATUS.CHECKED_IN && (
              <Menus.Button
                icon={<HiArrowUpOnSquare />}
                onClick={() => checkOut(bookingId)}
                disabled={isWorking}
              >
                Check out
              </Menus.Button>
            )}
            <Modal.Open opens={`delete-booking-${bookingId}`}>
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
        </Menus.Menu>

        <Modal.Window name={`delete-booking-${bookingId}`}>
          <ConfirmDelete
            resourceName="booking"
            onConfirm={() => deleteBooking(bookingId)}
            disabled={isWorking}
            isDeleting={isWorking}
          />
        </Modal.Window>
      </Modal>
    </Table.Row>
  );
}

export default BookingRow;
