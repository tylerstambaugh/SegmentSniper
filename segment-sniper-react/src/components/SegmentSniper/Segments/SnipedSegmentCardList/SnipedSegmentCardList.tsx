import { Container, Row, Col } from "react-bootstrap";
import useSnipedSegmentsListStore from "../../../../stores/useSnipedSegmentsListStore";
import SnipedSegmentCard from "./SnipedSegmentCard";

const SnipedSegmentsCardList = () => {
  const snipedSegmentsList = useSnipedSegmentsListStore(
    (state) => state.snipedSegmentsList
  );
  return snipedSegmentsList.length > 0 ? (
    <>
      {snipedSegmentsList.map((item) => (
        <SnipedSegmentCard snipedSegment={item} />
      ))}
    </>
  ) : (
    <Container fluid>
      <Row className="align-items-center justify-content-center pt-5">
        <Col className="text-center">
          <h4>No Segments to Snipe</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default SnipedSegmentsCardList;
