import { useEffect, useState } from "react";
import { useSnipeSegments } from "../hooks/Api/Segments/useSnipeSegments";
import useActivityListStore from "../stores/useActivityListStore";
import { SnipeSegmentsRequest } from "../services/Api/Segment/postSnipeSegmentsList";
import toast from "react-hot-toast";
import { Button, Col, Container, Row } from "react-bootstrap";
import SegmentDetailsModal from "../components/SegmentSniper/Segments/SegmentDetailsModal";
import SnipeSegmentsModal from "../components/SegmentSniper/Segments/SnipeSegmentsModal";
import SegmentEffortCardList from "../components/SegmentSniper/Segments/SegmentEffortCardList/SegmentEffortCardList";
import { SegmentDetails } from "../models/Segment/SegmentDetails";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCard from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCard";

const ActivityDetails = () => {
  const navigate = useNavigate();
  const [showSnipeSegmentsModal, setShowSnipeSegmentsModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [activityList, setSelectedActivityId, selectedActivityId] =
    useActivityListStore((state) => [
      state.activityList,
      state.setSelectedActivityId,
      state.selectedActivityId,
    ]);

  const snipeSegments = useSnipeSegments();

  const [segmentDetailsModalData, setSegmentDetailsModalData] =
    useState<SegmentDetails>();

  const handleCloseSnipeSegmentsModal = () => {
    setShowSnipeSegmentsModal(false);
  };
  const handleShowSnipeSegmentsModal = () => setShowSnipeSegmentsModal(true);
  const handleCloseSegmentDetailModal = () => setShowSegmentDetailModal(false);

  async function handleSnipeSegments(request: SnipeSegmentsRequest) {
    request.activityId = selectedActivityId!;
    await snipeSegments.mutateAsync(request);
    navigate(AppRoutes.SnipedSegments);
  }

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

  function backToActivitiesButtonClick() {
    setSelectedActivityId("");
    navigate(AppRoutes.ActivitySearchResults);
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
        <SnipeSegmentsModal
          show={showSnipeSegmentsModal}
          handleClose={handleCloseSnipeSegmentsModal}
        />
        <SegmentDetailsModal
          show={showSegmentDetailModal}
          handleClose={handleCloseSegmentDetailModal}
          segment={segmentDetailsModalData}
        />
        <ActivityCard
          activity={
            activityList.find((a) => a.activityId === selectedActivityId)!
          }
          handleShowSnipeSegmentsModal={handleShowSnipeSegmentsModal}
        />
        <Row className="pt-3">
          <Col className="d-flex justify-content-around">
            <h4>Segment Efforts</h4>
          </Col>
        </Row>
        <SegmentEffortCardList activityId={selectedActivityId!} />
        <Row className="justify-content-center">
          <Col className="text-center pt-3 pb-3">
            <Button
              name="backToSearch"
              onClick={() => {
                setSelectedActivityId("");
                navigate(AppRoutes.ActivitySearchResults);
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
