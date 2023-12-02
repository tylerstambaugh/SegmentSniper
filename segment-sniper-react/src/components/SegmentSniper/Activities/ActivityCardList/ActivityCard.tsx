import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import useActivityListStore from "../../../../stores/useActivityListStore";
import { useState } from "react";
import ActivityMap from "../../ActivityMap";

type ActivityCardProps = {
  activity: ActivityListItem;
  handleShowSnipeSegmentsModal: () => void;
};

const ActivityCard = (props: ActivityCardProps) => {
  const navigate = useNavigate();
  const [setSegmentEffortsList] = useSegmentEffortsListStore((state) => [
    state.setSegmentEffortsList,
  ]);
  const [selectedActivityId, setSelectedActivityId] = useActivityListStore(
    (state) => [state.selectedActivityId, state.setSelectedActivityId]
  );

  const handleDetailsButtonClick = () => {
    setSelectedActivityId(props.activity.activityId!);
    setSegmentEffortsList(props.activity.segmentEffortListItems ?? []);
    navigate(AppRoutes.ActivityDetails);
  };

  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className="px-2 pt-2 activity-card-heading">
              <Row>
                <Col xs={9}>{props.activity.name}</Col>
                <Col xs={3}>
                  <Button
                    onClick={() => {
                      setSelectedActivityId(props.activity.activityId!);
                      props.handleShowSnipeSegmentsModal();
                    }}
                  >
                    Snipe!
                  </Button>
                </Col>
              </Row>
            </Card.Title>
            <Card.Body>
              <Row className="justify-content-start">
                <Col sm={6} md={3}>
                  <span className="activity-card-label">Date:</span>{" "}
                  {props.activity.startDate}
                </Col>
                <Col sm={6} md={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.activity.distance} miles
                </Col>
                <Col sm={6} md={3}>
                  <span className="activity-card-label">Elapsed Time:</span>{" "}
                  {props.activity.elapsedTime}
                </Col>
                <Col sm={12} md={3}>
                  <span className="activity-card-label">
                    Achievement Count:
                  </span>{" "}
                  {props.activity.achievementCount}
                </Col>
              </Row>
              <Row>
                <Col>
                  <ActivityMap
                    stravaMap={props.activity.stravaMap!}
                    startLatlng={props.activity.startLatlng!}
                    endLatlng={props.activity.endLatlng}
                  />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center">
              {selectedActivityId === "" ? (
                <Button onClick={() => handleDetailsButtonClick()}>
                  Details
                </Button>
              ) : (
                <></>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCard;
