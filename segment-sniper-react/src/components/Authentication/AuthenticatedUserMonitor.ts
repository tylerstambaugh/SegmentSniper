import { useEffect } from "react";
import useTokenDataStore from "../../stores/useTokenStore";
import useUserStore from "../../stores/useUserStore";

export default function AuthenticatedUserMonitor() {
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const userData = useUserStore((state) => state.user);
  const setIsAuthenticated = useTokenDataStore(
    (state) => state.setIsAuthenticated
  );

  // set interval or polling
  useEffect(() => {
    if (tokenData) {
      const currentTime = new Date().getTime();
      const expirationTime = new Date(tokenData.expiration || "").getTime();

      if (
        tokenData.accessToken &&
        expirationTime > currentTime &&
        userData !== null
      ) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, [tokenData, userData]);

  return null;
}
