import { Map } from "../Map";
import { AthleteSegmentStats } from "./AthleteSegmentStats";
import { Xoms } from "./Xoms";

export interface SegmentDetails {
  segmentId: string;
  name: string;
  activityType: string;
  distance: number;
  averageGrade: number;
  maximumGrade: number;
  elevationHigh: number;
  elevationLow: number;
  startLatlng: [number, number];
  endLatlng: [number, number];
  elevationProfile: string;
  climbCategory: number;
  city: string;
  state: string;
  country: string;
  isPrivate: boolean;
  isHazardous: boolean;
  isStarred: boolean;
  createdAt: string;
  updatedAt: string;
  totalElevationGain: number;
  map: Map;
  effortCount: number;
  athleteCount: number;
  starCount: number;
  athleteSegmentStats: AthleteSegmentStats;
  xoms: Xoms;
}
