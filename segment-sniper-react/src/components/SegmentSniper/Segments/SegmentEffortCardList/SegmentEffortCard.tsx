import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { SegmentEffort } from "../../../../models/Segment/SegmentEffort";
import { SegmentEffortListItem } from "../../../../models/Segment/SegmentEffortListItem";
import { useEffect, useState } from "react";
import { useGetSegmentDetails } from "../../../../hooks/Api/Segments/useGetSegmentDetails";
import useSegmentDetailsStore from "../../../../stores/useSegmentDetailsStore";
import { usePostStarSegment } from "../../../../hooks/Api/Segments/usePostStarSegment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as circleCheck } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";

type SegmentEffortCardProps = {
  segmentEffortListItem: SegmentEffortListItem;
  activityId: string;
};

const SegmentEffortCard = (props: SegmentEffortCardProps) => {
  const [showDetails, setShowDetails] = useState(false);
  const setSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.setSegmentEffortsList
  );
  const getSegmentDetails = useGetSegmentDetails();
  const starSegment = usePostStarSegment();
  const segmentDetails = useSegmentDetailsStore(
    (state) => state.segmentDetails
  );

  async function handleDetailsButtonClick() {
    if (!showDetails && segmentDetails === null)
      await getSegmentDetails.mutateAsync({
        segmentId: props.segmentEffortListItem.segmentId!,
      });
    setShowDetails(!showDetails);
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
      star: !segmentDetails?.starred!,
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
              <Row className="justify-content-between">
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Distance:</span>{" "}
                  {props.segmentEffortListItem.distance}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Elapsed Time:</span>{" "}
                  {props.segmentEffortListItem.elapsedTime}
                </Col>
                {props.segmentEffortListItem.deviceWatts ? (
                  <Col sm={12} md={6} lg={4} xl={3}>
                    <span className="activity-card-label">Average Watts:</span>{" "}
                    {props.segmentEffortListItem.averageWatts}
                  </Col>
                ) : (
                  <></>
                )}
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Max Heart Rate:</span>{" "}
                  {props.segmentEffortListItem.maxHeartrate}
                </Col>
                <Col sm={12} md={6} lg={4} xl={3}>
                  <span className="activity-card-label">Hidden:</span>{" "}
                  {props.segmentEffortListItem.hidden ? `Yes` : "No"}
                </Col>
              </Row>
              {showDetails ? (
                <Row>
                  <Col>
                    <Col sm={12} md={6} lg={4} xl={3}>
                      <span className="activity-card-label">Kom Time:</span>{" "}
                      {segmentDetails?.xoms.overall}
                    </Col>
                  </Col>
                </Row>
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
              ) : (
                <Button onClick={() => handleDetailsButtonClick()}>
                  Details
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
                    <FontAwesomeIcon icon={circleCheck} />
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
