import styled from "styled-components";
import { useTodayActivity } from "./hooks/useTodayActivity";
import TodayItem from "../../features/check-in-out/TodayItem";
import Spinner from "../../ui/Spinner";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";

const StyledToday = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  /* On very wide screens, request the left half */
  @media (min-width: 1200px) {
    grid-column: 1 / span 2;
  }
`;

const TodayList = styled.ul`
  overflow: auto;
  max-height: 30vh;
  padding: 0;
  margin: 0;
  list-style: none;

  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--color-grey-200);
    border-radius: 8px;
  }
`;

const NoActivity = styled.p`
  text-align: center;
  font-size: 1.1rem;
  font-weight: 500;
  margin-top: 0.8rem;
`;
function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();
  return (
    <StyledToday>
      <Row type="horizontal">
        <Heading as="h2" variant="h2">
          Today
        </Heading>
      </Row>
      {!isLoading ? (
        activities?.length > 0 ? (
          <TodayList>
            {activities.map((activity) => (
              <TodayItem activity={activity} key={activity.id} />
            ))}
          </TodayList>
        ) : (
          <NoActivity>No activity today...</NoActivity>
        )
      ) : (
        <Spinner />
      )}
    </StyledToday>
  );
}

export default TodayActivity;
