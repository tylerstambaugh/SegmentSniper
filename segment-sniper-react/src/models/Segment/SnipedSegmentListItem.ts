import { AthleteSegmentStats } from "./AthleteSegmentStats";
import { Xoms } from "./Xoms";

export interface SnipedSegmentListItem {
  segmentId?: string;
  name?: string;
  komTime?: string;
  distance?: number;
  secondsFromLeader?: number;
  percentageFromLeader?: number;
  athleteStats?: AthleteSegmentStats;
  xoms?: Xoms;
  starred?: boolean;
  useQom?: boolean;
}
