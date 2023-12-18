import { useEffect, useState } from "react";
import { useSnipeSegments } from "../hooks/Api/Segments/useSnipeSegments";
import useActivityListStore from "../stores/useActivityListStore";
import toast from "react-hot-toast";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCard from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCard";
import SnipeSegmentsCardList from "../components/SegmentSniper/Segments/SnipeSegmentCardList/SnipeSegmentCardList";
import useSnipeSegmentsListStore from "../stores/useSnipeSegmentsListStore";
import { SnipeSegmentListItem } from "../models/Segment/SnipeSegmentListItem";

const ActivityDetails = () => {
  const navigate = useNavigate();
  const [activityList, setSelectedActivityId, selectedActivityId] =
    useActivityListStore((state) => [
      state.activityList,
      state.setSelectedActivityId,
      state.selectedActivityId,
    ]);
  const snipeSegmentsList: SnipeSegmentListItem[] = useSnipeSegmentsListStore(
    (state) => state.snipeSegmentsList
  );

  const snipeSegments = useSnipeSegments();

  useEffect(() => {
    if (
      !snipeSegmentsList ||
      snipeSegmentsList.length === 0 ||
      snipeSegmentsList[0].activityId !== selectedActivityId
    ) {
      (async () => {
        await snipeSegments.mutateAsync({ activityId: selectedActivityId! });
      })();
    }
  }, [selectedActivityId]);

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

  function backToActivitiesButtonClick() {
    setSelectedActivityId("");
    navigate(`/${AppRoutes.ActivitySearchResults}`);
  }

  return (
    <>
      <Container className="mb-4">
        <Row className="pt-3">
          <Col className="d-flex justify-content-around">
            <Button
              name="backToSearch"
              onClick={() => {
                backToActivitiesButtonClick();
              }}
            >
              Back
            </Button>
            <h3>Activity Details</h3>
          </Col>
        </Row>
        <ActivityCard
          activity={
            activityList.find((a) => a.activityId === selectedActivityId)!
          }
        />
        <Row className="pt-3">
          <Col className="d-flex justify-content-around">
            <h4>Segments</h4>
          </Col>
        </Row>
        <Col className="text-center">
          {snipeSegments.isLoading ? (
            <Spinner
              as="span"
              variant="secondary"
              role="status"
              aria-hidden="true"
              animation="border"
              className="custom=spinner"
            />
          ) : (
            <SnipeSegmentsCardList />
          )}
        </Col>
        <Row className="justify-content-center">
          <Col className="text-center pt-3 pb-3">
            <Button
              name="backToSearch"
              onClick={() => {
                setSelectedActivityId("");
                navigate(`/${AppRoutes.ActivitySearchResults}`);
              }}
            >
              Back to Activities
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ActivityDetails;
