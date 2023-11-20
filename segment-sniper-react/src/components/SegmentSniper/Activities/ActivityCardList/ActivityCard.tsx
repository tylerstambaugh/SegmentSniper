import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";

type ActivityListCardProps = {
  setSelectedActivity: (activityId: string) => void;
  activity: ActivityListItem;
};

//name, date, distance, time, achievements, details, segments

const ActivityCard = (props: ActivityListCardProps) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title>{props.activity.name}</Card.Title>
            <Card.Body>
              <ul>
                <li>Date: {props.activity.startDate}</li>
              </ul>
              <ul>
                <li>Distance: {props.activity.distance} miles</li>
              </ul>
              <ul>
                <li>Elapsed Time: {props.activity.elapsedTime}</li>
              </ul>
              <ul>
                <li>Achievement Count: {props.activity.achievementCount}</li>
              </ul>
            </Card.Body>
            <Card.Footer>
              <Row className="justify-content-between">
                <Col>
                  <Button>Details</Button>
                </Col>
                <Col>
                  <Button>Segments</Button>
                </Col>
              </Row>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCard;
