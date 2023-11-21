import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";

type ActivityCardProps = {
  setSelectedActivity: (activityId: string) => void;
  activity: ActivityListItem;
};

//name, date, distance, time, achievements, details, segments

const ActivityCard = (props: ActivityCardProps) => {
  const handleSegmentsButtonClick = () => {
    console.log(`show segments for activityId ${props.activity.activityId}`);
  };

  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className="p-2 activity-card-heading">
              {props.activity.name}
            </Card.Title>
            <Card.Body>
              <Row className="justify-content-between">
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Date:</span>{" "}
                  {props.activity.startDate}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.activity.distance} miles
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Elapsed Time:</span>{" "}
                  {props.activity.elapsedTime}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">
                    Achievement Count:
                  </span>{" "}
                  {props.activity.achievementCount}
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
              <Button>Details</Button>
              <Button onClick={() => handleSegmentsButtonClick()}>
                Segments
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCard;
