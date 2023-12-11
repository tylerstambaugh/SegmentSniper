import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import { Col, Container, Row } from "react-bootstrap";
import SegmentEffortCard from "./SegmentEffortCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";

type SegmentEffortCardListProps = {
  activityId: string;
};

const SegmentEffortCardList = (props: SegmentEffortCardListProps) => {
  const [segmentEffortList, resetSegmentEffortsList] =
    useSegmentEffortsListStore((state) => [
      state.segmentEffortsList,
      state.resetSegmentEffortsList,
    ]);
  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>();

  useEffect(() => {
    console.log("show details segment id", showDetailsSegmentId);
  }, []);

  return segmentEffortList.length > 0 ? (
    <>
      {segmentEffortList.map((item) => (
        <SegmentEffortCard
          segmentEffortListItem={item}
          activityId={props.activityId}
          key={uuidv4()}
          showDetails={showDetailsSegmentId === item.segmentId}
          setShowDetails={setShowDetailsSegmentId}
        />
      ))}
    </>
  ) : (
    <Container>
      <Row>
        <Col>
          <h4>No segment efforts to display</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default SegmentEffortCardList;
