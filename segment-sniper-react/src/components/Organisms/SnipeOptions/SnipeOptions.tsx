import { useEffect, useState } from "react";
import PercentageFromLeaderFilter from "../../Molecules/SnipeOptionsFilters/PercentageFromLeader/PercentageFromLeaderFilter";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import useSnipeSegmentsListStore from "../../../stores/useSnipeSegmentsListStore";
import useActivityListStore from "../../../stores/useActivityListStore";
import SecondsFromLeaderFilter from "../../Molecules/SnipeOptionsFilters/SecondsFromLeader/SecondsFromLeaderFilter";
import HeadingsFilter from "../../Molecules/SnipeOptionsFilters/Heading/HeadingsFilter";
import LeaderTypeFilter from "../../Molecules/SnipeOptionsFilters/LeaderType/LeaderTypeFilter";
import SortFilter from "../../Molecules/SnipeOptionsFilters/Sort/SortFilter";
import styles from "./SnipeOptions.module.scss";

export interface FilterOptions {
  percentageFromLeader?: number | null;
  secondsFromLeader?: number | null;
  leaderTypeQom: boolean;
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
  >(100);
  const [secondsFromLeader, setSecondsFromLeader] = useState<
    number | undefined
  >();
  const [headingsFilter, setHeadingsFilter] = useState<string[]>([]);
  const [selectedSortOption, setSelectedSortOption] =
    useState<string>("Sort By");

  useEffect(() => {
    const newFilterOptions: FilterOptions = {
      percentageFromLeader: percentageFromLeader,
      secondsFromLeader: secondsFromLeader,
      headings: headingsFilter,
      sortBy: selectedSortOption,
      leaderTypeQom: leaderTypeQom,
    };
    onChange(newFilterOptions);
  }, [
    percentageFromLeader,
    secondsFromLeader,
    selectedSortOption,
    headingsFilter,
    leaderTypeQom,
  ]);

  const handleResetSnipeOptions = () => {
    setSelectedSortOption("Date");
    setPercentageFromLeader(100);
    setSecondsFromLeader(undefined);
    setLeaderTypeQom(false);
    setHeadingsFilter([]);
  };

  return (
    <>
      <Card className="ms-2 ps-1 mt-3 vh-85">
        <Card.Title className="px-2 mb-0 activity-card-heading">
          <Row className="pb-2">
            <Col>
              <p className={`mb-2 ${styles.snipeOptionsHeading}`}>
                Snipe Options
              </p>
            </Col>
            <Col className="text-end pt-2">
              <Button variant="secondary" onClick={handleResetSnipeOptions}>
                Reset
              </Button>
            </Col>
          </Row>
        </Card.Title>
        <Card.Body className="py-1">
          <Col>
            <Row className="mr-1 pb-0">
              <LeaderTypeFilter
                leaderTypeQom={leaderTypeQom}
                onChange={setLeaderTypeQom}
              />
            </Row>
            <Row>
              <PercentageFromLeaderFilter
                leaderTypeQom={leaderTypeQom}
                percentageFromLeader={percentageFromLeader}
                onChange={setPercentageFromLeader}
              />
            </Row>
            <Row>
              <SecondsFromLeaderFilter
                leaderTypeQom={leaderTypeQom}
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
            <Row>
              <SortFilter
                sortBy={selectedSortOption}
                onChange={setSelectedSortOption}
              />
            </Row>
          </Col>
        </Card.Body>
      </Card>
    </>
  );
};

export default SnipeOptions;
