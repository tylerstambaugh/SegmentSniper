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
import { useEffect, useState } from "react";
import { useFindHeading } from "../../../../hooks/useFindHeading";

type SegmentEffortCardListProps = {
  activityId: string;
};

const SegmentEffortCardList = (props: SegmentEffortCardListProps) => {
  const [
    segmentEffortsList,
    setSegmentEffortsList,
    setSegmentEffort,
    resetSegmentEffortsList,
  ] = useSegmentEffortsListStore((state) => [
    state.segmentEffortsList,
    state.setSegmentEffortsList,
    state.setSegmentEffort,
    state.resetSegmentEffortsList,
  ]);
  const { calculateBearing } = useFindHeading();
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");

  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>();

  useEffect(() => {
    addHeadingToEfforts();
  }, []);

  function timeStringToNumericValue(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    return totalSeconds;
  }

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSortOption(event.target.value);
    if (event.target.value === "shortestDistance") {
      setSegmentEffortsList(
        [...segmentEffortsList].sort((a, b) => a.distance! - b.distance!)
      );
    }
    if (event.target.value === "longestDistance") {
      setSegmentEffortsList(
        [...segmentEffortsList].sort((a, b) => b.distance! - a.distance!)
      );
    }
    if (event.target.value === "shortestTime") {
      setSegmentEffortsList(
        [...segmentEffortsList].sort(
          (a, b) =>
            timeStringToNumericValue(a.elapsedTime!) -
            timeStringToNumericValue(b.elapsedTime!)
        )
      );
    }
    if (event.target.value === "longestTime") {
      setSegmentEffortsList(
        [...segmentEffortsList].sort(
          (a, b) =>
            timeStringToNumericValue(b.elapsedTime!) -
            timeStringToNumericValue(a.elapsedTime!)
        )
      );
    }
  }

  function handleResetSort() {
    setSelectedSortOption("Sort by");
    setShowDetailsSegmentId("");
    setSegmentEffortsList(
      [...segmentEffortsList].sort(
        (a, b) => +new Date(a.startDate!) - +new Date(b.startDate!)
      )
    );
  }

  function addHeadingToEfforts() {
    segmentEffortsList.map((item) => {
      let startPoint: { lat: number; lng: number } = {
        lat: item.summarySegment.startLatlng[0],
        lng: item.summarySegment.startLatlng[1],
      };

      let endPoint: { lat: number; lng: number } = {
        lat: item.summarySegment.endLatlng[0],
        lng: item.summarySegment.endLatlng[1],
      };

      item = { ...item, heading: calculateBearing(startPoint, endPoint) };

      setSegmentEffort(item);
    });
  }

  return segmentEffortsList.length > 0 ? (
    <>
      <Container className="segment-list-options">
        <Row>
          <Col>
            <p className="mb-0">Options:</p>
          </Col>
        </Row>
        <Row className="d-flex align-items-center ">
          <Col className="mb-2 mb-sm-0">
            <FormGroup controlId="sortControl">
              <FormSelect
                value={selectedSortOption}
                onChange={(e) => handleSortChange(e)}
              >
                <option>Sort by</option>
                <option value="longestDistance">Longest Distance</option>
                <option value="shortestDistance">Shortest Distance</option>
                <option value="shortestTime">Shortest Time</option>
                <option value="longestTime">Longest Time</option>
              </FormSelect>
            </FormGroup>
          </Col>
          <Col>
            <Button onClick={() => handleResetSort()}>Reset</Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Filter Segment Heading</p>
          </Col>
        </Row>
      </Container>
      {segmentEffortsList.map((item) => (
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
