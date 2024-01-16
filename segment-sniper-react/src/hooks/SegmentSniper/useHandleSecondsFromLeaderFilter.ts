import { useConvertTimeStringToNumericValue } from "../useConvertTimeStringToNumericValue";
import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandleSecondsFromLeaderChange = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.queriedSnipeSegmentsList,
      state.setQueriedSnipeSegmentsList,
    ]);

  const convertTimeStringToNumeric = useConvertTimeStringToNumericValue();

  async function Handle(
    secondsFromLeader: number,
    leaderTypeQom: boolean,
    segmentList: SnipeSegmentListItem[]
  ) {
    console.log("doing percentage from leader filter:");

    const newFilteredList = segmentList.filter((s) => {
      let secondsFromQom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.secondsFromQom!
      );
      let secondsFromKom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.secondsFromKom!
      );

      const secondsFilter =
        (leaderTypeQom
          ? secondsFromQom! <= secondsFromLeader
          : secondsFromKom <= secondsFromLeader) ||
        secondsFromLeader === undefined ||
        secondsFromLeader === null ||
        secondsFromLeader === 0;

      return secondsFilter;
    });
    setQueriedSegmentsList(newFilteredList);
  }

  return { Handle };
};
export default useHandleSecondsFromLeaderChange;
