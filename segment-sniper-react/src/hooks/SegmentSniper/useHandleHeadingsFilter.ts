import { useState } from "react";
import SnipeSegmentsCardList from "../../components/Molecules/SnipeSegment/SnipeSegmentCardList";
import { SnipeSegmentListItem } from "../../models/Segment/SnipeSegmentListItem";

const useHandleHeadingsFilter = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] = useState<
    SnipeSegmentListItem[]
  >([]);

  async function Handle(headings: string[]) {
    console.log("doing percentage from leader filter:");

    const newFilteredList = [...queriedSegmentsList].filter((s) => {
      const headingFilter =
        headings && headings.length > 0 && headings.includes(s.heading!);

      return headingFilter;
    });

    setQueriedSegmentsList(newFilteredList);
  }
  return { Handle };
};
export default useHandleHeadingsFilter;
