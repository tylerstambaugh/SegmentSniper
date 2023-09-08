export type Token = {
  accessToken: string | null;
  refreshToken: string | null;
  expiration: Date | null;
};

export const initialTokenState: Token = {
  accessToken: null,
  refreshToken: null,
  expiration: null,
};
