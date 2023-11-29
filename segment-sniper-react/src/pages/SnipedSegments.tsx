import { Button, Col, Container, Row } from "react-bootstrap";
import SnipedSegmentsCardList from "../components/SegmentSniper/Segments/SnipedSegmentCardList/SnipedSegmentCardList";
import useSnipedSegmentsListStore from "../stores/useSnipedSegmentsListStore";
import { AppRoutes } from "../enums/AppRoutes";
import { useNavigate } from "react-router-dom";

const SnipedSegments = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Row className="pt-3">
        <Col className="d-flex justify-content-around">
          <h3>Sniped Segments</h3>
          <Button
            name="backToSearch"
            onClick={() => {
              navigate(AppRoutes.ActivitySearchResults);
            }}
          >
            Back to Activities
          </Button>
        </Col>
      </Row>
      <SnipedSegmentsCardList />
    </Container>
  );
};

export default SnipedSegments;
