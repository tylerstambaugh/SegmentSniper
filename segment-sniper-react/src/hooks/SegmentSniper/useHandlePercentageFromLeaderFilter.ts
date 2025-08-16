import { SnipeSegmentListItem } from '../../models/Segment/SnipeSegmentListItem';

const useHandlePercentageFromLeaderChange = () => {
  async function Handle(
    percentageFromLeader: number,
    leaderTypeQom: boolean,
    segmentList: SnipeSegmentListItem[]
  ) {
    const newFilteredList = segmentList.filter((s) => {
      const percentageFilter = leaderTypeQom
        ? s.percentageFromQom! <= percentageFromLeader
        : s.percentageFromKom! <= percentageFromLeader;

      return percentageFilter;
    });

    return newFilteredList;
  }
  return { Handle };
};
export default useHandlePercentageFromLeaderChange;
