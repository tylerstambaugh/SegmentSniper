// AuthContext.tsx
import { useUser } from "@clerk/react-router";
import { createContext, useMemo, useRef } from "react";

export const AuthContext = createContext<{ roles: string[] }>({ roles: [] });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const lastUserId = useRef<string | null>(null);

  const roles = useMemo(() => {
    // If the same user is still signed in, skip recompute
    if (user?.id === lastUserId.current) {
      return undefined; // use previous roles
    }

    lastUserId.current = user?.id ?? null;
    const r = user?.publicMetadata?.roles;
    return Array.isArray(r) ? r : r ? [r] : [];
  }, [user?.id, user?.publicMetadata?.roles]);

  // Keep stable roles unless user actually changed
  const stableRoles = useRef<string[]>([]);
  if (roles !== undefined) {
    stableRoles.current = roles;
  }

  return (
    <AuthContext.Provider value={{ roles: stableRoles.current }}>
      {children}
    </AuthContext.Provider>
  );
};
