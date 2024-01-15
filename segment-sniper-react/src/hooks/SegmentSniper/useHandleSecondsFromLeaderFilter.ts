import { useState } from "react";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";
import { useConvertTimeStringToNumericValue } from "../useConvertTimeStringToNumericValue";

const useHandleSecondsFromLeaderChange = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] = useState<
    SnipeSegmentListItem[]
  >([]);

  const convertTimeStringToNumeric = useConvertTimeStringToNumericValue();

  async function Handle(secondsFromLeader: number, leaderTypeQom: boolean) {
    console.log("doing percentage from leader filter:");

    const newFilteredList = [...queriedSegmentsList].filter((s) => {
      let secondsFromQom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.secondsFromQom!
      );
      let secondsFromKom = convertTimeStringToNumeric.timeStringToNumericValue(
        s.secondsFromKom!
      );

      const secondsFilter =
        (secondsFromLeader != null &&
          secondsFromLeader != undefined &&
          (leaderTypeQom
            ? secondsFromQom! <= secondsFromLeader
            : secondsFromKom <= secondsFromLeader)) ||
        secondsFromLeader === undefined;

      return secondsFilter;
    });
    setQueriedSegmentsList(newFilteredList);
  }

  return { Handle };
};
export default useHandleSecondsFromLeaderChange;
