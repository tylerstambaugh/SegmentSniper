import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { SnipedSegmentListItem } from "../../../../models/Segment/SnipedSegmentListItem";

type SnipedSegmentCardProps = {
  snipedSegment: SnipedSegmentListItem;
};

const SnipedSegmentCard = (props: SnipedSegmentCardProps) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className="p-2 activity-card-heading">
              {props.snipedSegment.name}
            </Card.Title>
            <Card.Body>
              <Row className="justify-content-between">
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.snipedSegment.distance}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">KOM Time:</span>{" "}
                  {props.snipedSegment.komTime}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">
                    Seconds From Leader:
                  </span>{" "}
                  {props.snipedSegment.secondsFromLeader}
                </Col>
                {props.snipedSegment.athleteStats?.effortCount! > 1 ? (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <span className="activity-card-label">PR Time:</span>{" "}
                    {props.snipedSegment.athleteStats?.prElapsedTime}
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
              <Button>Details</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SnipedSegmentCard;
