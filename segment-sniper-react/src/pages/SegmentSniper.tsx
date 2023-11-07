import { useState } from "react";
import ActivityListDataTable from "../components/SegmentSniper/Activities/ActivityListDataTable";
import ActivityListLookupForm from "../components/SegmentSniper/Activities/ActivityListLookupForm";
import Segments from "../components/SegmentSniper/Segments/Segments";
import useActivityListStore from "../stores/useActivityListStore";

function SegmentSniper() {
  const [selectedActivity, setSelectedActivity] = useState<string>("");

  return (
    <>
      <ActivityListLookupForm />
      <ActivityListDataTable setSelectedActivity={setSelectedActivity} />
      <Segments selectedActivity={selectedActivity} />
    </>
  );
}

export default SegmentSniper;
