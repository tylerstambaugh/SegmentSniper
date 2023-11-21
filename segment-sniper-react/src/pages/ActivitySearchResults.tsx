import { useEffect } from "react";
import useActivityListStore from "../stores/useActivityListStore";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AppRoutes } from "../enums/AppRoutes";
import ActivityCardList from "../components/SegmentSniper/Activities/ActivityCardList/ActivityCardList";
import { useHandleActivitySearch } from "../hooks/Api/Activity/useHandleActivitySearch";

function ActivitySearchResults() {
  // const [selectedActivity, setSelectedActivity] = useState<string>("");
  const resetActivityList = useActivityListStore(
    (state) => state.resetActivityList
  );
  const navigate = useNavigate();
  const handleActivitySearch = useHandleActivitySearch();

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
