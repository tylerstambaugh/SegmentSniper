import { useTimeFormatConverter } from "../useTimeFormatConverter";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandleSecondsFromLeaderChange = () => {
  const convertTimeStringToNumeric = useTimeFormatConverter();

  async function Handle(
    secondsFromLeader: number,
    leaderTypeQom: boolean,
    segmentList: SnipeSegmentListItem[]
  ) {
    const newFilteredList = segmentList.filter((s) => {
      const secondsFromQom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.timeFromQom!
      );
      const secondsFromKom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.timeFromKom!
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
