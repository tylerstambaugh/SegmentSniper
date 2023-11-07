import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SnipeSegmentsModal from "./SnipeSegmentsModal";
import SegmentDetailsModal from "./SegmentDetailsModal";
import { SegmentListDataTable } from "./SegmentListDataTable";
import { SnipedSegmentListDataTable } from "./SnipedSegmentListDataTable";
import { SegmentListItem } from "../../../models/Segment/SegmentListItem";

import useActivityListStore from "../../../stores/useActivityListStore";
import useSegmentsListStore from "../../../stores/useSegmentsListStore";
import { SnipeSegmentsRequest } from "../../../services/Api/Segment/postSnipeSegmentsList";
import useSnipedSegmentsListStore from "../../../stores/useSnipedSegmentsListStore";
import { useSnipeSegments } from "../../../hooks/Api/Activity/useSnipeSegments";
import toast from "react-hot-toast";
import { SegmentDetails } from "../../../models/Segment/SegmentDetails";

export interface SegmentsProps {
  selectedActivity: string;
}

const Segments = (props: SegmentsProps) => {
  const [showSnipeSegmentsModal, setShowSnipeSegmentsModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [isSnipeList, setIsSnipeList] = useState(false);
  const activityList = useActivityListStore((state) => state.activityList);
  const setSegmentList = useSegmentsListStore((state) => state.setSegmentList);

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
    request.activityId = props.selectedActivity;
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
    let segmentEfforts: SegmentListItem[] =
      activityList.find((x) => x.activityId === props.selectedActivity)
        ?.segments || [];
    setSegmentList(segmentEfforts);
  }, [props.selectedActivity]);

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
        {!isSnipeList ? (
          <SegmentListDataTable
            selectedActivityId={props.selectedActivity}
            snipeLoading={snipeSegments.isLoading}
            handleShowSnipeSegmentsModal={handleShowSnipeSegmentsModal}
            handleShowSegmentDetails={handleShowSegmentDetails}
          />
        ) : (
          <SnipedSegmentListDataTable
            clearSnipedSegments={clearSnipedSegments}
            handleShowSegmentDetails={handleShowSegmentDetails}
            handleStarSnipedSegment={function (props: any): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      </Container>
    </>
  );
};

export default Segments;
