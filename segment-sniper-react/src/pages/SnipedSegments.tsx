import { Button, Col, Container, Row } from "react-bootstrap";
import SnipeSegmentsCardList from "../components/SegmentSniper/Segments/SnipeSegmentCardList/SnipeSegmentCardList";
import useSnipeSegmentsListStore from "../stores/useSnipeSegmentsListStore";
import { AppRoutes } from "../enums/AppRoutes";
import { useNavigate } from "react-router-dom";
import useActivityListStore from "../stores/useActivityListStore";

const SnipedSegments = () => {
  const navigate = useNavigate();
  const setSelectedActivityId = useActivityListStore(
    (state) => state.setSelectedActivityId
  );

  function backToActivitiesButtonClick() {
    setSelectedActivityId("");
    navigate(`/${AppRoutes.ActivitySearchResults}`);
  }
  return (
    <Container>
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
          <h3>Sniped Segments</h3>
        </Col>
      </Row>
      <SnipeSegmentsCardList />
    </Container>
  );
};

export default SnipedSegments;
