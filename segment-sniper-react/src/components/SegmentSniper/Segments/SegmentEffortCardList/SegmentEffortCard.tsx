import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { SegmentEffortListItem } from "../../../../models/Segment/SegmentEffortListItem";
import { useGetSegmentDetails } from "../../../../hooks/Api/Segments/useGetSegmentDetails";
import useSegmentDetailsStore from "../../../../stores/useSegmentDetailsStore";
import { usePostStarSegment } from "../../../../hooks/Api/Segments/usePostStarSegment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as circleCheck } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import ActivityMap from "../../ActivityMap";
import { useFindHeading } from "../../../../hooks/useFindHeading";

type SegmentEffortCardProps = {
  segmentEffortListItem: SegmentEffortListItem;
  activityId: string;
  setShowDetails: (segmentId: string) => void;
  showDetails: boolean;
};

const SegmentEffortCard = (props: SegmentEffortCardProps) => {
  const { calculateBearing } = useFindHeading();
  const setSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.setSegmentEffortsList
  );
  const getSegmentDetails = useGetSegmentDetails();
  const starSegment = usePostStarSegment();
  const segmentDetails = useSegmentDetailsStore((state) =>
    state.segmentDetails.find(
      (sd) => sd.segmentId === props.segmentEffortListItem.segmentId
    )
  );

  const heading = (): string => {
    let startPoint: { lat: number; lng: number } = {
      lat: props.segmentEffortListItem.summarySegment.startLatlng[0],
      lng: props.segmentEffortListItem.summarySegment.startLatlng[1],
    };

    let endPoint: { lat: number; lng: number } = {
      lat: props.segmentEffortListItem.summarySegment.endLatlng[0],
      lng: props.segmentEffortListItem.summarySegment.endLatlng[1],
    };

    return calculateBearing(startPoint, endPoint);
  };

  async function handleShowDetailsButtonClick() {
    await getSegmentDetails.mutateAsync({
      segmentId: props.segmentEffortListItem.segmentId!,
    });
    props.setShowDetails(props.segmentEffortListItem.segmentId!);
  }

  function handleHideDetailsButtonClick() {
    props.setShowDetails("");
  }

  const updateSegmentEffortStarred = (
    segmentEffortsList: SegmentEffortListItem[],
    segmentId: string,
    starred: boolean
  ): SegmentEffortListItem[] => {
    return segmentEffortsList.map((item) =>
      item.segmentId === segmentId
        ? { ...item, summarySegment: { ...item.summarySegment, starred } }
        : item
    );
  };

  async function handleStarButtonClick() {
    const response = await starSegment.mutateAsync({
      segmentId: props.segmentEffortListItem.segmentId!,
      star: !props.segmentEffortListItem.summarySegment.starred,
    });

    if (!starSegment.isError && !starSegment.isLoading && response !== null) {
      setSegmentEffortsList((prevList: SegmentEffortListItem[]) =>
        updateSegmentEffortStarred(
          prevList,
          response.detailedSegment.segmentId,
          response.detailedSegment.starred
        )
      );
    }
  }

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
              <Row className="d-flex justify-content-between">
                <Col sm={6} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.segmentEffortListItem.distance}
                </Col>
                <Col sm={6} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Time:</span>{" "}
                  {props.segmentEffortListItem.elapsedTime}
                </Col>
              </Row>
              <Row>
                {props.segmentEffortListItem.deviceWatts ? (
                  <Col sm={6} md={6} lg={4} xl={3}>
                    <span className="activity-card-label">Average Watts:</span>{" "}
                    {props.segmentEffortListItem.averageWatts}
                  </Col>
                ) : (
                  <></>
                )}
                <Col sm={6} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Max HR:</span>{" "}
                  {props.segmentEffortListItem.maxHeartrate}
                </Col>
              </Row>
              <Row>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Hidden:</span>{" "}
                  {props.segmentEffortListItem.hidden ? `Yes` : "No"}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Direction:</span>{" "}
                  <>{heading()}</>
                </Col>
              </Row>
              {props.showDetails ? (
                <>
                  <Row>
                    <Col>
                      <Col sm={12} md={6} lg={4} xl={3}>
                        <span className="activity-card-label">Kom Time:</span>{" "}
                        {segmentDetails?.xoms.overall}
                      </Col>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <ActivityMap
                        stravaMap={segmentDetails?.map!}
                        startLatlng={segmentDetails?.startLatlng!}
                        endLatlng={segmentDetails?.endLatlng!}
                      />
                    </Col>
                  </Row>
                </>
              ) : (
                <></>
              )}
            </Card.Body>
            <Card.Footer className="d-flex justify-content-around">
              {getSegmentDetails.isLoading ? (
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
              ) : !props.showDetails ? (
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
                  {props.segmentEffortListItem.summarySegment.starred ? (
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

export default SegmentEffortCard;
