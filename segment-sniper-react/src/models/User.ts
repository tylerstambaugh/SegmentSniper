import { DateTime } from 'luxon';

export type User = {
  id: string;
  authUSerId: string;
  refreshToken: string | null;
  refreshTokenExpiration: DateTime;
  stravaAthleteId: string | null;
};
