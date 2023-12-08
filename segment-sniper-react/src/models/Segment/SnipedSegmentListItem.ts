import { AthleteSegmentStatsUiModel } from "./AthleteSegmentStats";
import { SummarySegment } from "./SummarySegment";
import { Xoms } from "./Xoms";

export interface SnipedSegmentListItem {
  segmentId?: string;
  name?: string;
  komTime?: string;
  distance?: number;
  secondsFromLeader?: number;
  summarySegment?: SummarySegment;
  percentageFromLeader?: number;
  athleteStats?: AthleteSegmentStatsUiModel;
  xoms?: Xoms;
  starred?: boolean;
  useQom?: boolean;
}
