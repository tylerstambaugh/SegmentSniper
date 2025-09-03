import { DateTime } from 'luxon';

export type User = {
  authUserId: string | null;
  stravaRefreshToken: string | null;
  refreshTokenExpiration: DateTime | null;
  stravaAthleteId: string | null;
};
