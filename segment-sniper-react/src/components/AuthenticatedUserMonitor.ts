import React, { useEffect } from "react";
import useTokenDataStore from "../stores/useTokenStore";

export default function AuthenticatedUserMonitor() {
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const setIsAuthenticated = useTokenDataStore(
    (state) => state.setIsAuthenticated
  );

  useEffect(() => {
    if (tokenData) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(tokenData.expiration || "").getTime();

      if (tokenData.accessToken && expirationTime > currentTime) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [tokenData]);
  return null;
}
