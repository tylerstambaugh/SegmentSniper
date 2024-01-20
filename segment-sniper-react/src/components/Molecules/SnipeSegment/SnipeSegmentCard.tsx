import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { SnipeSegmentListItem } from "../../../models/Segment/SnipeSegmentListItem";
import { usePostStarSegment } from "../../../hooks/Api/Segments/usePostStarSegment";
import useSnipeSegmentsListStore from "../../../stores/useSnipeSegmentsListStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ActivityMap from "../Activity/ActivityMap";
import { useConvertTimeStringToNumericValue } from "../../../hooks/useConvertTimeStringToNumericValue";
import toast from "react-hot-toast";

type SnipedSegmentCardProps = {
  snipeSegment: SnipeSegmentListItem;
  showDetails: boolean;
  leaderTypeQom: boolean;
  setShowDetails: (segmentId: string) => void;
};

const SnipeSegmentCard = (props: SnipedSegmentCardProps) => {
  const starSegment = usePostStarSegment();
  const convertTime = useConvertTimeStringToNumericValue();
  const [setQueriedSnipeSegmentsList] = useSnipeSegmentsListStore((state) => [
    state.setQueriedSnipeSegmentsList,
  ]);

  const updateSegmentEffortStarred = (
    snipedSegmentEffortList: SnipeSegmentListItem[],
    segmentId: string,
    starred: boolean
  ) => {
    return snipedSegmentEffortList.map((item) =>
      item.segmentId === segmentId ? { ...item, starred: starred } : item
    );
  };

  async function handleStarButtonClick() {
    try {
      const response = await starSegment.mutateAsync({
        segmentId: props.snipeSegment.segmentId!,
        star: !props.snipeSegment.starred,
      });

      if (!starSegment.isError && !starSegment.isLoading && response !== null) {
        setQueriedSnipeSegmentsList((prevList: SnipeSegmentListItem[]) =>
          updateSegmentEffortStarred(
            prevList,
            response.detailedSegment.segmentId,
            response.detailedSegment.starred
          )
        );
      }
    } catch (error) {
      if (starSegment.error instanceof Error) {
        toast.error(starSegment.error.message);
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  const myTime: string = convertTime.numericTimeToString(
    props.snipeSegment.detailedSegmentEffort?.elapsedTime!
  );

  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className="mb-0 p-3 activity-card-heading">
              <Col>
                <Row className="justify-content-around">
                  <Col>{props.snipeSegment.name}</Col>
                </Row>
              </Col>
            </Card.Title>
            <Card.Body className="py-0">
              <Col>
                <Row>
                  <Col className="p-3" sm={12} lg={4}>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">Distance:</span>{" "}
                        </p>
                        <p className="mb-0">
                          {props.snipeSegment.distance} mi.
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">My Time:</span>
                        </p>
                        <p className="mb-0">{myTime}</p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            My PR Time:
                          </span>
                        </p>
                        <p className="mb-0">
                          {convertTime.numericTimeToString(
                            props.snipeSegment.athleteSegmentStats
                              ?.prElapsedTime ?? 0
                          )}
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            {!props.leaderTypeQom ? `KOM Time:` : `QOM Time:`}
                          </span>
                        </p>
                        <p className="mb-0">
                          {!props.leaderTypeQom
                            ? props.snipeSegment.komTime
                            : props.snipeSegment.qomTime}
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            Time Behind {!props.leaderTypeQom ? `KOM:` : `QOM:`}
                          </span>
                        </p>
                        <p className="mb-0">
                          -
                          {!props.leaderTypeQom
                            ? props.snipeSegment.secondsFromKom
                            : props.snipeSegment.secondsFromQom}
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            % Off {!props.leaderTypeQom ? `KOM:` : `QOM:`}
                          </span>
                        </p>
                        <p className="mb-0">
                          {!props.leaderTypeQom
                            ? `${props.snipeSegment.percentageFromKom}%`
                            : `${props.snipeSegment.percentageFromQom}%`}
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            Athlete Count:
                          </span>
                        </p>
                        <p className="mb-0">
                          {props.snipeSegment.athleteCount}
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">
                            Elevation Gain:
                          </span>
                        </p>
                        <p className="mb-0">
                          {props.snipeSegment.elevation} ft.
                        </p>
                      </Col>
                    </Row>
                    <Row className="justify-content-start text-start">
                      <Col className="d-flex justify-content-between">
                        <p className="mb-0">
                          <span className="activity-card-label">Heading:</span>
                        </p>
                        <p className="mb-0">{props.snipeSegment.heading}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col className="p-0" sm={12} lg={8}>
                    <ActivityMap
                      stravaMap={props.snipeSegment.map!}
                      startLatlng={
                        props.snipeSegment.detailedSegmentEffort?.summarySegment
                          .startLatlng
                      }
                      endLatlng={
                        props.snipeSegment.detailedSegmentEffort?.summarySegment
                          .endLatlng
                      }
                    />
                  </Col>
                </Row>
              </Col>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-center align-items-center">
              {starSegment.isLoading ? (
                <Button
                  type="submit"
                  variant="secondary"
                  style={{ width: "175px" }}
                >
                  <Spinner
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border"
                  />
                </Button>
              ) : (
                <Button
                  className="px-4"
                  onClick={() => handleStarButtonClick()}
                  style={{ width: "175px" }}
                >
                  {props.snipeSegment.starred ? (
                    <FontAwesomeIcon icon={solidStar} />
                  ) : (
                    <FontAwesomeIcon icon={regularStar} />
                  )}
                </Button>
              )}
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SnipeSegmentCard;
