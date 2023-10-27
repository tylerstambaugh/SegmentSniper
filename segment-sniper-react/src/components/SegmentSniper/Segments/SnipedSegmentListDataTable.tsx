import { SnipedSegmentListItem } from "../../../models/Segment/SnipedSegmentListItem";
import useSnipedSegmentListStore from "../../../stores/useSnipedSegmentListStore";

export const SegmentListDataTable = () => {
  const [snipedSegmentList, resetnipedSegmetnList] = useSnipedSegmentListStore(
    (state) => [state.snipedSegmentList, state.resetSnipedSegmentList]
  );

  type TableDataRow = SnipedSegmentListItem & {
    starButton: any;
  };

  const tableBody: TableDataRow[] = snipedSegmentList.map((item) => ({
    ...item,
    starButton: null,
  }));
};
