import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { SegmentEffort } from "../../../../models/Segment/SegmentEffort";
import { SegmentEffortListItem } from "../../../../models/Segment/SegmentEffortListItem";

type SegmentEffortCardProps = {
  segmentEffortListItem: SegmentEffortListItem;
  activityId: string;
};

const SegmentEffortCard = (props: SegmentEffortCardProps) => {
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className="p-2 segment-card-heading">
              {props.segmentEffortListItem.summarySegment!.name}
            </Card.Title>
            <Card.Body>
              {" "}
              <Row className="justify-content-between">
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.segmentEffortListItem.distance}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Elapsed Time:</span>{" "}
                  {props.segmentEffortListItem.elapsedTime}
                </Col>
                {props.segmentEffortListItem.deviceWatts ? (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <span className="activity-card-label">Average Watts:</span>{" "}
                    {props.segmentEffortListItem.averageWatts}
                  </Col>
                ) : (
                  <></>
                )}
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Max Heart Rate:</span>{" "}
                  {props.segmentEffortListItem.maxHeartrate}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Hidden:</span>{" "}
                  {props.segmentEffortListItem.hidden ? `Yes` : "No"}
                </Col>
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

export default SegmentEffortCard;

// export interface SegmentEffort {
//     segmentEffortId: string;
//     name: string;
//     activityId: string;
//     elapsedTime: number;
//     movingTime: number;
//     startDate: string;
//     startDateLocal: string;
//     distance: number;
//     startIndex: number;
//     endIndex: number;
//     deviceWatts: boolean;
//     averageWatts: number;
//     averageHeartRate: number;
//     maxHeartRate: number;
//     segment: SummarySegment;
//     prRank: number | null;
//     achievements: Achievement[];
//     komRank: number | null;
//     hidden: boolean;
//   }
