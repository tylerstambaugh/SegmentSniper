import { useEffect, useState } from "react";
import useActivityListStore from "../../stores/useActivityListStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../../enums/AppRoutes";
import useSegmentEffortsListStore from "../../stores/useSegmentEffortsListStore";

import ActivityCardCarousel from "../../components/Molecules/Activity/ActivityCardCarousel/ActivityCardCarousel";

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
    <Col md={8} xs={10} className="mx-auto">
      <Row className="pt-1">
        <Col className="d-flex justify-content-around">
          <Button
            name="backToSearch"
            onClick={() => {
              clearSearchResults();
              navigate(`/${AppRoutes.Snipe}`);
            }}
            className="mt-2 px-2 me-3"
          >
            Back
          </Button>
          <h3 className="pt-2 mb-0 ms-4 ">Search Results</h3>
        </Col>
      </Row>
      <Row>
        <ActivityCardCarousel />
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
    </Col>
  );
}

export default ActivitySearchResults;
