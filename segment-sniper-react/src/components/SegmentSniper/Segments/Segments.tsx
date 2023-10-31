import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SnipeSegmentsModal from "./SnipeSegmentsModal";
import SegmentDetailsModal from "./SegmentDetailsModal";
import { SegmentListDataTable } from "./SegmentListDataTable";
import { SnipedSegmentListDataTable } from "./SnipedSegmentListDataTable";
import { SegmentListItem } from "../../../models/Segment/SegmentListItem";
import { SnipedSegmentListItem } from "../../../models/Segment/SnipedSegmentListItem";
import useActivityListStore from "../../../stores/useActivityListStore";

export interface SegmentsProps {
  selectedActivity?: string;
}

const Segments = (props: SegmentsProps) => {
  const [showSnipeSegmentModal, setShowSnipeSegmentModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [isSnipeList, setIsSnipeList] = useState(false);
  const [snipeLoading, setSnipeLoading] = useState(false);
  const activityList = useActivityListStore((state) => state.activityList);
  const [selectedActivitySegmentEfforts, setSelectedActivitySegmentEfforts] =
    useState<SegmentListItem[]>([]);

  const [segmentDetailsModalData, setSegmentDetailsModalData] =
    useState<string>();

  const handleCloseSnipeSegmentModal = () => setShowSnipeSegmentModal(false);
  const handleShowSnipeSegmentModal = () => setShowSnipeSegmentModal(true);

  const handleCloseSegmentDetailModal = () => setShowSegmentDetailModal(false);
  const handleShowSegmentDetailModal = () => setShowSegmentDetailModal(true);

  async function handleStarSegment() {
    //add hook call here. Update to take contract w/ segmentId and star=true/false
  }

  async function handleSnipeSegments() {
    //add hook call here. Update to take correct contract
  }

  function handleShowSegmentDetails(segmentId: string) {}

  useEffect(() => {
    setSelectedActivitySegmentEfforts(
      activityList.find((x) => x.activityId === props.selectedActivity)
        ?.segments || []
    );
    console.log("selected activity:", props.selectedActivity);
    console.log("selected activity segments:", selectedActivitySegmentEfforts);
  }, [props.selectedActivity]);

  return (
    <>
      <Container className="mb-4">
        <SnipeSegmentsModal
          show={showSnipeSegmentModal}
          handleClose={handleCloseSnipeSegmentModal}
          handleSnipeSegments={handleSnipeSegments}
        />
        <SegmentDetailsModal
          show={showSegmentDetailModal}
          handleClose={handleCloseSegmentDetailModal}
          segmentId={segmentDetailsModalData}
        />
        {!isSnipeList ? (
          <SegmentListDataTable segments={selectedActivitySegmentEfforts} />
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
