export type Token = {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: Date | null;
};

export const initialTokenState: Token = {
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
};
