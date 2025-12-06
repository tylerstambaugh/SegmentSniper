import { useAuth, useUser } from '@clerk/react-router';

import { createContext, useMemo, useRef } from 'react';

export interface AuthContextValue {
  roles: string[];
  isSignedIn?: boolean;
  userId: string | null;
  isLoaded: boolean;
  userHas: (isAuthorizedParams: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  roles: [],
  userId: null,
  isLoaded: false,
  isSignedIn: false,
  userHas: () => false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const { has } = useAuth();

  // Keep stable refs to avoid re-renders when Clerk silently refreshes tokens
  const lastUserId = useRef<string | null>(null);
  const lastRoles = useRef<string[]>([]);

  // Only recompute when user changes
  const computedRoles = useMemo(() => {
    if (!isLoaded || !user) return undefined;

    const rawRoles = user.publicMetadata?.roles;
    const roles = Array.isArray(rawRoles)
      ? (rawRoles as string[])
      : rawRoles
        ? [rawRoles as string]
        : [];

    // Only update if roles actually changed
    if (JSON.stringify(roles) !== JSON.stringify(lastRoles.current)) {
      lastRoles.current = roles;
      return roles;
    }

    return undefined;
  }, [isLoaded, user?.publicMetadata?.roles]);

  // Update the stable ref only when roles actually change
  if (computedRoles !== undefined) {
    lastRoles.current = computedRoles;
  }

  const userHas = (isAuthorizedParams: string) => {
    return has?.({ feature: isAuthorizedParams }) ?? false;
  };

  // Create stable context value that only updates when something truly changes
  const contextValue = useMemo(
    () => ({
      roles: lastRoles.current,
      userId: user?.id ?? lastUserId.current,
      isSignedIn,
      isLoaded,
      userHas,
    }),
    [user?.id, isLoaded, lastRoles.current.join(',')],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
