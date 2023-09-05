export type User = {
  id: string | null;
  firstName: string | null;
  emailAddress: string | null;
};

export const initialUserState: User = {
  id: null,
  firstName: null,
  emailAddress: null,
};
