import { ClerkLoaded, useUser } from "@clerk/react-router";
import { createContext, useMemo, useRef } from "react";

export const AuthContext = createContext<{ roles: string[], userId: string | null }>({
  roles: [],
  userId: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const lastUserId = useRef<string | null>(null);
  const stableRoles = useRef<string[]>([]);

  const roles = useMemo(() => {
    if (!isLoaded) return undefined; // don’t trigger until ready
    if (user?.id === lastUserId.current) return undefined;

    lastUserId.current = user?.id ?? null;
    const r = user?.publicMetadata?.roles;
    return Array.isArray(r) ? r : r ? [r] : [];
  }, [user?.id, user?.publicMetadata?.roles, isLoaded]);

  if (roles !== undefined) {
    stableRoles.current = roles;
  }

  const stableUserId = user?.id ?? null;

  // This ensures consumers don't re-render unless value actually changes
  const contextValue = useMemo(
    () => ({
      roles: stableRoles.current,
      userId: stableUserId,
    }),
    [stableUserId, stableRoles.current.join(",")] // change only if user or roles actually differ
  );

return (
  <ClerkLoaded>
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  </ClerkLoaded>
);
};
