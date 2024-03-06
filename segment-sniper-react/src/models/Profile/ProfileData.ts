export interface ProfileData {
  email: string;
  userName: string;
  firstName: string;
  hasStravaToken: boolean;
  stravaTokenExpiresAt?: Date;
}
