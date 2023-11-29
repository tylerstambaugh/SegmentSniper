import { useEffect, useState } from "react";
import useActivityListStore from "../stores/useActivityListStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCardList from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCardList";
import { useHandleActivitySearch } from "../hooks/Api/Activity/useHandleActivitySearch";
import useSegmentEffortsListStore from "../stores/useSegmentEffortsListStore";
import { useSnipeSegments } from "../hooks/Api/Activity/useSnipeSegments";
import { SegmentDetails } from "../models/Segment/SegmentDetails";
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
  const [isSnipeList, setIsSnipeList] = useState(false);
  const [segmentDetailsModalData, setSegmentDetailsModalData] =
    useState<SegmentDetails>();

  const handleCloseSnipeSegmentsModal = () => {
    setShowSnipeSegmentsModal(false), setSelectedActivityId("");
  };
  const handleShowSnipeSegmentsModal = () => setShowSnipeSegmentsModal(true);

  const handleActivitySearch = useHandleActivitySearch();

  const snipeSegments = useSnipeSegments();

  async function handleSnipeSegments(request: SnipeSegmentsRequest) {
    request.activityId = selectedActivityId!;
    await snipeSegments.mutateAsync(request);
    setIsSnipeList(true);
    navigate(AppRoutes.SnipedSegments);
  }

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

  const clearSearchResults = () => {
    resetActivityList();
    setSelectedActivity("");
    resetSegmentEffortsList();
  };

  useEffect(() => {
    console.log("activity search loading:", handleActivitySearch.isLoading);
  }, [handleActivitySearch.isLoading]);

  return handleActivitySearch.isLoading ? (
    <>
      <Container>
        <Row>
          <Col>
            <Spinner
              as="span"
              variant="light"
              size="sm"
              role="status"
              aria-hidden="true"
              animation="border"
            />
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <>
      <Container fluid>
        <SnipeSegmentsModal
          show={showSnipeSegmentsModal}
          handleClose={handleCloseSnipeSegmentsModal}
          handleSnipeSegments={handleSnipeSegments}
        />
        <Row className="pt-3">
          <Col className="d-flex justify-content-around">
            <h3>Activity Search Results</h3>
            <Button
              name="backToSearch"
              onClick={() => {
                clearSearchResults();
                navigate(AppRoutes.Snipe);
              }}
            >
              Back to Search
            </Button>
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
    </>
  );
}

export default ActivitySearchResults;
