import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import {
  Button,
  Col,
  Container,
  FormGroup,
  FormLabel,
  FormSelect,
  Row,
} from "react-bootstrap";
import SegmentEffortCard from "./SegmentEffortCard";
import { v4 as uuidv4 } from "uuid";
import { faFilter as filterBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type SegmentEffortCardListProps = {
  activityId: string;
};

const SegmentEffortCardList = (props: SegmentEffortCardListProps) => {
  const [segmentEffortList, setSegmentEffortsList, resetSegmentEffortsList] =
    useSegmentEffortsListStore((state) => [
      state.segmentEffortsList,
      state.setSegmentEffortsList,
      state.resetSegmentEffortsList,
    ]);
  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>();
  const [showSortByDirection, setShowSortByDirection] =
    useState<boolean>(false);

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    if (event.target.value === "distance") {
      setSegmentEffortsList(
        [...segmentEffortList].sort((a, b) => a.distance! - b.distance!)
      );
    }
  }
  return segmentEffortList.length > 0 ? (
    <>
      <Row className="d-flex justify-content-end">
        <Col sm={4}>
          <FormGroup controlId="sortControl">
            <FormSelect onChange={(e) => handleSortChange(e)}>
              <option>Sort by</option>
              <option value="distance">Distance</option>
              <option value="elapsedTime">Elapsed Time</option>
              <option value="direction">Direction</option>
            </FormSelect>
          </FormGroup>
        </Col>
        <Col>
          <Button>Reset</Button>
        </Col>
      </Row>
      {showSortByDirection ? (
        <>
          <FormGroup></FormGroup>
        </>
      ) : (
        <></>
      )}
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
