import useSnipedSegmentsListStore from "../stores/useSnipedSegmentsListStore";

const SnipedSegments = () => {
  const snipedSegmentsList = useSnipedSegmentsListStore(
    (state) => state.snipedSegmentsList
  );

  return <></>;
};

export default SnipedSegments;
