import { AthleteSegmentStatsUiModel } from "./AthleteSegmentStats";
import { Xoms } from "./Xoms";

export interface SnipedSegmentListItem {
  segmentId?: string;
  name?: string;
  komTime?: string;
  distance?: number;
  secondsFromLeader?: number;
  percentageFromLeader?: number;
  athleteStats?: AthleteSegmentStatsUiModel;
  xoms?: Xoms;
  starred?: boolean;
  useQom?: boolean;
}
