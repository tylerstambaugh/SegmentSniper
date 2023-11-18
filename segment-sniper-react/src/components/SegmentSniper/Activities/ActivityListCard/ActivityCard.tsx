import { Container, Row, Col, Card } from "react-bootstrap";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";

type ActivityListCardProps = {
  setSelectedActivity: (activityId: string) => void;
  activity: ActivityListItem;
};

const ActivityCard = (props: ActivityListCardProps) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title>{props.activity.name}</Card.Title>
            <Card.Body></Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCard;
