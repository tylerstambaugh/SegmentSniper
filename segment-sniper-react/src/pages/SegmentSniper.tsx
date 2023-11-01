import { useEffect, useState } from "react";
import ActivityListDataTable from "../components/SegmentSniper/Activities/ActivityListDataTable";
import ActivityListLookupForm from "../components/SegmentSniper/Activities/ActivityListLookupForm";
import Segments from "../components/SegmentSniper/Segments/Segments";
import useActivityListStore from "../stores/useActivityListStore";
import { SegmentListItem } from "../models/Segment/SegmentListItem";

function SegmentSniper() {
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  const activityList = useActivityListStore((state) => state.activityList);

  return (
    <>
      <ActivityListLookupForm />
      <ActivityListDataTable setSelectedActivity={setSelectedActivity} />
      <Segments selectedActivity={selectedActivity} />
    </>
  );
}

export default SegmentSniper;
