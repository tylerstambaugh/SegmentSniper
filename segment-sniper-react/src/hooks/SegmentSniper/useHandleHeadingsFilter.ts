import { SnipeSegmentListItem } from '../../models/Segment/SnipeSegmentListItem';

const useHandleHeadingsFilter = () => {
  async function Handle(
    headings: string[],
    segmentList: SnipeSegmentListItem[]
  ) {
    if (headings.length > 0) {
      const newFilteredList = segmentList.filter((s) => {
        const headingFilter =
          headings && headings.length > 0 && headings.includes(s.heading!);

        return headingFilter;
      });

      return newFilteredList;
    } else {
      return segmentList;
    }
  }
  return { Handle };
};
export default useHandleHeadingsFilter;
