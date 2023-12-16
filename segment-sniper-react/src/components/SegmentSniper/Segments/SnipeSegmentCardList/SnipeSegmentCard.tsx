import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import { useState } from "react";
import { useGetSegmentDetails } from "../../../../hooks/Api/Segments/useGetSegmentDetails";
import { usePostStarSegment } from "../../../../hooks/Api/Segments/usePostStarSegment";
import useSegmentDetailsStore from "../../../../stores/useSegmentDetailsStore";
import useSnipeSegmentsListStore from "../../../../stores/useSnipeSegmentsListStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as circleCheck } from "@fortawesome/free-solid-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import ActivityMap from "../../ActivityMap";
import { useFindHeading } from "../../../../hooks/useFindHeading";

type SnipedSegmentCardProps = {
  snipeSegment: SnipeSegmentListItem;
  showDetails: boolean;
  setShowDetails: (segmentId: string) => void;
};

const SnipeSegmentCard = (props: SnipedSegmentCardProps) => {
  const { calculateBearing } = useFindHeading();
  const getSegmentDetails = useGetSegmentDetails();
  const starSegment = usePostStarSegment();
  const setSnipedSegments = useSnipeSegmentsListStore(
    (state) => state.setSnipedSegmentsList
  );
  const segmentDetails = useSegmentDetailsStore((state) =>
    state.segmentDetails.find(
      (sd) => sd.segmentId === props.snipeSegment.segmentId
    )
  );

  async function handleShowDetailsButtonClick() {
    await getSegmentDetails.mutateAsync({
      segmentId: props.snipeSegment.segmentId!,
    });
    props.setShowDetails(props.snipeSegment.segmentId!);
  }

  function handleHideDetailsButtonClick() {
    props.setShowDetails("");
  }

  const heading = (): string => {
    let startPoint: { lat: number; lng: number } = {
      lat: props.snipeSegment.summarySegment!.startLatlng[0],
      lng: props.snipeSegment.summarySegment!.startLatlng[1],
    };

    let endPoint: { lat: number; lng: number } = {
      lat: props.snipeSegment.summarySegment!.endLatlng[0],
      lng: props.snipeSegment.summarySegment!.endLatlng[1],
    };

    return calculateBearing(startPoint, endPoint);
  };

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
                  {props.snipeSegment.distance}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">KOM Time:</span>{" "}
                  {props.snipeSegment.komTime}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Seconds From Kom:</span>{" "}
                  {props.snipeSegment.secondsFromKom}
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
                  <span className="activity-card-label">Direction:</span>{" "}
                  <>{heading()}</>
                </Col>
                {props.showDetails ? (
                  <>
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
              </Row>
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
