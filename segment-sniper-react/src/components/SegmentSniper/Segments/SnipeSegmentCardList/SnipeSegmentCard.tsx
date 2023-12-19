import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import { usePostStarSegment } from "../../../../hooks/Api/Segments/usePostStarSegment";
import useSnipeSegmentsListStore from "../../../../stores/useSnipeSegmentsListStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ActivityMap from "../../ActivityMap";
import { useFindHeading } from "../../../../hooks/useFindHeading";
import { SummarySegment } from "../../../../models/Segment/SummarySegment";
import { BooleanSchema } from "yup";
import { useConvertTimeStringToNumericValue } from "../../../../hooks/useConvertTimeStringToNumericValue";

type SnipedSegmentCardProps = {
  snipeSegment: SnipeSegmentListItem;
  showDetails: boolean;
  useQom: boolean;
  setShowDetails: (segmentId: string) => void;
};

const SnipeSegmentCard = (props: SnipedSegmentCardProps) => {
  const starSegment = usePostStarSegment();
  const convertTime = useConvertTimeStringToNumericValue();
  const [snipeSegmentsList, setSnipedSegments] = useSnipeSegmentsListStore(
    (state) => [state.snipeSegmentsList, state.setSnipeSegmentsList]
  );

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
  ): SnipeSegmentListItem[] => {
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
      setSnipedSegments((prevList: SnipeSegmentListItem[]) =>
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
              <Row className="justify-content-between">
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.snipeSegment.distance} mi.
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">My Time:</span> {myTime}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">My PR Time:</span>{" "}
                  {props.snipeSegment.athleteStats?.prElapsedTime}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">
                    {!props.useQom ? `KOM Time:` : `QOM Time:`}
                  </span>{" "}
                  {!props.useQom
                    ? props.snipeSegment.komTime
                    : props.snipeSegment.qomTime}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">
                    Seconds From {!props.useQom ? `KOM:` : `QOM:`}
                  </span>{" "}
                  {!props.useQom
                    ? props.snipeSegment.secondsFromKom
                    : props.snipeSegment.secondsFromQom}
                </Col>
                {props.snipeSegment.athleteStats?.effortCount! > 1 ? (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <span className="activity-card-label">PR Time:</span>{" "}
                    {props.snipeSegment.athleteStats?.prElapsedTime}
                  </Col>
                ) : (
                  <></>
                )}
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Heading:</span>{" "}
                  <>{props.snipeSegment.heading}</>
                </Col>
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
