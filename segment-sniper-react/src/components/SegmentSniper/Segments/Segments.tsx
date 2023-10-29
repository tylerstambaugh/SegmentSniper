import { useState } from "react";
import { Container } from "react-bootstrap";
import SnipeSegmentsModal from "./SnipeSegmentsModal";
import SegmentDetailsModal from "./SegmentDetailsModal";
import { SegmentListDataTable } from "./SegmentListDataTable";
import { SnipedSegmentListDataTable } from "./SnipedSegmentListDataTable";
import { SegmentListItem } from "../../../models/Segment/SegmentListItem";
import { SnipedSegmentListItem } from "../../../models/Segment/SnipedSegmentListItem";

export interface SegmentsProps {
  segments: SegmentListItem[];
}

const Segments = (props: SegmentsProps) => {
  const [showSnipeSegmentModal, setShowSnipeSegmentModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [isSnipeList, setIsSnipeList] = useState(false);
  const [snipeLoading, setSnipeLoading] = useState(false);

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
          <SegmentListDataTable segments={props.segments} />
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
