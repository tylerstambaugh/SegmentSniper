import useSnipeSegmentsListStore from "../../stores/useSnipeSegmentsListStore";

const useHandleHeadingsFilter = () => {
  const [queriedSegmentsList, setQueriedSegmentsList] =
    useSnipeSegmentsListStore((state) => [
      state.queriedSnipeSegmentsList,
      state.setQueriedSnipeSegmentsList,
    ]);

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
