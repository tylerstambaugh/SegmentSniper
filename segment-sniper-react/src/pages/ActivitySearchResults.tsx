import { useState } from "react";
import ActivityListDataTable from "../components/SegmentSniper/Activities/ActivityListDataTable";
import useActivityListStore from "../stores/useActivityListStore";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCardList from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCardList";
import { useHandleActivitySearch } from "../hooks/Api/Activity/useHandleActivitySearch";

function ActivitySearchResults() {
  const [selectedActivity, setSelectedActivity] = useState<string>("");
  const resetActivityList = useActivityListStore(
    (state) => state.resetActivityList
  );
  const navigate = useNavigate();
  const handleActivitySearch = useHandleActivitySearch();

  return handleActivitySearch.isLoading ? (
    <>
      <Container>
        <Row>
          <Col>
            <h2>Loading</h2>
          </Col>
        </Row>
      </Container>
    </>
  ) : (
    <>
      <Container>
        <Row>
          <Col>
            <ActivityCardList />
          </Col>
        </Row>
        <Row>
          <Col>
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
