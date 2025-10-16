import { useUser } from "@clerk/react-router";
import { createContext, useMemo, useRef } from "react";

export interface AuthContextValue {
  roles: string[];
  userId: string | null;
  isLoaded: boolean;
}

export const AuthContext = createContext<AuthContextValue>({
  roles: [],
  userId: null,
  isLoaded: false,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();

  // Keep stable refs to avoid re-renders when Clerk silently refreshes tokens
  const lastUserId = useRef<string | null>(null);
  const lastRoles = useRef<string[]>([]);

  // Only recompute when user changes
  const computedRoles = useMemo(() => {
    if (!isLoaded || !user) return undefined;
    if (user.id === lastUserId.current) return undefined;

    const rawRoles = user.publicMetadata?.roles;
    const roles = Array.isArray(rawRoles)
      ? (rawRoles as string[])
      : rawRoles
      ? [rawRoles as string]
      : [];

    lastUserId.current = user.id;
    lastRoles.current = roles;
    return roles;
  }, [user?.id, user?.publicMetadata?.roles, isLoaded]);

  // Update the stable ref only when roles actually change
  if (computedRoles !== undefined) {
    lastRoles.current = computedRoles;
  }

  // Create stable context value that only updates when something truly changes
  const contextValue = useMemo(
    () => ({
      roles: lastRoles.current,
      userId: user?.id ?? lastUserId.current,
      isLoaded,
    }),
    [user?.id, isLoaded, lastRoles.current.join(",")]
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
