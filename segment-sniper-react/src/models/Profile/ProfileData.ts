export interface ProfileData {
  email: string;
  userName: string;
  userId: string;
  firstName: string;
  hasStravaToken: boolean;
  stravaTokenExpiresAt?: Date;
}
