import { useEffect, useRef, useState } from "react";
import useTokenDataStore from "../../../stores/useTokenStore";
import useUserStore from "../../../stores/useUserStore";
import AutoLogoutModal from "./AutoLogoutModal/AutoLogoutModal";

export default function AuthenticatedUserMonitor() {
  const tokenData = useTokenDataStore((state) => state.tokenData);
  const userData = useUserStore((state) => state.user);
  const setIsAuthenticated = useTokenDataStore(
    (state) => state.setIsAuthenticated
  );
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const [showAutoLogoutModal, setShowAutoLogoutModal] = useState(false);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (tokenData) {
        const currentTime = new Date().getTime();
        const expirationTime = new Date(tokenData.expiration || "").getTime();

        setShowAutoLogoutModal(expirationTime - currentTime < 30000);

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
    }, 10000);

    // clear interval on component unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [tokenData, userData]);

  return showAutoLogoutModal ? <AutoLogoutModal showModal={true} /> : null;
}
