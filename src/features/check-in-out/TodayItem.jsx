import styled from "styled-components";
import { Link } from "react-router-dom";
import Tag from "../../ui/Tag";
import { Flag } from "../../ui/Flag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { BOOKING_CONFIG } from "../../utils/configs/bookingConfig";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 1fr 0.5fr 2.5fr 1fr 1fr;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);
  min-width: 500px;
  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, guests, numNights } = activity;

  return (
    <StyledTodayItem>
      <Tag type={BOOKING_CONFIG.ui.statusTagColors[status]}>
        {" "}
        {status === BOOKING_CONFIG.statusOptions.UNCONFIRMED
          ? "Arriving"
          : status === BOOKING_CONFIG.statusOptions.CHECKED_IN
          ? "Departing"
          : ""}
      </Tag>

      <Flag src={guests.countryFlag} alt={`Flag of ${guests.country}`} />
      <Guest>{guests.fullName}</Guest>
      <div>{numNights} nights</div>

      {status === BOOKING_CONFIG.statusOptions.UNCONFIRMED && (
        <Button
          size="small"
          variation="primary"
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      )}
      {status === BOOKING_CONFIG.statusOptions.CHECKED_IN && (
        <CheckoutButton bookingId={id} />
      )}
    </StyledTodayItem>
  );
}

export default TodayItem;
