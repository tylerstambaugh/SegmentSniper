import { useState } from "react";
import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "./ActivityCard";
import { Col, Container, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";

const ActivityCardList = () => {
  const [activityList, resetActivityList] = useActivityListStore((state) => [
    state.activityList,
    state.resetActivityList,
  ]);

  const [selectedActivity, setSelectedActivity] = useState<string>("");

  const [selectedRow, setSelectedRow] = useState<string | null>(null);
  const resetSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.resetSegmentEffortsList
  );

  const clearSearchResults = () => {
    resetActivityList();
    resetSegmentEffortsList();
  };

  return activityList.length > 0 ? (
    <>
      <Row>
        <Col className="justify-content-center">
          <h3>Activity Search Results</h3>
        </Col>
      </Row>

      {activityList.map((item) => (
        <ActivityCard
          setSelectedActivity={setSelectedActivity}
          activity={item}
          key={uuidv4()}
        />
      ))}
    </>
  ) : (
    <Container>
      <Row>
        <Col>
          <h4>No activities to display</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default ActivityCardList;
