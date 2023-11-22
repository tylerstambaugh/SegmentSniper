import { useEffect } from "react";
import useActivityListStore from "../stores/useActivityListStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCardList from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCardList";
import { useHandleActivitySearch } from "../hooks/Api/Activity/useHandleActivitySearch";
import useSegmentEffortsListStore from "../stores/useSegmentEffortsListStore";

function ActivitySearchResults() {
  const navigate = useNavigate();
  const [setSelectedActivity, resetActivityList] = useActivityListStore(
    (state) => [state.setSelectedActivityId, state.resetActivityList]
  );

  const resetSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );

  const handleActivitySearch = useHandleActivitySearch();

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
            <ActivityCardList />
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
