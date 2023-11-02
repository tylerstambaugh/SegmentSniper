import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SnipeSegmentsModal from "./SnipeSegmentsModal";
import SegmentDetailsModal from "./SegmentDetailsModal";
import { SegmentListDataTable } from "./SegmentListDataTable";
import { SnipedSegmentListDataTable } from "./SnipedSegmentListDataTable";
import { SegmentListItem } from "../../../models/Segment/SegmentListItem";
import { SnipedSegmentListItem } from "../../../models/Segment/SnipedSegmentListItem";
import useActivityListStore from "../../../stores/useActivityListStore";
import useSegmentsListStore from "../../../stores/useSegmentsListStore";
import { SnipeSegmentsRequest } from "../../../services/Api/Segment/postSnipeSegmentsList";
import useSnipedSegmentsListStore from "../../../stores/useSnipedSegmentsListStore";
import { useSnipeSegments } from "../../../hooks/Api/Activity/useSnipeSegments";
import toast from "react-hot-toast";

export interface SegmentsProps {
  selectedActivity: string;
}

const Segments = (props: SegmentsProps) => {
  const [showSnipeSegmentsModal, setShowSnipeSegmentsModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [isSnipeList, setIsSnipeList] = useState(false);
  const [snipeLoading, setSnipeLoading] = useState(false);
  const activityList = useActivityListStore((state) => state.activityList);
  const [segmentList, setSegmentList] = useSegmentsListStore((state) => [
    state.segmentsList,
    state.setSegmentList,
  ]);

  const [snipedSegmentsList, setSnipedSegmentsList] =
    useSnipedSegmentsListStore((state) => [
      state.snipedSegmentsList,
      state.setSnipedSegmentsList,
    ]);

  const snipeSegments = useSnipeSegments();

  const [segmentDetailsModalData, setSegmentDetailsModalData] =
    useState<string>();

  const handleCloseSnipeSegmentsModal = () => setShowSnipeSegmentsModal(false);
  const handleShowSnipeSegmentsModal = () => setShowSnipeSegmentsModal(true);

  const handleCloseSegmentDetailModal = () => setShowSegmentDetailModal(false);
  const handleShowSegmentDetailModal = () => setShowSegmentDetailModal(true);

  async function handleStarSegment() {
    //add hook call here. Update to take contract w/ segmentId and star=true/false
  }

  async function handleSnipeSegments(request: SnipeSegmentsRequest) {
    request.activityId = props.selectedActivity;
    snipeSegments.mutateAsync(request);
  }

  useEffect(() => {
    if (snipeSegments.error !== null)
      toast.error(`Snipe segments error: ${snipeSegments.error}`);
  }, [snipeSegments.error]);

  function handleShowSegmentDetails(segmentId: string) {}

  useEffect(() => {
    let segmentEfforts: SegmentListItem[] =
      activityList.find((x) => x.activityId === props.selectedActivity)
        ?.segments || [];
    setSegmentList(segmentEfforts);

    console.log("selected activity:", props.selectedActivity);
    console.log("selected activity segments:", segmentList);
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
          segmentId={segmentDetailsModalData}
        />
        {!isSnipeList ? (
          <SegmentListDataTable
            selectedActivityId={props.selectedActivity}
            snipeLoading={snipeSegments.isLoading}
            handleShowSnipeSegmentsModal={handleShowSnipeSegmentsModal}
          />
        ) : (
          <SnipedSegmentListDataTable
            clearSnipedSegments={function (): void {
              throw new Error("Function not implemented.");
            }}
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
