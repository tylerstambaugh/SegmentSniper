import {
  Container,
  Row,
  Col,
  Button,
  FormGroup,
  FormSelect,
  Form,
  FloatingLabel,
  FormLabel,
  Spinner,
} from "react-bootstrap";
import useSnipeSegmentsListStore from "../../../../stores/useSnipeSegmentsListStore";
import SnipeSegmentCard from "./SnipeSegmentCard";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { useFindHeading } from "../../../../hooks/useFindHeading";
import Slider from "../../../UI_Components/Slider/Slider";
import { Headings } from "../../../../enums/Headings";
import { useSnipeSegments } from "../../../../hooks/Api/Segments/useSnipeSegments";
import useActivityListStore from "../../../../stores/useActivityListStore";
import toast from "react-hot-toast";

const SnipeSegmentsCardList = () => {
  const animatedComponents = makeAnimated();
  const [snipeSegmentsList, setSnipeSegment, setSnipeSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.snipeSegmentsList,
      state.setSnipeSegment,
      state.setSnipeSegmentsList,
    ]);
  const snipeSegments = useSnipeSegments();
  const selectedActivityId = useActivityListStore(
    (state) => state.selectedActivityId
  );
  const [useQom, setUseQom] = useState(false);
  const { calculateBearing } = useFindHeading();
  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>("");
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const [secondsFromLeader, setSecondsFromLeader] = useState<number>();
  const [percentageFromLeader, setPercentageFromLeader] = useState<number>();
  const [headingsFilter, setHeadingsFilter] = useState<string[]>([]);
  const headingsArray: { label: string; value: string }[] = Object.entries(
    Headings
  ).map(([key, value]) => ({ label: value, value: key }));

  useEffect(() => {
    if (
      !snipeSegmentsList ||
      snipeSegmentsList.length === 0 ||
      snipeSegmentsList[0].activityId !== selectedActivityId
    ) {
      async () => {
        await snipeSegments.mutateAsync({ activityId: selectedActivityId! });
      };
    }
  }, []);

  useEffect(() => {
    addHeadingToEfforts();
  }, [snipeSegmentsList.length]);

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

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

  function handlePercentageFromLeaderChange(value: number) {
    setPercentageFromLeader(value);
  }

  function handleSecondsFromLeaderChange(value: number) {
    setSecondsFromLeader(value);
  }

  function handleResetSnipeOptions() {
    setSelectedSortOption("Sort by");
    setPercentageFromLeader(0);
    setSecondsFromLeader(0);
    setUseQom(false);
    setHeadingsFilter([]);
    setShowDetailsSegmentId("");
    setSnipeSegmentsList(
      [...snipeSegmentsList].sort(
        (a, b) =>
          +new Date(a.detailedSegmentEffort?.startDate!) -
          +new Date(b.detailedSegmentEffort?.startDate!)
      )
    );
  }

  return snipeSegmentsList.length > 0 ? (
    <>
      <Container className="segment-list-options">
        <Row className="pb-2">
          <Col>
            <p className="mb-1 snipe-options-heading">Snipe Options</p>
          </Col>
          <Col className="text-end">
            <Button
              variant="secondary"
              onClick={() => handleResetSnipeOptions()}
            >
              Reset
            </Button>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className=" text-start snipe-option-label">
            % From {useQom ? `QOM` : "KOM"}:
          </Col>
          <Col xs={8} className="pt-2">
            <Slider
              onChange={(value) => handlePercentageFromLeaderChange(value)}
              value={percentageFromLeader}
              min={0}
              max={100}
              disabled={false}
            />
          </Col>
          <Col xs={4} className="pb-2">
            <Form.Control
              type="number"
              value={percentageFromLeader || ""}
              style={{
                width: "80%",
                display: "inline-block",
                marginRight: "5px",
              }}
              onChange={(e) => setPercentageFromLeader(Number(e.target.value))}
              pattern="[0-9]*"
            />
            <span style={{ display: "inline-block" }}>%</span>
          </Col>
        </Row>
        <FormGroup>
          <Row className="pb-2">
            <Col xs={8} className="text-start">
              <FormLabel className=" snipe-option-label">
                Seconds From {useQom ? `QOM` : "KOM"}:
              </FormLabel>
            </Col>
            <Col className="">
              <Form.Control
                type="number"
                value={secondsFromLeader || ""}
                onChange={(e) => setSecondsFromLeader(Number(e.target.value))}
                pattern="[0-9]*"
                style={{
                  width: "80%",
                  display: "inline-block",
                  marginRight: "25px",
                }}
              />
            </Col>
          </Row>
        </FormGroup>
        <Row className="pb-2">
          <Col xs={6} className="text-start snipe-option-label">
            <p>Heading:</p>
          </Col>

          <Col xs={6} className="text-end">
            <Select
              closeMenuOnSelect={false}
              components={animatedComponents}
              value={headingsArray.filter((h) =>
                headingsFilter.includes(h.value)
              )}
              isMulti
              options={headingsArray}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(selectedOptions) => {
                const selectedValues = selectedOptions.map(
                  (option) => option.value
                );
                setHeadingsFilter(selectedValues);
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col className="text-start snipe-option-label">
            <p>Use QOM:</p>
          </Col>
          <Col className="text-end">
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
        <Row>
          <Col className="text-start snipe-option-label">
            <p>Sort By:</p>
          </Col>
          <Col>
            <FormGroup controlId="sortControl">
              <FormSelect
                value={selectedSortOption}
                onChange={(e) => handleSortChange(e)}
              >
                <option>Select</option>
                <option value="longestDistance">Longest Distance</option>
                <option value="shortestDistance">Shortest Distance</option>
                <option value="shortestTime">Shortest Time</option>
                <option value="longestTime">Longest Time</option>
              </FormSelect>
            </FormGroup>
          </Col>
        </Row>
        <Row></Row>
      </Container>
      <Row className="pt-3">
        <Col className="d-flex justify-content-around">
          <h4>Segments: {snipeSegmentsList.length}</h4>
        </Col>
      </Row>
      <Row>
        {snipeSegments.isLoading ? (
          <Col className="text-center">
            <Spinner
              as="span"
              variant="secondary"
              role="status"
              aria-hidden="true"
              animation="border"
              className="custom=spinner"
            />
          </Col>
        ) : (
          <Col>
            {snipeSegmentsList.map((item) => (
              <SnipeSegmentCard
                key={uuidv4()}
                snipeSegment={item}
                useQom={useQom}
                showDetails={showDetailsSegmentId === item.segmentId}
                setShowDetails={setShowDetailsSegmentId}
              />
            ))}
          </Col>
        )}
      </Row>
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
