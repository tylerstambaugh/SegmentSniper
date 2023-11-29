import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import useActivityListStore from "../../../../stores/useActivityListStore";

type ActivityCardProps = {
  activity: ActivityListItem;
  handleShowSnipeSegmentsModal: () => void;
};

const ActivityCard = (props: ActivityCardProps) => {
  const navigate = useNavigate();
  const [setSegmentEffortsList] = useSegmentEffortsListStore((state) => [
    state.setSegmentEffortsList,
  ]);
  const [activityList, selectedActivityId, setSelectedActivityId] =
    useActivityListStore((state) => [
      state.activityList,
      state.selectedActivityId,
      state.setSelectedActivityId,
    ]);

  const handleSegmentsButtonClick = () => {
    setSegmentEffortsList(props.activity.segmentEffortListItems ?? []);
    navigate(AppRoutes.SegmentEfforts);
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
              <Button
                onClick={() => {
                  setSelectedActivityId(props.activity.activityId!);
                  props.handleShowSnipeSegmentsModal();
                }}
              >
                Snipe Segments!
              </Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCard;
