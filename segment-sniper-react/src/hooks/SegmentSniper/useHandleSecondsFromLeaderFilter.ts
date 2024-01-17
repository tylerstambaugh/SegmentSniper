import { useConvertTimeStringToNumericValue } from "../useConvertTimeStringToNumericValue";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandleSecondsFromLeaderChange = () => {
  const convertTimeStringToNumeric = useConvertTimeStringToNumericValue();

  async function Handle(
    secondsFromLeader: number,
    leaderTypeQom: boolean,
    segmentList: SnipeSegmentListItem[]
  ) {
    const newFilteredList = segmentList.filter((s) => {
      let secondsFromQom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.secondsFromQom!
      );
      let secondsFromKom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.secondsFromKom!
      );

      const secondsFilter = leaderTypeQom
        ? secondsFromQom! <= secondsFromLeader
        : secondsFromKom <= secondsFromLeader;

      return secondsFilter;
    });
    return newFilteredList;
  }

  return { Handle };
};
export default useHandleSecondsFromLeaderChange;
