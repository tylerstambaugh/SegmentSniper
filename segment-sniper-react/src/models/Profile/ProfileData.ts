import { DateTime } from "luxon";

export interface ProfileData {
  email: string;
  userName: string;
  userId: string;
  firstName: string;
  hasStravaToken: boolean;
  stravaRefreshToken?: string | null;
  stravaTokenExpiresAt?: DateTime | null;
  lastLogin?: DateTime | null;
}
