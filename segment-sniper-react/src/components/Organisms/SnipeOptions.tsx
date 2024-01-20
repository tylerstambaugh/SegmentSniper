import { useEffect, useState } from "react";
import PercentageFromLeaderFilter from "../Molecules/Filters/PercentageFromLeaderFilter";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import useActivityListStore from "../../stores/useActivityListStore";
import SecondsFromLeaderFilter from "../Molecules/Filters/SecondsFromLeaderFilter";
import HeadingsFilter from "../Molecules/Filters/HeadingsFilter";
import LeaderTypeFilter from "../Molecules/Filters/LeaderTypeFilter";
import SortFilter from "../Molecules/Filters/SortFilter";

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
    let newFilterOptions: FilterOptions = {
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
    setSelectedSortOption("Sort by");
    setPercentageFromLeader(100);
    setSecondsFromLeader(undefined);
    setLeaderTypeQom(false);
    setHeadingsFilter([]);
  };

  return (
    <>
      <Container className="py-1 p-4">
        <Card>
          <Card.Title className="p-2 activity-card-heading">
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
          </Card.Title>
          <Card.Body>
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
      </Container>
    </>
  );
};

export default SnipeOptions;
