import { useState } from "react";
import SnipeSegmentsCardList from "../../components/Molecules/SnipeSegment/SnipeSegmentCardList";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandleSortChange = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] = useState<
    SnipeSegmentListItem[]
  >([]);

  async function Sort(
    selectedSortOption: string,
    listToSort: SnipeSegmentListItem[]
  ) {
    let returnList: SnipeSegmentListItem[] = [];
    if (selectedSortOption === "date") {
      returnList = [...listToSort].sort(
        (a, b) =>
          +new Date(a.detailedSegmentEffort?.startDate!) -
          +new Date(b.detailedSegmentEffort?.startDate!)
      );
    } else if (selectedSortOption === "shortestDistance") {
      returnList = [...listToSort].sort((a, b) => a.distance! - b.distance!);
    } else if (selectedSortOption === "longestDistance") {
      returnList = [...listToSort].sort((a, b) => b.distance! - a.distance!);
    } else if (selectedSortOption === "shortestTime") {
      returnList = [...listToSort].sort(
        (a, b) =>
          a.detailedSegmentEffort?.elapsedTime! -
          b.detailedSegmentEffort?.elapsedTime!
      );
    } else if (selectedSortOption === "longestTime") {
      returnList = [...listToSort].sort(
        (a, b) =>
          b.detailedSegmentEffort?.elapsedTime! -
          a.detailedSegmentEffort?.elapsedTime!
      );
    } else {
      returnList = listToSort;
    }
    return returnList;
  }

  return { Sort };
};
export default useHandleSortChange;
