import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "./ActivityCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

interface ActivityCardListProps {
  handleShowSnipeSegmentsModal: () => void;
}

const ActivityCardList = (props: ActivityCardListProps) => {
  const [activityList] = useActivityListStore((state) => [state.activityList]);

  return activityList.length > 0 ? (
    <>
      {activityList.map((item) => (
        <ActivityCard activity={item} key={uuidv4()} />
      ))}
    </>
  ) : (
    <Container>
      <Row>
        <Col>
          <h4>No activities to display</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCardList;
