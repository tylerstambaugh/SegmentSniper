import React, { useEffect } from "react";
import useTokenDataStore from "../store/useTokenStore";

export default function AuthenticatedUserMonitor() {
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const setIsAuthticated = useTokenDataStore((state) => state.setIsAuthticated);

  useEffect(() => {
    if (tokenData) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(tokenData.expiration || "").getTime();

      if (tokenData.accessToken && expirationTime > currentTime) {
        setIsAuthticated(true);
      } else {
        setIsAuthticated(false);
      }
    } else {
      setIsAuthticated(false);
    }
  }, [tokenData]);
  return null;
}
