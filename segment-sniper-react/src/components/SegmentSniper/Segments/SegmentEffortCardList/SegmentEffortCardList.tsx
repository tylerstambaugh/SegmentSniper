import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import { Col, Container, Row } from "react-bootstrap";
import SegmentEffortCard from "./SegmentEffortCard";
import { v4 as uuidv4 } from "uuid";

type SegmentEffortCardListProps = {
  activityId: string;
};

const SegmentEffortCardList = (props: SegmentEffortCardListProps) => {
  const [segmentEffortList, resetSegmentEffortsList] =
    useSegmentEffortsListStore((state) => [
      state.segmentEffortsList,
      state.resetSegmentEffortsList,
    ]);

  return segmentEffortList.length > 0 ? (
    <>
      {segmentEffortList.map((item) => (
        <SegmentEffortCard
          segmentEffortListItem={item}
          activityId={props.activityId}
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
