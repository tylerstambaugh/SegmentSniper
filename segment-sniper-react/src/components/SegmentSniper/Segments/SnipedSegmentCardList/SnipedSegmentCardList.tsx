import { Container, Row, Col } from "react-bootstrap";
import useSnipedSegmentsListStore from "../../../../stores/useSnipedSegmentsListStore";

const SnipedSegmentsCardList = () => {
  const snipedSegmentsList = useSnipedSegmentsListStore(
    (state) => state.snipedSegmentsList
  );
  return snipedSegmentsList.length > 0 ? (
    <>
      {snipedSegmentsList.map((item) => (
        <></>
      ))}
    </>
  ) : (
    <Container>
      <Row>
        <Col>
          <h4>No activities to display</h4>
        </Col>
      </Row>
    </Container>
  );
};
