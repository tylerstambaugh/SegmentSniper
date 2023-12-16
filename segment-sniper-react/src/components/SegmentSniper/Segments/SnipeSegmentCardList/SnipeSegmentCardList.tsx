import { Container, Row, Col } from "react-bootstrap";
import useSnipeSegmentsListStore from "../../../../stores/useSnipeSegmentsListStore";
import SnipeSegmentCard from "./SnipeSegmentCard";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const SnipeSegmentsCardList = () => {
  const snipeSegmentsList = useSnipeSegmentsListStore(
    (state) => state.snipeSegmentsList
  );
  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>("");

  return snipeSegmentsList.length > 0 ? (
    <>
      {snipeSegmentsList.map((item) => (
        <SnipeSegmentCard
          key={uuidv4()}
          snipeSegment={item}
          showDetails={showDetailsSegmentId === item.segmentId}
          setShowDetails={setShowDetailsSegmentId}
        />
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

export default SnipeSegmentsCardList;
