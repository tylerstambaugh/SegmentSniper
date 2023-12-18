import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormSelect,
  Form,
} from "react-bootstrap";
import useSnipeSegmentsListStore from "../../../../stores/useSnipeSegmentsListStore";
import SnipeSegmentCard from "./SnipeSegmentCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useConvertTimeStringToNumericValue } from "../../../../hooks/useConvertTimeStringToNumericValue";
import { useFindHeading } from "../../../../hooks/useFindHeading";

const SnipeSegmentsCardList = () => {
  const [snipeSegmentsList, setSnipeSegment, setSnipeSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.snipeSegmentsList,
      state.setSnipeSegment,
      state.setSnipeSegmentsList,
    ]);

  const [useQom, setUseQom] = useState(false);
  const convertTime = useConvertTimeStringToNumericValue();
  const { calculateBearing } = useFindHeading();
  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");

  function handleSortChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedSortOption(event.target.value);
    if (event.target.value === "shortestDistance") {
      setSnipeSegmentsList(
        [...snipeSegmentsList].sort((a, b) => a.distance! - b.distance!)
      );
    }
    if (event.target.value === "longestDistance") {
      setSnipeSegmentsList(
        [...snipeSegmentsList].sort((a, b) => b.distance! - a.distance!)
      );
    }
    if (event.target.value === "shortestTime") {
      setSnipeSegmentsList(
        [...snipeSegmentsList].sort(
          (a, b) =>
            a.detailedSegmentEffort?.elapsedTime! -
            b.detailedSegmentEffort?.elapsedTime!
        )
      );
    }
    if (event.target.value === "longestTime") {
      setSnipeSegmentsList(
        [...snipeSegmentsList].sort(
          (a, b) =>
            b.detailedSegmentEffort?.elapsedTime! -
            a.detailedSegmentEffort?.elapsedTime!
        )
      );
    }
  }

  function handleResetSort() {
    setSelectedSortOption("Sort by");
    setShowDetailsSegmentId("");
    setSnipeSegmentsList(
      [...snipeSegmentsList].sort(
        (a, b) =>
          +new Date(a.detailedSegmentEffort?.startDate!) -
          +new Date(b.detailedSegmentEffort?.startDate!)
      )
    );
  }

  useEffect(() => {
    addHeadingToEfforts();
  }, []);

  function addHeadingToEfforts() {
    snipeSegmentsList.map((item) => {
      let segment = item.detailedSegmentEffort?.summarySegment;
      if (segment) {
        let startPoint: { lat: number; lng: number } = {
          lat: segment.startLatlng[0],
          lng: segment.startLatlng[1],
        };

        let endPoint: { lat: number; lng: number } = {
          lat: segment.endLatlng[0],
          lng: segment.endLatlng[1],
        };

        item = { ...item, heading: calculateBearing(startPoint, endPoint) };

        setSnipeSegment(item);
      }
    });
  }

  return snipeSegmentsList.length > 0 ? (
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
        <Row>
          <Col>
            <p>Use QOM:</p>
          </Col>
          <Col>
            <Form.Check
              type="switch"
              checked={useQom}
              id="QomSwitch"
              onChange={(e) => {
                setUseQom(e.target.checked);
              }}
            />
          </Col>
        </Row>
      </Container>
      {snipeSegmentsList.map((item) => (
        <SnipeSegmentCard
          key={uuidv4()}
          snipeSegment={item}
          useQom={useQom}
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
