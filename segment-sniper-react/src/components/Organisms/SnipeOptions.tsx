import { useEffect, useState } from "react";
import PercentageFromLeaderFilter from "../Molecules/Filters/PercentageFromLeaderFilter";
import { Container, Row, Col, Button } from "react-bootstrap";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import useActivityListStore from "../../stores/useActivityListStore";
import SecondsFromLeaderFilter from "../Molecules/Filters/SecondsFromLeaderFilter";
import HeadingsFilter from "../Molecules/Filters/HeadingsFilter";
import LeaderTypeFilter from "../Molecules/Filters/LeaderTypeFilter";

export interface FilterOptions {
  percentageFromLeader?: number | null;
  secondsFromLeader?: number | null;
  useQom: boolean;
  headings: string[];
  sortBy: string | null;
}

export interface SnipeOptionsProps {
  onChange: (values: FilterOptions) => void;
}

const SnipeOptions = ({ onChange }: SnipeOptionsProps) => {
  const [leaderTypeQom, setLeaderTypeQom] = useState<boolean>(false);
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

  const [filterOptions, setFilterOptions] = useState<FilterOptions>();

  useEffect(() => {
    let newFilterOptions: FilterOptions = {
      percentageFromLeader: percentageFromLeader,
      secondsFromLeader: secondsFromLeader,
      headings: headingsFilter,
      sortBy: selectedSortOption,
      useQom: leaderTypeQom,
    };
    setFilterOptions(newFilterOptions);
    onChange(filterOptions!);
  }, [
    percentageFromLeader,
    secondsFromLeader,
    selectedSortOption,
    headingsFilter,
    leaderTypeQom,
  ]);

  const handleResetSnipeOptions = () => {
    console.log("running reset snipe options.");

    setSelectedSortOption("Sort by");
    setPercentageFromLeader(undefined);
    setSecondsFromLeader(undefined);
    setLeaderTypeQom(false);
    setHeadingsFilter([]);

    //setShowDetailsSegmentId("");

    // setQueriedSnipeSegmentsList(
    //   snipeSegmentList
    //     .filter((s) => s.activityId === selectedActivityId)
    //     .sort(
    //       (a, b) =>
    //         +new Date(a.detailedSegmentEffort?.startDate!) -
    //         +new Date(b.detailedSegmentEffort?.startDate!)
    //     )
    // );
  };

  return (
    <>
      <Container className="segment-list-options">
        <Row className="pb-2">
          <Col>
            <p className="mb-1 snipe-options-heading">Snipe Options</p>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" onClick={handleResetSnipeOptions}>
              Reset
            </Button>
          </Col>
        </Row>
        <Row>
          <LeaderTypeFilter
            leaderTypeQom={leaderTypeQom}
            onChange={setLeaderTypeQom}
          />
        </Row>
        <Row>
          <PercentageFromLeaderFilter
            useQom={leaderTypeQom}
            percentageFromLeader={percentageFromLeader}
            onChange={setPercentageFromLeader}
          />
        </Row>
        <Row>
          <SecondsFromLeaderFilter
            useQom={leaderTypeQom}
            secondsFromLeader={secondsFromLeader}
            onChange={setSecondsFromLeader}
          />
        </Row>
        <Row>
          <HeadingsFilter
            headings={headingsFilter}
            onChange={setHeadingsFilter}
          />
        </Row>
      </Container>
    </>
  );
};

export default SnipeOptions;
