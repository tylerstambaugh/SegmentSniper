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
import { SnipeSegmentListItem } from "../../../../models/Segment/SnipeSegmentListItem";
import { useConvertTimeStringToNumericValue } from "../../../../hooks/useConvertTimeStringToNumericValue";

const SnipeSegmentsCardList = () => {
  const selectedActivityId = useActivityListStore(
    (state) => state.selectedActivityId
  );
  const snipeSegments = useSnipeSegments();
  const [snipeSegmentsList, setSnipeSegment, setSnipeSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.snipeSegmentsList.filter(
        (s) => s.activityId === selectedActivityId
      ) || [],
      state.setSnipeSegment,
      state.setSnipeSegmentsList,
    ]);

  const [filteredSnipeSegments, setFilteredSnipeSegments] =
    useState<SnipeSegmentListItem[]>(snipeSegmentsList);
  const [useQom, setUseQom] = useState(false);
  const [filtering, setFiltering] = useState(false);
  const [showDetailsSegmentId, setShowDetailsSegmentId] = useState<string>("");
  const [percentageFromLeader, setPercentageFromLeader] = useState<
    number | null
  >();
  const [secondsFromLeader, setSecondsFromLeader] = useState<number | null>();
  const [headingsFilter, setHeadingsFilter] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] = useState<string>("");
  const headingsArray: { label: string; value: string }[] = Object.entries(
    Headings
  ).map(([key, value]) => ({ label: value, value: key }));
  const animatedComponents = makeAnimated();
  const { calculateBearing } = useFindHeading();
  const convertTime = useConvertTimeStringToNumericValue();

  useEffect(() => {
    const fetchSnipeSegments = async () => {
      try {
        await snipeSegments.mutateAsync({ activityId: selectedActivityId! });
      } catch (error) {
        toast.error(`Error fetching snipe segments: ${error}`);
      }
    };

    if (
      !Array.isArray(snipeSegmentsList) ||
      snipeSegmentsList.filter((s) => s.activityId === selectedActivityId)
        .length === 0
    ) {
      fetchSnipeSegments().then(() => addHeadingToEfforts());
    }
  }, []);

  function addHeadingToEfforts() {
    setSnipeSegmentsList((prevList) =>
      prevList.map((item) => {
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

          return {
            ...item,
            heading: calculateBearing(startPoint, endPoint),
          };
        }
        return item;
      })
    );
  }

  function handleSortChange() {
    if (selectedSortOption === "shortestDistance") {
      setFilteredSnipeSegments(
        [...filteredSnipeSegments].sort((a, b) => a.distance! - b.distance!)
      );
    }
    if (selectedSortOption === "longestDistance") {
      setFilteredSnipeSegments(
        [...filteredSnipeSegments].sort((a, b) => b.distance! - a.distance!)
      );
    }
    if (selectedSortOption === "shortestTime") {
      setFilteredSnipeSegments(
        [...filteredSnipeSegments].sort(
          (a, b) =>
            a.detailedSegmentEffort?.elapsedTime! -
            b.detailedSegmentEffort?.elapsedTime!
        )
      );
    }
    if (selectedSortOption === "longestTime") {
      setFilteredSnipeSegments(
        [...filteredSnipeSegments].sort(
          (a, b) =>
            b.detailedSegmentEffort?.elapsedTime! -
            a.detailedSegmentEffort?.elapsedTime!
        )
      );
    }
  }

  useEffect(() => {
    handleSortChange();
  }, [selectedSortOption]);

  async function handleFilterChange() {
    setFiltering(true);

    setFilteredSnipeSegments(() => {
      const newFilteredList = snipeSegmentsList.filter((s) => {
        let secondsFromKom = convertTime.timeStringToNumericValue(
          s.secondsFromKom!
        );
        let secondsFromQom = convertTime.timeStringToNumericValue(
          s.secondsFromQom!
        );

        const percentageFilter =
          (percentageFromLeader != null &&
            (useQom
              ? s.percentageFromQom! < percentageFromLeader
              : s.percentageFromKom! < percentageFromLeader)) ||
          percentageFromLeader === 0;

        const secondsFilter =
          secondsFromLeader != null &&
          (useQom
            ? secondsFromQom < secondsFromLeader
            : secondsFromKom < secondsFromLeader);

        const komFilter = useQom ? secondsFromQom !== 0 : secondsFromKom !== 0;
        return komFilter && (percentageFilter || secondsFilter);
      });

      handleSortChange();

      return newFilteredList;
    });
    setFiltering(false);
  }

  useEffect(() => {
    handleFilterChange();
  }, [percentageFromLeader, secondsFromLeader]);

  function handleResetSnipeOptions() {
    setSelectedSortOption("Sort by");
    setPercentageFromLeader(undefined);
    setSecondsFromLeader(undefined);
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
    setFilteredSnipeSegments(
      snipeSegmentsList.filter((s) => s.activityId === selectedActivityId)
    );
  }

  return (
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
              onChange={(value) => setPercentageFromLeader(value)}
              value={percentageFromLeader || undefined}
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
              onBlur={(e) => setPercentageFromLeader(Number(e.target.value))}
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
                defaultValue={secondsFromLeader || undefined}
                onBlur={(e) => setSecondsFromLeader(Number(e.target.value))}
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
                onChange={(e) => {
                  setSelectedSortOption(e.target.value);
                }}
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
          <h4>
            Segments:{" "}
            {
              filteredSnipeSegments.filter(
                (l) => l.activityId === selectedActivityId
              ).length
            }
          </h4>
        </Col>
      </Row>
      <Row>
        {snipeSegments.isLoading || filtering ? (
          <Col className="text-center">
            <span>Hang tight, we're working on it</span>
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
          <></>
        )}
      </Row>
      {snipeSegmentsList.filter((s) => s.activityId === selectedActivityId)
        .length === 0 &&
      !snipeSegments.isLoading &&
      !filtering ? (
        <Container fluid>
          <Row className="align-items-center justify-content-center pt-5">
            <Col className="text-center">
              <h4>No Segments to Snipe</h4>
            </Col>
          </Row>
        </Container>
      ) : (
        <Row>
          <Col>
            {filteredSnipeSegments.map((item) => (
              <SnipeSegmentCard
                key={uuidv4()}
                snipeSegment={item}
                useQom={useQom}
                showDetails={showDetailsSegmentId === item.segmentId}
                setShowDetails={setShowDetailsSegmentId}
              />
            ))}
          </Col>
        </Row>
      )}
    </>
  );
};

export default SnipeSegmentsCardList;
