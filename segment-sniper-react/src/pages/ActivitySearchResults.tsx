import { useEffect, useState } from "react";
import useActivityListStore from "../stores/useActivityListStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCardList from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCardList";
import useSegmentEffortsListStore from "../stores/useSegmentEffortsListStore";
import { useSnipeSegments } from "../hooks/Api/Segments/useSnipeSegments";
import toast from "react-hot-toast";
import SnipeSegmentsModal from "../components/SegmentSniper/Segments/SnipeSegmentsModal";
import { SnipeSegmentsRequest } from "../services/Api/Segment/postSnipeSegmentsList";

function ActivitySearchResults() {
  const navigate = useNavigate();
  const [
    setSelectedActivity,
    selectedActivityId,
    setSelectedActivityId,
    resetActivityList,
  ] = useActivityListStore((state) => [
    state.setSelectedActivityId,
    state.selectedActivityId,
    state.setSelectedActivityId,
    state.resetActivityList,
  ]);
  const [showSnipeSegmentsModal, setShowSnipeSegmentsModal] = useState(false);
  const resetSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );

  const handleCloseSnipeSegmentsModal = () => {
    setShowSnipeSegmentsModal(false), setSelectedActivityId("");
  };
  const handleShowSnipeSegmentsModal = () => setShowSnipeSegmentsModal(true);

  const snipeSegments = useSnipeSegments();

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

  const clearSearchResults = () => {
    resetActivityList();
    setSelectedActivity("");
    resetSegmentEffortsList();
  };

  return (
    <Container fluid>
      <SnipeSegmentsModal
        show={showSnipeSegmentsModal}
        handleClose={handleCloseSnipeSegmentsModal}
      />
      <Row className="pt-3">
        <Col className="d-flex justify-content-around">
          <Button
            name="backToSearch"
            onClick={() => {
              clearSearchResults();
              navigate(AppRoutes.Snipe);
            }}
          >
            Back
          </Button>
          <h3>Search Results</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <ActivityCardList
            handleShowSnipeSegmentsModal={handleShowSnipeSegmentsModal}
          />
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col className="text-center pt-3 pb-3">
          <Button
            name="backToSearch"
            onClick={() => {
              resetActivityList();
              navigate(AppRoutes.Snipe);
            }}
          >
            Back to Search
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ActivitySearchResults;
