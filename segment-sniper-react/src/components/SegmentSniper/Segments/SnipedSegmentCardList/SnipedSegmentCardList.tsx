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
    <Container>
      <Row>
        <Col>
          <h4>No Segments to Snipe</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default SnipedSegmentsCardList;
