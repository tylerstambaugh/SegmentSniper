import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { SnipeSegmentListItem } from "../../../models/Segment/SnipeSegmentListItem";
import { usePostStarSegment } from "../../../hooks/Api/Segments/usePostStarSegment";
import useSnipeSegmentsListStore from "../../../stores/useSnipeSegmentsListStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ActivityMap from "../Activity/ActivityMap";
import { useConvertTimeStringToNumericValue } from "../../../hooks/useConvertTimeStringToNumericValue";

type SnipedSegmentCardProps = {
  snipeSegment: SnipeSegmentListItem;
  showDetails: boolean;
  leaderTypeQom: boolean;
  setShowDetails: (segmentId: string) => void;
};

const SnipeSegmentCard = (props: SnipedSegmentCardProps) => {
  const starSegment = usePostStarSegment();
  const convertTime = useConvertTimeStringToNumericValue();
  const [
    snipeSegmentsList,
    setSnipedSegments,
    queriedSnipeSegmentList,
    setQueriedSnipeSegmentsList,
  ] = useSnipeSegmentsListStore((state) => [
    state.snipeSegmentsList,
    state.setSnipeSegmentsList,
    state.queriedSnipeSegmentsList,
    state.setQueriedSnipeSegmentsList,
  ]);

  async function handleShowDetailsButtonClick() {
    props.setShowDetails(props.snipeSegment.segmentId!);
  }

  function handleHideDetailsButtonClick() {
    props.setShowDetails("");
  }

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
  }

  const myTime: string = convertTime.numericTimeToString(
    props.snipeSegment.detailedSegmentEffort?.elapsedTime!
  );
  return (
    <Container className="py-2">
      <Row>
        <Col>
          <Card>
            <Card.Title className="p-2 activity-card-heading">
              {props.snipeSegment.name}
            </Card.Title>
            <Card.Body>
              <Container>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">Distance:</span>{" "}
                  </Col>
                  <Col className="justify-content-end text-end">
                    {props.snipeSegment.distance} mi.
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">My Time:</span>
                  </Col>
                  <Col className="justify-content-end text-end">{myTime}</Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">My PR Time:</span>
                  </Col>
                  <Col className="justify-content-end text-end">
                    {convertTime.numericTimeToString(
                      props.snipeSegment.athleteSegmentStats?.prElapsedTime ?? 0
                    )}
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">
                      {!props.leaderTypeQom ? `KOM Time:` : `QOM Time:`}
                    </span>
                  </Col>
                  <Col className="justify-content-end text-end">
                    {!props.leaderTypeQom
                      ? props.snipeSegment.komTime
                      : props.snipeSegment.qomTime}
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">
                      Time Off {!props.leaderTypeQom ? `KOM:` : `QOM:`}
                    </span>
                  </Col>
                  <Col className="justify-content-end text-end">
                    {!props.leaderTypeQom
                      ? props.snipeSegment.secondsFromKom
                      : props.snipeSegment.secondsFromQom}
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">
                      % Off {!props.leaderTypeQom ? `KOM:` : `QOM:`}
                    </span>
                  </Col>
                  <Col className="justify-content-end text-end">
                    {!props.leaderTypeQom
                      ? `${props.snipeSegment.percentageFromKom}%`
                      : `${props.snipeSegment.percentageFromQom}%`}
                  </Col>
                </Row>
                <Row className="justify-content-start text-start">
                  <Col xs={7}>
                    <span className="activity-card-label">Heading:</span>
                  </Col>
                  <Col className="justify-content-end text-end">
                    <>{props.snipeSegment.heading}</>
                  </Col>
                </Row>
              </Container>
              <Row>
                {props.showDetails ? (
                  <>
                    <Row>
                      <Col>
                        <ActivityMap
                          stravaMap={props.snipeSegment.map!}
                          startLatlng={
                            props.snipeSegment.detailedSegmentEffort
                              ?.summarySegment.startLatlng
                          }
                          endLatlng={
                            props.snipeSegment.detailedSegmentEffort
                              ?.summarySegment.endLatlng
                          }
                        />
                      </Col>
                    </Row>
                  </>
                ) : (
                  <></>
                )}
              </Row>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
              {!props.showDetails ? (
                <Button onClick={() => handleShowDetailsButtonClick()}>
                  Details
                </Button>
              ) : (
                <Button onClick={() => handleHideDetailsButtonClick()}>
                  Less
                </Button>
              )}
              {starSegment.isLoading ? (
                <Button
                  type="submit"
                  variant="secondary"
                  style={{ width: "75px" }}
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
