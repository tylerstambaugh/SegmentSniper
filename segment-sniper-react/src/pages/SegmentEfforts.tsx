import { useEffect, useState } from "react";
import { useSnipeSegments } from "../hooks/Api/Activity/useSnipeSegments";
import useActivityListStore from "../stores/useActivityListStore";
import useSegmentEffortsListStore from "../stores/useSegmentEffortsListStore";
import useSnipedSegmentsListStore from "../stores/useSnipedSegmentsListStore";
import { SnipeSegmentsRequest } from "../services/Api/Segment/postSnipeSegmentsList";
import toast from "react-hot-toast";
import { SegmentEffortListItem } from "../models/Segment/SegmentEffortListItem";
import { Container } from "react-bootstrap";
import SegmentDetailsModal from "../components/SegmentSniper/Segments/SegmentDetailsModal";
import SnipeSegmentsModal from "../components/SegmentSniper/Segments/SnipeSegmentsModal";
import SegmentEffortCardList from "../components/SegmentSniper/Segments/SegmentEffortCardList/SegmentEffortCardList";
import { SegmentDetails } from "../models/Segment/SegmentDetails";

const SegmentEfforts = () => {
  const [showSnipeSegmentsModal, setShowSnipeSegmentsModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [isSnipeList, setIsSnipeList] = useState(false);
  const [activityList, selectedActivityId] = useActivityListStore((state) => [
    state.activityList,
    state.selectActivityId,
  ]);
  const setSegmentEffortsList = useSegmentEffortsListStore(
    (state) => state.setSegmentEffortsList
  );

  const resetSnipedSegments = useSnipedSegmentsListStore(
    (state) => state.resetSnipedSegmentsList
  );
  const snipeSegments = useSnipeSegments();

  const [segmentDetailsModalData, setSegmentDetailsModalData] =
    useState<SegmentDetails>();

  const handleCloseSnipeSegmentsModal = () => setShowSnipeSegmentsModal(false);
  const handleShowSnipeSegmentsModal = () => setShowSnipeSegmentsModal(true);
  const handleCloseSegmentDetailModal = () => setShowSegmentDetailModal(false);

  const clearSnipedSegments = () => resetSnipedSegments();

  async function handleStarSegment() {
    //add hook call here. Update to take contract w/ segmentId and star=true/false
  }

  async function handleSnipeSegments(request: SnipeSegmentsRequest) {
    request.activityId = selectedActivityId!;
    await snipeSegments.mutateAsync(request);
    setIsSnipeList(true);
  }

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

  function handleShowSegmentDetails(segmentId: string) {
    setShowSegmentDetailModal(true);
  }

  useEffect(() => {
    let segmentEfforts: SegmentEffortListItem[] =
      activityList.find((x) => x.activityId === selectedActivityId)
        ?.segmentsEffortsListItem || [];
    setSegmentEffortsList(segmentEfforts);
  }, [selectedActivityId]);

  return (
    <>
      <Container className="mb-4">
        <SnipeSegmentsModal
          show={showSnipeSegmentsModal}
          handleClose={handleCloseSnipeSegmentsModal}
          handleSnipeSegments={handleSnipeSegments}
        />
        <SegmentDetailsModal
          show={showSegmentDetailModal}
          handleClose={handleCloseSegmentDetailModal}
          segment={segmentDetailsModalData}
        />
        {isSnipeList ? (
          <SegmentEffortCardList activityId={selectedActivityId!} />
        ) : (
          <></>
        )}
      </Container>
    </>
  );
};

export default SegmentEfforts;
