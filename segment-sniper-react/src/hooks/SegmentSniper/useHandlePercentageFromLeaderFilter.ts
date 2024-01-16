import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";

const useHandlePercentageFromLeaderChange = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.queriedSnipeSegmentsList,
      state.setQueriedSnipeSegmentsList,
    ]);

  async function Handle(
    percentageFromLeader: number,
    leaderTypeQom: boolean,
    segmentList: SnipeSegmentListItem[]
  ) {
    const newFilteredList = segmentList.filter((s) => {
      console.log("doing percentage from leader filter:", percentageFromLeader);
      const percentageFilter = leaderTypeQom
        ? s.percentageFromQom! <= percentageFromLeader
        : s.percentageFromKom! <= percentageFromLeader ||
          percentageFromLeader === 0 ||
          percentageFromLeader === undefined ||
          percentageFromLeader === null;

      return percentageFilter;
    });

    setQueriedSegmentsList(newFilteredList);
  }
  return { Handle };
};
export default useHandlePercentageFromLeaderChange;
