import { useState } from "react";
import PercentageFromLeaderFilter from "../Molecules/PercentageFromLeaderFilter";
import { Container, Row, Col, Button } from "react-bootstrap";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import useActivityListStore from "../../stores/useActivityListStore";

export interface SnipeOptionsProps {}

const SnipeOptions = (props: SnipeOptionsProps) => {
  const [useQom, setUseQom] = useState<boolean>(false);
  const [percentageFromLeader, setPercentageFromLeader] = useState<
    number | undefined
  >();
  const [secondsFromLeader, setSecondsFromLeader] = useState<
    number | undefined
  >();
  const [headingsFilter, setHeadingsFilter] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("Sort By");
  const selectedActivityId = useActivityListStore(
    (state) => state.selectedActivityId
  );

  const [
    snipeSegmentList,
    queriedSnipeSegmentsList,
    setQueriedSnipeSegmentsList,
  ] = useSnipeSegmentsListStore((state) => [
    state.snipeSegmentsList,
    state.queriedSnipeSegmentsList,
    state.setQueriedSnipeSegmentsList,
  ]);

  const handleResetSnipeOptions = () => {
    console.log("running reset snipe options.");

    setSelectedSortOption("Sort by");
    setPercentageFromLeader(undefined);
    setSecondsFromLeader(undefined);
    setUseQom(false);
    setHeadingsFilter([]);
    //setShowDetailsSegmentId("");

    setQueriedSnipeSegmentsList(
      snipeSegmentList
        .filter((s) => s.activityId === selectedActivityId)
        .sort(
          (a, b) =>
            +new Date(a.detailedSegmentEffort?.startDate!) -
            +new Date(b.detailedSegmentEffort?.startDate!)
        )
    );
  };

  function handlePercentageFromLeaderFilterChange(
    percentageFromLeader: number
  ) {
    setPercentageFromLeader(percentageFromLeader);
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
          <PercentageFromLeaderFilter
            useQom={useQom}
            percentageFromLeader={percentageFromLeader}
            handlePercentageFromLeaderFilterChange={
              handlePercentageFromLeaderFilterChange
            }
          />
        </Row>
      </Container>
    </>
  );
};

export default SnipeOptions;
