import { useState } from "react";
import SnipeSegmentsCardList from "../../components/Molecules/SnipeSegment/SnipeSegmentCardList";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandlePercentageFromLeaderChange = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] = useState<
    SnipeSegmentListItem[]
  >([]);

  async function Handle(percentageFromLeader: number, leaderTypeQom: boolean) {
    console.log("doing percentage from leader filter:");

    const newFilteredList = [...queriedSegmentsList].filter((s) => {
      const percentageFilter =
        (leaderTypeQom
          ? s.percentageFromQom! <= percentageFromLeader
          : s.percentageFromKom! <= percentageFromLeader) ||
        percentageFromLeader === 0 ||
        percentageFromLeader === undefined;

      return percentageFilter;
    });

    setQueriedSegmentsList(newFilteredList);
  }
  return { Handle };
};
export default useHandlePercentageFromLeaderChange;
