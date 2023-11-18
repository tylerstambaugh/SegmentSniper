import { Card, Col, Container, Row } from "react-bootstrap";
import useActivityListStore from "../../../../stores/useActivityListStore";
import useSegmentsListStore from "../../../../stores/useSegmentsListStore";
import { useState } from "react";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";

//name, date, distance, time, achievements, details, segments

type ActivityListCardFrontProps = {
  setSelectedActivity: (activityId: string) => void;
  activity: ActivityListItem;
  viewBack: (activityId: string) => void;
};

const ActivityListCardFront = (props: ActivityListCardFrontProps) => {
  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const resetSegmentList = useSegmentsListStore(
    (state) => state.resetSegmentsList
  );

  const handleSegmentButtonClick = (activityId: string) => {
    props.setSelectedActivity(activityId);
    setSelectedRow(activityId);
  };

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

export default ActivityListCardFront;
