import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { SegmentEffort } from "../../../../models/Segment/SegmentEffort";
import { SegmentEffortListItem } from "../../../../models/Segment/SegmentEffortListItem";

type SegmentEffortCardProps = {
  segmentEffortListItem: SegmentEffortListItem;
  activityId: string;
};

const SegmentEffortCard = (props: SegmentEffortCardProps) => {
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title>
              {props.segmentEffortListItem.summarySegment!.name}
            </Card.Title>
            <Card.Body></Card.Body>
            <Card.Footer></Card.Footer>
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
