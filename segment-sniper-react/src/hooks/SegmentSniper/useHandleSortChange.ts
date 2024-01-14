import { useState } from "react";
import SnipeSegmentsCardList from "../../components/Molecules/SnipeSegment/SnipeSegmentCardList";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandleSortChange = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] = useState<
    SnipeSegmentListItem[]
  >([]);

  function Sort(selectedSortOption: string) {
    console.log("doing sorting by:", selectedSortOption);

    if (selectedSortOption === "date") {
      setQueriedSegmentsList(
        [...queriedSegmentsList].sort(
          (a, b) =>
            +new Date(a.detailedSegmentEffort?.startDate!) -
            +new Date(b.detailedSegmentEffort?.startDate!)
        )
      );
    }

    if (selectedSortOption === "shortestDistance") {
      setQueriedSegmentsList(
        [...queriedSegmentsList].sort((a, b) => a.distance! - b.distance!)
      );
    }
    if (selectedSortOption === "longestDistance") {
      setQueriedSegmentsList(
        [...queriedSegmentsList].sort((a, b) => b.distance! - a.distance!)
      );
    }
    if (selectedSortOption === "shortestTime") {
      setQueriedSegmentsList(
        [...queriedSegmentsList].sort(
          (a, b) =>
            a.detailedSegmentEffort?.elapsedTime! -
            b.detailedSegmentEffort?.elapsedTime!
        )
      );
    }
    if (selectedSortOption === "longestTime") {
      setQueriedSegmentsList(
        [...queriedSegmentsList].sort(
          (a, b) =>
            b.detailedSegmentEffort?.elapsedTime! -
            a.detailedSegmentEffort?.elapsedTime!
        )
      );
    }
  }

  return { Sort };
};
export default useHandleSortChange;
