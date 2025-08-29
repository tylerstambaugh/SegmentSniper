import { DateTime } from 'luxon';

export type User = {
  id: string | null;
  authUSerId: string | null;
  refreshToken: string | null;
  refreshTokenExpiration: DateTime | null;
  stravaAthleteId: string | null;
};
