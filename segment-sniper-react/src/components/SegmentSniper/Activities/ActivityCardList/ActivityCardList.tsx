import { useState } from "react";
import useActivityListStore from "../../../../stores/useActivityListStore";
import ActivityCard from "./ActivityCard";
import { Button, Col, Container, Row } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import useSegmentEffortsListStore from "../../../../stores/useSegmentEffortsListStore";
import { AppRoutes } from "../../../../enums/AppRoutes";
import { useNavigate } from "react-router-dom";

interface ActivityCardListProps {
  handleShowSnipeSegmentsModal: () => void;
}

const ActivityCardList = (props: ActivityCardListProps) => {
  const [activityList, setSelectedActivity, resetActivityList] =
    useActivityListStore((state) => [
      state.activityList,
      state.setSelectedActivityId,
      state.resetActivityList,
    ]);

  return activityList.length > 0 ? (
    <>
      {activityList.map((item) => (
        <ActivityCard
          handleShowSnipeSegmentsModal={props.handleShowSnipeSegmentsModal}
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
