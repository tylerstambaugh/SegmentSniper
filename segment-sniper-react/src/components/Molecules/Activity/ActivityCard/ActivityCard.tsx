import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { ActivityListItem } from "../../../../models/Activity/ActivityListItem";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../../../enums/AppRoutes";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import useActivityListStore from "../../../../stores/useActivityListStore";
import { useEffect, useState } from "react";
import ActivityMap from "../ActivityMap/ActivityMap";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ActivityCard.module.scss";

type ActivityCardProps = {
  activity: ActivityListItem;
  showMap: boolean;
};

const ActivityCard = (props: ActivityCardProps) => {
  const navigate = useNavigate();
  const [selectedActivityId, setSelectedActivityId] = useActivityListStore(
    (state) => [state.selectedActivityId, state.setSelectedActivityId]
  );
  const [showMap, setShowMap] = useState<boolean>(props.showMap);
  const handleSnipeButtonClick = () => {
    setSelectedActivityId(props.activity.activityId!);
    navigate(`/${AppRoutes.ActivityDetails}`);
  };

  useEffect(() => {
    console.log("selectedActivityId:", selectedActivityId);
  }, []);

  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className={`px-2 pt-2 ${styles.title}`}>
              <Row>
                <Col xs={9}>{props.activity.name} </Col>
                <Col xs={3}>
                  <Button onClick={() => setShowMap(!showMap)}>
                    {showMap ? (
                      <>
                        <FontAwesomeIcon icon={faEyeSlash} />
                        Map
                      </>
                    ) : (
                      <>
                        <FontAwesomeIcon icon={faEye} />
                        Map
                      </>
                    )}
                  </Button>
                </Col>
              </Row>
            </Card.Title>
            <Card.Body className="p-0">
              <Col>
                <Row>
                  <Col className="p-3" sm={12} lg={4}>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">Date:</span>{" "}
                        </p>
                        <p className="mb-0">{props.activity.startDate}</p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">Distance:</span>{" "}
                        </p>
                        <p className="mb-0">{props.activity.distance} miles</p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            {" "}
                            Elapsed Time:
                          </span>{" "}
                        </p>
                        <p className="mb-0">{props.activity.elapsedTime}</p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            Achievement Count:
                          </span>{" "}
                        </p>
                        <p className="mb-0">
                          {props.activity.achievementCount}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                  {showMap ? (
                    <Col className="height-auto">
                      <ActivityMap
                        stravaMap={props.activity.stravaMap!}
                        startLatlng={props.activity.startLatlng!}
                        endLatlng={props.activity.endLatlng}
                      />
                    </Col>
                  ) : (
                    <></>
                  )}
                </Row>
              </Col>
            </Card.Body>
            {selectedActivityId === "" ? (
              <Card.Footer className="d-flex justify-content-center">
                <Button onClick={() => handleSnipeButtonClick()}>Snipe!</Button>
              </Card.Footer>
            ) : (
              <></>
            )}
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCard;
