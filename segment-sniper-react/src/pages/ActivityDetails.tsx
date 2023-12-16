import { useEffect, useState } from "react";
import { useSnipeSegments } from "../hooks/Api/Segments/useSnipeSegments";
import useActivityListStore from "../stores/useActivityListStore";
import { SnipeSegmentsRequest } from "../services/Api/Segment/getSnipeSegmentsList";
import toast from "react-hot-toast";
import { Button, Col, Container, Row } from "react-bootstrap";
import SegmentDetailsModal from "../components/SegmentSniper/Segments/SegmentDetailsModal";
import SnipeSegmentsModal from "../components/SegmentSniper/Segments/SnipeSegmentsModal";
import SegmentEffortCardList from "../components/SegmentSniper/Segments/SegmentEffortCardList/SegmentEffortCardList";
import { SegmentDetails } from "../models/Segment/SegmentDetails";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCard from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCard";
import SnipeSegmentsCardList from "../components/SegmentSniper/Segments/SnipeSegmentCardList/SnipeSegmentCardList";
import useSnipeSegmentsListStore from "../stores/useSnipeSegmentsListStore";
import { useGetSegmentDetails } from "../hooks/Api/Segments/useGetSegmentDetails";

const ActivityDetails = () => {
  const navigate = useNavigate();
  const [activityList, setSelectedActivityId, selectedActivityId] =
    useActivityListStore((state) => [
      state.activityList,
      state.setSelectedActivityId,
      state.selectedActivityId,
    ]);

  const snipeSegments = useSnipeSegments();

  useEffect(() => {
    (async () => {
      await snipeSegments.mutateAsync({ activityId: selectedActivityId! });
    })();
    console.log("getting snipe segments");
  }, []);

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
        {snipeSegments.isLoading ? <>Loading</> : <SnipeSegmentsCardList />}
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
