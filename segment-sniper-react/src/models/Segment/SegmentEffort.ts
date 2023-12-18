import { Achievement } from "./Achievement";
import { SummarySegment } from "./SummarySegment";

export interface SegmentEffort {
  segmentEffortId: string;
  name: string;
  activityId: string;
  elapsedTime: number;
  movingTime: number;
  startDate: string;
  startDateLocal: string;
  distance: number;
  startIndex: number;
  endIndex: number;
  deviceWatts: boolean;
  averageWatts: number;
  averageHeartRate: number;
  maxHeartRate: number;
  summarySegment: SummarySegment;
  prRank: number | null;
  achievements: Achievement[];
  komRank: number | null;
  hidden: boolean;
}
