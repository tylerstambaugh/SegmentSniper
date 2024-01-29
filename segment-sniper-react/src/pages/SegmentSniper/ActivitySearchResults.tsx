import { useEffect, useState } from "react";
import useActivityListStore from "../../stores/useActivityListStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import ActivityCardList from "../../components/Molecules/Activity/ActivityCardList/ActivityCardList";
import useSegmentEffortsListStore from "../../stores/useSegmentEffortsListStore";
import { useSnipeSegments } from "../../hooks/Api/Segments/useSnipeSegments";
import toast from "react-hot-toast";

function ActivitySearchResults() {
  const navigate = useNavigate();
  const [setSelectedActivity, resetActivityList] = useActivityListStore(
    (state) => [state.setSelectedActivityId, state.resetActivityList]
  );
  const resetSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );

  const clearSearchResults = () => {
    resetActivityList();
    setSelectedActivity("");
    resetSegmentEffortsList();
  };

  useEffect(() => {
    setSelectedActivity("");
  }, []);

  return (
    <Container fluid>
      <Row className="pt-3">
        <Col className="d-flex justify-content-around">
          <Button
            name="backToSearch"
            onClick={() => {
              clearSearchResults();
              navigate(`/${AppRoutes.Snipe}`);
            }}
          >
            Back
          </Button>
          <h3>Search Results</h3>
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
              navigate(`/${AppRoutes.Snipe}`);
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
