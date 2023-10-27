import { useState } from "react";

export interface SegmentsProps {
  activityId: string | undefined;
}

const Segments = (props: SegmentsProps) => {
  const [showSnipeSegmentModal, setShowSnipeSegmentModal] = useState(false);
  const [showSegmentDetailModal, setShowSegmentDetailModal] = useState(false);
  const [isSnipeList, setIsSnipeList] = useState(false);
  const [snipeLoading, setSnipeLoading] = useState(false);
};
